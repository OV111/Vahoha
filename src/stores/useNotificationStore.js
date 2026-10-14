import { create } from "zustand";
import { getAccessToken } from "../../constants/api";
import { getNotifications } from "@/services/notificationsApi";

const RECONNECT_MS = 3000;
let reconnectTimer = null;

const useNotificationStore = create((set, get) => ({
    notifications: [],
    unreadCount: 0,
    ws: null,
    // The socket only delivers NEW notifications, so the existing inbox (and the
    // unread badge) is fetched once when the user is signed in.
    loadNotifications: async () => {
        const data = await getNotifications();
        if (Array.isArray(data)) get().setNotifications(data);
    },
    connectWs: () => {
        const token = getAccessToken();
        if (!token || get().ws) return;
        clearTimeout(reconnectTimer);
        const ws = new WebSocket(import.meta.env.VITE_WS_URL);
        ws.onopen = () => {
            ws.send(JSON.stringify({ type: "auth", token }));
        };
        ws.onmessage = (event) => {
            let payload;
            try {
                payload = JSON.parse(event.data);
            } catch {
                return;
            }
            if (payload.type === "notification" && payload.data) {
                set((state) => {
                    if (state.notifications.some((n) => n._id === payload.data._id)) return state;
                    return {
                        notifications: [payload.data, ...state.notifications],
                        unreadCount: state.unreadCount + 1,
                    };
                });
            }
        };
        ws.onerror = () => {
            console.error("Notifications WebSocket error");
        };
        ws.onclose = () => {
            // Ignore a stale socket that was already replaced or closed on purpose.
            if (get().ws !== ws) return;
            set({ ws: null });
            // Dropped connection (sleep, deploy, bad network): try again, and
            // refetch to pick up anything missed meanwhile.
            reconnectTimer = setTimeout(() => {
                if (!getAccessToken()) return;
                get().connectWs();
                get().loadNotifications();
            }, RECONNECT_MS);
        };
        set({ ws });
    },
    disconnectWs: () => {
        clearTimeout(reconnectTimer);
        const { ws } = get();
        set({ ws: null });
        if (ws) ws.close();
    },
    setNotifications: (notifications) => {
        const unreadCount = notifications.filter((n) => !n.read).length;
        set({ notifications, unreadCount });
    },
    clearNotifications: () => set({ notifications: [], unreadCount: 0 }),
}));


export default useNotificationStore;
