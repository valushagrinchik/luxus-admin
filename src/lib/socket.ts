import { io } from "socket.io-client";

export const socket = io(`${process.env.REACT_APP_WS_API}`, {
  autoConnect: false,
  transports: ["websocket", "polling"],
  auth: {
    token: "",
  },
});
