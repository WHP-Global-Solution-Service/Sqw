const store = new Map();

export function createMockPayment(orderId, amount){
  store.set(orderId,{
    id:orderId,
    amount,
    status:"PENDING"
  });

  simulate(orderId);
}

function simulate(orderId){
  const delay = 3000 + Math.random()*4000;

  setTimeout(()=>{
    const success = Math.random() < 0.85;
    const p = store.get(orderId);
    if(p) p.status = success ? "PAID" : "FAILED";
  },delay);
}

export function getMockStatus(orderId){
  return store.get(orderId)?.status ?? "PENDING";
}