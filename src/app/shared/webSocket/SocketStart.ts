import { io as client } from "socket.io-client";
import { API_CONFIG } from "./../../../config/api.config";

const io = client(API_CONFIG.socketURL, { reconnection: false, });
io.disconnect();//Remover caso o APP tenha conexao WebSocket
export { io };