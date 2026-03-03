// chillpayService.js - extracted ChillPay / payment helpers
export async function processChillPayPayment(vm, land) {
    try {
        const amount = land.totalPrice || 100;
        const orderId = `LAND-${land.id}-${Date.now()}`;

        if (vm.chillpay && vm.chillpay.useBackend) {
            await callBackendPaymentAPI(vm, orderId, amount, land);
        } else {
            await processDemoPayment(vm, orderId, amount, land);
        }
    } catch (e) {
        console.error('ChillPay payment error:', e);
        vm.chillpayProcessing = false;
        throw e;
    }
}

export async function callBackendPaymentAPI(vm, orderId, amount, land) {
    try {
        const response = await fetch(`${vm.chillpay.backendUrl}/api/payment/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                orderId,
                amount: parseFloat(amount).toFixed(2),
                customerName: vm.userProfile?.name || 'Guest',
                landId: land.id
            })
        });

        if (!response.ok) throw new Error(`Backend error: ${response.status}`);

        const result = await response.json();

        if (result.success && result.data?.PaymentUrl) {
            savePaymentOrder(vm, orderId, land.id);

            const paymentWindow = window.open(
                result.data.PaymentUrl,
                'ChillPayPayment',
                'width=800,height=700,scrollbars=yes,resizable=yes'
            );

            if (!paymentWindow) {
                alert('❌ กรุณาอนุญาตให้เปิด Popup Window');
                vm.chillpayProcessing = false;
                return;
            }

            monitorPaymentPopup(vm, paymentWindow, orderId);
        } else {
            throw new Error(result.data?.Message || 'Payment creation failed');
        }
    } catch (e) {
        console.error('❌ Backend API error:', e);
        const useFallback = confirm(
            '⚠️ ไม่สามารถเชื่อมต่อ Backend Server\n\n' +
            `กรุณาตรวจสอบว่า Backend Server รันอยู่ที่:\n${vm.chillpay.backendUrl}\n\n` +
            'ต้องการใช้ Demo Mode แทนหรือไม่?'
        );

        if (useFallback) {
            await processDemoPayment(vm, orderId, amount, land);
        } else {
            vm.chillpayProcessing = false;
            throw new Error('Backend connection failed. Please start the backend server.');
        }
    }
}

export async function processDemoPayment(vm, orderId, amount, land) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    savePaymentOrder(vm, orderId, land.id);
    showDemoPaymentPage(vm, orderId, amount, land);
}

export function showDemoPaymentPage(vm, orderId, amount, land) {
    vm.showPurchaseModal = false;
    vm.chillpayProcessing = false;

    const confirmed = confirm(
        `🎯 DEMO PAYMENT MODE\n\nOrder: ${orderId}\nAmount: ${amount.toLocaleString()} THB\nLand: ${land.owner || land.agent || 'N/A'}\n\n` +
        `⚠️ หมายเหตุ: นี่คือโหมดทดสอบ\nในการใช้งานจริงต้องมี Backend Server\nเพื่อเรียก ChillPay API\n\nคลิก OK เพื่อจำลองการชำระเงินสำเร็จ\nคลิก Cancel เพื่อยกเลิก`
    );

    if (confirmed) {
        setTimeout(() => {
            completePayment(vm, orderId);
            alert('✅ ชำระเงินสำเร็จ (Demo Mode)\n\nสามารถดูข้อมูลติดต่อได้แล้ว');
        }, 500);
    } else {
        alert('❌ ยกเลิกการชำระเงิน');
    }
}

export async function generateMD5(text) {
    try {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest('MD5', data).catch(() => null);
        if (!hashBuffer) return 'fallback-md5-hash';
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
        console.warn('MD5 generation failed, using fallback');
        return 'fallback-md5-hash';
    }
}

export function monitorPaymentPopup(vm, paymentWindow, orderId) {
    const checkInterval = setInterval(() => {
        if (paymentWindow.closed) {
            clearInterval(checkInterval);
            setTimeout(() => {
                const order = getPaymentOrder(vm, orderId);
                if (order && order.status === 'completed') {
                    vm.chillpayProcessing = false;
                    vm.showPurchaseModal = false;
                    alert('✅ ชำระเงินสำเร็จ!\n\nสามารถดูข้อมูลติดต่อได้แล้ว');
                    const land = vm.getLandById ? vm.getLandById(order.landId) : null;
                    if (land && vm.showFullDetails) vm.showFullDetails(land);
                } else {
                    vm.chillpayProcessing = false;
                }
            }, 500);
        }
    }, 500);
}

export function getPaymentOrder(vm, orderId) {
    try {
        const key = 'sqw_chillpay_orders';
        const orders = JSON.parse(localStorage.getItem(key) || '{}');
        return orders[orderId] || null;
    } catch (e) { return null; }
}

export function savePaymentOrder(vm, orderId, landId) {
    try {
        const key = 'sqw_chillpay_orders';
        let orders = {};
        try { orders = JSON.parse(localStorage.getItem(key) || '{}'); } catch (_) { void 0; }
        orders[orderId] = { landId, userId: vm.currentUserId, timestamp: Date.now(), status: 'pending' };
        localStorage.setItem(key, JSON.stringify(orders));
    } catch (e) { console.error('Failed to save order:', e); }
}

export function checkPaymentResponse(vm) {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const status = urlParams.get('status');
        const orderId = urlParams.get('orderNo');
        if (status && orderId) {
            if (status === 'success' || status === '0000') {
                completePayment(vm, orderId);
                alert('ชำระเงินสำเร็จ!');
            } else {
                alert('การชำระเงินล้มเหลว กรุณาลองใหม่อีกครั้ง');
            }
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    } catch (e) { console.error('Check payment response error:', e); }
}

export function setupPaymentMessageListener(vm) {
    window.addEventListener('message', (event) => {
        try {
            if (event.data && event.data.type) {
                if (event.data.type === 'payment_success') {
                    vm.chillpayProcessing = false;
                    vm.showPurchaseModal = false;
                    if (event.data.orderId) completePayment(vm, event.data.orderId);
                    alert('✅ ชำระเงินสำเร็จ!\n\nสามารถดูข้อมูลติดต่อได้แล้ว');
                } else if (event.data.type === 'payment_cancel') {
                    vm.chillpayProcessing = false;
                }
            }
        } catch (e) { console.error('Message listener error:', e); }
    });
}

export function completePayment(vm, orderId) {
    try {
        const key = 'sqw_chillpay_orders';
        const orders = JSON.parse(localStorage.getItem(key) || '{}');
        const order = orders[orderId];
        if (order && order.landId) {
            const purchaseKey = 'sqw_purchases_v1';
            let data = {};
            try { data = JSON.parse(localStorage.getItem(purchaseKey) || '{}'); } catch (_) { void 0; }
            const arr = Array.isArray(data[order.landId]) ? data[order.landId] : [];
            if (!arr.includes(order.userId)) arr.push(order.userId);
            data[order.landId] = arr;
            localStorage.setItem(purchaseKey, JSON.stringify(data));

            order.status = 'completed';
            orders[orderId] = order;
            localStorage.setItem(key, JSON.stringify(orders));

            const land = vm.getLandById ? vm.getLandById(order.landId) : null;
            if (land && vm.showFullDetails) vm.showFullDetails(land);
        }
    } catch (e) { console.error('Complete payment error:', e); }
}

export function hasPurchased(vm, landId, uid) {
    try {
        const key = 'sqw_purchases_v1';
        const data = JSON.parse(localStorage.getItem(key) || '{}');
        const userToCheck = uid || vm.currentUserId;
        return Array.isArray(data[landId]) && data[landId].includes(userToCheck);
    } catch (e) { return false; }
}
