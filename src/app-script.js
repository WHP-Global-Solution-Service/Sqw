// app-script.js
import {
    ensureAnonAuth,
    sendChatMessage,
    subscribeChat,
    onAuthChanged,
} from "./firebase";
import LoginBar from "./components/LoginBar.vue";

export default {
    name: "App",
    components: { LoginBar },
    data() {
        return {
            map: null,
            selectedMapType: "satellite",
            dolEnabled: true,
            opacity: 0.85,
            activeTab: "dashboard",
            snapEnabled: true,
            snapSettings: {
                red: 180,
                green: 90,
                blue: 90,
            },
            landData: {
                size: "",
                width: "",
                owner: "",
                phone: "",
                lineId: "",
                price: "",
            },
            savedLands: [],
            currentLocation: {
                lat: 13.7563,
                lon: 100.5234,
            },
            currentZoom: 10,
            showSearch: false,
            showFilters: false,
            showLayers: false,
            searchQuery: "",
            filters: {
                landType: "",
                priceMin: "",
                priceMax: "",
            },
            availableLayers: [
                { id: 1, name: "Land Parcel", visible: true },
                { id: 2, name: "City Plan", visible: false },
                { id: 3, name: "Aerial Photography", visible: false },
            ],
            // Chat related data
            showChat: false,
            chatMessages: [],
            chatInput: "",
            currentUserId: null,
            userProfile: {
                name: "",
                joinedAt: null,
            },
            tempUserName: "",
            hasNewMessage: false,
            unreadCount: 0,
            lastSeenMessageId: null,
            onlineUsers: 1,
            showTypingIndicator: false,
            typingTimer: null,
            chatUnsubscribe: null,
            authUnsubscribe: null,
        };
    },
    async mounted() {
        this.initMap();
        // อัปเดต currentUserId/ชื่อ ให้สอดคล้องกับการล็อกอิน (Google/Email/Anon)
        this.authUnsubscribe = onAuthChanged((u) => {
            if (u) {
                this.currentUserId = u.uid;
                // ถ้าล็อกอินจริง (ไม่ใช่ anonymous) และยังไม่ตั้งชื่อในแชท ให้เติมชื่ออัตโนมัติ
                if (!u.isAnonymous && !this.userProfile.name) {
                    this.userProfile.name =
                        u.displayName || (u.email ? u.email.split("@")[0] : "");
                }
            }
        });
        await this.initChat();
    },
    beforeUnmount() {
        if (this.chatUnsubscribe) {
            this.chatUnsubscribe();
        }
        if (this.typingTimer) {
            clearTimeout(this.typingTimer);
        }
        if (this.authUnsubscribe) {
            this.authUnsubscribe();
        }
    },
    methods: {
        initMap() {
            if (typeof window.longdo !== "undefined") {
                this.map = new window.longdo.Map({
                    placeholder: document.getElementById("map"),
                    language: "th",
                });

                this.map.location({
                    lon: this.currentLocation.lon,
                    lat: this.currentLocation.lat,
                    includePolygon: false,
                });

                console.log("Map loaded successfully", this.map);
            } else {
                setTimeout(() => {
                    this.initMap();
                }, 500);
            }
        },
        async initChat() {
            try {
                this.currentUserId = await ensureAnonAuth();

                // Subscribe to chat messages
                this.chatUnsubscribe = subscribeChat((messages) => {
                    const previousLength = this.chatMessages.length;
                    this.chatMessages = messages;

                    // Check for new messages
                    if (messages.length > previousLength && !this.showChat) {
                        this.hasNewMessage = true;
                        this.unreadCount = Math.max(
                            0,
                            messages.length -
                            (this.lastSeenMessageId
                                ? messages.findIndex((m) => m.id === this.lastSeenMessageId) +
                                1
                                : 0)
                        );
                    }

                    // Auto scroll to bottom
                    this.$nextTick(() => {
                        this.scrollToBottom();
                    });
                });

                console.log("Chat initialized with user ID:", this.currentUserId);
            } catch (error) {
                console.error("Failed to initialize chat:", error);
            }
        },
        async setUserProfile() {
            if (this.tempUserName.trim()) {
                this.userProfile.name = this.tempUserName.trim();
                this.userProfile.joinedAt = Date.now();

                // Send join message
                try {
                    await sendChatMessage(
                        `${this.userProfile.name} เข้าร่วมการสนทนา`,
                        this.currentUserId,
                        "ระบบ"
                    );
                } catch (error) {
                    console.error("Failed to send join message:", error);
                }
            }
        },
        async sendMessage() {
            if (!this.chatInput.trim() || !this.userProfile.name) return;

            try {
                const fallbackName = this.userProfile.name || ""; // onAuthChanged จะเติมให้แล้ว ถ้ายังว่างปล่อยเป็น ""
                await sendChatMessage(
                    this.chatInput.trim(),
                    this.currentUserId,
                    fallbackName
                );

                this.chatInput = "";
            } catch (error) {
                console.error("Failed to send message:", error);
                alert("ไม่สามารถส่งข้อความได้ กรุณาลองใหม่อีกครั้ง");
            }
        },
        handleTyping() {
            // Show typing indicator logic (simplified)
            if (this.typingTimer) {
                clearTimeout(this.typingTimer);
            }

            this.typingTimer = setTimeout(() => {
                // Hide typing indicator after 2 seconds of no typing
            }, 2000);
        },
        formatTime(timestamp) {
            if (!timestamp) return "";

            const date = new Date(timestamp);
            const now = new Date();
            const diffInMinutes = Math.floor((now - date) / (1000 * 60));

            if (diffInMinutes < 1) return "ตอนนี้";
            if (diffInMinutes < 60) return `${diffInMinutes} นาทีที่แล้ว`;
            if (diffInMinutes < 1440)
                return `${Math.floor(diffInMinutes / 60)} ชั่วโมงที่แล้ว`;

            return date.toLocaleDateString("th-TH", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        },
        scrollToBottom() {
            if (this.$refs.chatBody) {
                this.$refs.chatBody.scrollTop = this.$refs.chatBody.scrollHeight;
            }
        },
        toggleP2P() {
            this.showChat = !this.showChat;
            this.showSearch = false;
            this.showFilters = false;
            this.showLayers = false;

            if (this.showChat) {
                this.hasNewMessage = false;
                this.unreadCount = 0;
                if (this.chatMessages.length > 0) {
                    this.lastSeenMessageId =
                        this.chatMessages[this.chatMessages.length - 1].id;
                }
                this.$nextTick(() => {
                    this.scrollToBottom();
                });
            }
        },
        centerBangkok() {
            if (this.map) {
                this.map.location({
                    lat: 13.7563,
                    lon: 100.5018,
                    zoom: 18,
                    includePolygon: false,
                });
                this.currentLocation = { lat: 13.7563, lon: 100.5234 };
            }
        },
        reloadAPI() {
            console.log("Reloading API...");
            this.initMap();
        },
        startDrawing() {
            console.log("Start drawing boundary");
        },
        finishDrawing() {
            console.log("Finish drawing");
        },
        clearDrawing() {
            console.log("Clear drawing");
        },
        saveLandData() {
            if (this.landData.owner) {
                this.savedLands.push({ ...this.landData });
                // Reset form
                this.landData = {
                    size: "",
                    width: "",
                    owner: "",
                    phone: "",
                    lineId: "",
                    price: "",
                };
                console.log("Land data saved:", this.savedLands);
            } else {
                alert("กรุณากรอกชื่อเจ้าของ");
            }
        },
        toggleSearch() {
            this.showSearch = !this.showSearch;
            this.showFilters = false;
            this.showLayers = false;
            this.showChat = false;
        },
        toggleFilters() {
            this.showFilters = !this.showFilters;
            this.showSearch = false;
            this.showLayers = false;
            this.showChat = false;
        },
        toggleLayers() {
            this.showLayers = !this.showLayers;
            this.showSearch = false;
            this.showFilters = false;
            this.showChat = false;
        },
        viewMyProperty() {
            console.log("View my property");
        },
        exploreArea() {
            console.log("Explore area");
        },
        performSearch() {
            if (this.searchQuery.trim()) {
                console.log("Searching for:", this.searchQuery);
                // Implement search functionality here
                this.showSearch = false;
            }
        },
        applyFilters() {
            console.log("Applying filters:", this.filters);
            // Implement filter functionality here
            this.showFilters = false;
        },
    },
};