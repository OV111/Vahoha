import { create } from "zustand";
import { getAccessToken } from "../../constants/api";
import { getNotifications } from "@/services/notificationsApi";
import { queryCache } from "@/lib/queryCache";
import { reconnectDelay } from "@/lib/backoff";

let reconnectTimer = null;
// Failed reconnects in a row. The wait grows with it (lib/backoff.js) and a
// successful connection sets it back to 0.
let reconnectAttempts = 0;

const useNotificationStore = create((set, get) => ({
    notifications: [],
    unreadCount: 0,
    ws: null,
    // The socket only delivers NEW notifications, so the existing inbox (and the
    // unread badge) is fetched once when the user is signed in.
    loadNotifications: async ({ force = false } = {}) => {
        const data = await getNotifications({ force });
        if (Array.isArray(data)) get().setNotifications(data);
    },
    connectWs: () => {
        const token = getAccessToken();
        if (!token || get().ws) return;
        clearTimeout(reconnectTimer);
        const ws = new WebSocket(import.meta.env.VITE_WS_URL);
        ws.onopen = () => {
            ws.send(JSON.stringify({ type: "auth", token }));
            // Back after a drop: anything pushed while we were away was missed, so ask.
            // The first connection of a session skips this, the login already loaded the inbox.
            if (reconnectAttempts > 0) get().loadNotifications({ force: true });
            reconnectAttempts = 0;
        };
        ws.onmessage = (event) => {
            let payload;
            try {
                payload = JSON.parse(event.data);
            } catch {
                return;
            }
            if (payload.type === "notification" && payload.data) {
                // The cached inbox no longer matches what the socket just delivered.
                queryCache.invalidate("notifications");
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
            // Dropped connection (sleep, deploy, bad network): try again, waiting
            // longer after each failure. The inbox is refetched once a connection
            // actually succeeds (onopen), not on every attempt.
            reconnectTimer = setTimeout(() => {
                if (!getAccessToken()) return;
                get().connectWs();
            }, reconnectDelay(reconnectAttempts++));
        };
        set({ ws });
    },
    disconnectWs: () => {
        clearTimeout(reconnectTimer);
        reconnectAttempts = 0;
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
