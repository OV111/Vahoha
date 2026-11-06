import { create } from "zustand";
import { getAccessToken } from "../../constants/api";
import { getNotifications } from "@/services/notificationsApi";
import { queryCache } from "@/lib/queryCache";
import { closeSocket, openSocket } from "@/lib/socket";

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
        if (!getAccessToken() || get().ws) return;
        const ws = openSocket();
        let connectedBefore = false;
        ws.on("connect", () => {
            // Back after a drop: anything pushed while we were away was missed, so ask.
            // The first connection of a session skips this, the login already loaded the inbox.
            if (connectedBefore) get().loadNotifications({ force: true });
            connectedBefore = true;
        });
        ws.on("notification", ({ data }) => {
            if (!data) return;
            // The cached inbox no longer matches what the socket just delivered.
            queryCache.invalidate("notifications");
            set((state) => {
                if (state.notifications.some((n) => n._id === data._id)) return state;
                return {
                    notifications: [data, ...state.notifications],
                    unreadCount: state.unreadCount + 1,
                };
            });
        });
        set({ ws });
    },
    disconnectWs: () => {
        const { ws } = get();
        set({ ws: null });
        if (ws) closeSocket(ws);
    },
    setNotifications: (notifications) => {
        const unreadCount = notifications.filter((n) => !n.read).length;
        set({ notifications, unreadCount });
    },
    clearNotifications: () => set({ notifications: [], unreadCount: 0 }),
}));


export default useNotificationStore;
