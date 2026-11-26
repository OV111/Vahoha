// What people read when the API can't answer. Keys match useServerStatusStore.
export const SERVER_STATUS_COPY = Object.freeze({
  down: {
    title: "We can't reach our server",
    body: "It's a problem on our side, not yours. We keep checking and this page opens by itself when it's back.",
    banner: "We can't reach our server. New changes may not save.",
  },
  offline: {
    title: "You're offline",
    body: "Check your internet connection. This page opens by itself when you're back online.",
    banner: "You're offline. New changes may not save.",
  },
  maintenance: {
    title: "We're doing maintenance",
    body: "Vahoha is paused for a short update. This page opens by itself when we're done.",
    banner: "Vahoha is paused for maintenance. New changes may not save.",
  },
});

export const SERVER_RETRY = "Try again";
export const SERVER_CHECKING = "Checking…";
export const SERVER_BACK = "You're connected again.";
export const SERVER_REFRESH = "Refresh page";
// Replaces the browser's "Failed to fetch" wherever a screen shows error.message.
export const UNREACHABLE_MESSAGE = "We can't reach the server. Check your connection and try again.";
