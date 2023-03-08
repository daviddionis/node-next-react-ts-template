import { io } from "..";
import { SocketEvents } from "../constants/sockets.constants";

io.on(SocketEvents.Connection, async (socket) => {
    console.log('a user connected');
    socket.on(SocketEvents.Disconnect, () => {
        console.log('user disconnected');
    });
});