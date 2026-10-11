/**
 * Chat module: the only public entry point. It has no router of its own: its
 * HTTP endpoints live under /my-profile/chats in profile.routes.js, and the
 * websocket handler uses the chat service.
 */
export * from "./controllers/chatControls.controller.js";
export * from "./controllers/groupChat.controller.js";
export * from "./services/chatService.js";
