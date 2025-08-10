import { io } from "socket.io-client"

export const socket = io("http://localhost:3001", {
  autoConnect: false, // Prevent automatic connection on page load
  withCredentials: false, // If you need to send cookies with the initial connection
})
