import arduino from "../arduino/arduino.js";

const devices = arduino.devices;
let fadeInterval = null;

// Her tænder vi vores lys.
export const turnOn = async () => {
  if (devices.testled) {
    devices.testled.stop();
    devices.testled.on();
  }

  if (devices.testled10) {
    devices.testled10.stop();
    devices.testled10.on();
  }

  return true;
};

// Her slukker vi vores lys.
export const turnOff = async () => {
  if (devices.testled) {
    devices.testled.stop();
    devices.testled.off();
  }

  if (devices.testled10) {
    devices.testled10.stop();
    devices.testled10.off();
  }

  return true;
};

// Her tænder vi vores blink.
export const blink = async (delay = 1000) => {
  if (devices.testled) {
    devices.testled.blink(delay);
  }

  if (devices.testled10) {
    devices.testled10.blink(delay);
  }

  return true;
};

// Her tænder vi vores blink, men stopper efter timeout.
export const blinkThenStop = async (delay = 1000, timeout = 5000) => {
  if (devices.testled) {
    devices.testled.blink(delay);
  }

  if (devices.testled10) {
    devices.testled10.blink(delay);
  }

  setTimeout(() => {
    if (devices.testled) {
      devices.testled.stop();
    }

    if (devices.testled10) {
      devices.testled10.stop();
    }
  }, timeout);

  return true;
};

// Start fade-effekten for begge LED'er.
export const startFade = async (step = 5, interval = 30) => {
  if (fadeInterval) {
    console.log("Fade effect is already running.");
    return false;
  }

  let brightness = 0;
  let fadeAmount = step;

  fadeInterval = setInterval(() => {
    Object.values(devices).forEach((device) => {
      if (device) {
        device.brightness(brightness);
      }
    });

    brightness += fadeAmount;

    if (brightness <= 0 || brightness >= 255) {
      fadeAmount = -fadeAmount;
    }
  }, interval);

  return true;
};

// Stop fade-effekten for begge LED'er.
export const stopFade = async () => {
  if (fadeInterval) {
    clearInterval(fadeInterval);
    fadeInterval = null;

    // Sæt LED'erne til en sikker tilstand (sluk dem eller sæt lysstyrken til et passende niveau).
    Object.values(devices).forEach((device) => {
      if (device) {
        device.off(); // Kan ændres til `device.brightness(255);` eller en anden værdi efter behov.
      }
    });
  }

  return true;
};
