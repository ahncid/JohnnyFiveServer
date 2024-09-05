import {
  blink,
  turnOff,
  turnOn,
  startFade,
  stopFade,
} from "../handlers/commands.handler.js";

const sockets = (socket) => {
  // Her lytter vi på en besked fra klienten
  socket.on("blink", (data) => {
    blink(data.delay);
  });

  socket.on("turnOff", (data) => {
    turnOff();
  });

  socket.on("turnOn", (data) => {
    turnOn();
  });
  socket.on("startFade", async () => {
    await startFade();
    socket.emit("fadeStatus", "started");
  });

  socket.on("stopFade", async () => {
    await stopFade();
    socket.emit("fadeStatus", "stopped");
  });
};

export default sockets;
