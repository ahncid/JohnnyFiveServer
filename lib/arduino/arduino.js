import five from "johnny-five";

const arduino = {};

arduino.devices = {
  testled: null,
  testled10: null,
};

arduino.init = () => {
  let board = new five.Board({ port: "/dev/cu.usbmodem1301" });

  const setup = () => {
    arduino.devices.testled = new five.Led(9);
    arduino.devices.testled10 = new five.Led(10);
  };

  board.on("ready", () => {
    setup();
  });
};

export default arduino;
