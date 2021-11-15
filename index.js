var Service, Characteristic;
var isOn = false;
var type = "Mute";
const axios = require("axios");

module.exports = function (homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("homebridge-discordmute", "DiscordMute", motion);
};

function motion(log, config) {
  this.log = log;
  this.info = {
    serialnumber: "Unknown",
    model: "Discord Muter",
    manufacterer: "Byoe",
    name: "Muter",
    softwareversion: "Unknown",
  };
  this.config = config;
}

motion.prototype = {
  getState: function (callback, context) {
    callback(null, isOn);
  },
  setState: function (context,callback) {
    axios
      .get(`http://${this.config.ip_address}/toggle${this.config.type}`)
      .then(function (response) {
        isOn = !isOn;
        callback(null, isOn);
      });
  },

  identify: function (callback) {
    this.log("Identify requested!");
    callback();
  },

  processInformation: function (info, informationService, firstTime, config) {
    if (!info) return;

    var equal = true;

    var deviceManufacturer = info.manufacturer || "Microsoft";

    var deviceModel = info.model || "Not provided";

    var deviceSerialnumber = info.serialnumber || "Not provided";

    var deviceName = info.name || "Not provided";

    var deviceSoftwareversion = info.softwareversion || "Not provided";

    if (!equal || firstTime) {
      this.log("Setting info: " + JSON.stringify(this.info));
      informationService
        .setCharacteristic(Characteristic.Manufacturer, deviceManufacturer)
        .setCharacteristic(Characteristic.Model, deviceModel)
        .setCharacteristic(Characteristic.SerialNumber, deviceSerialnumber)
        .setCharacteristic(Characteristic.Name, deviceName)
        .setCharacteristic(
          Characteristic.SoftwareRevision,
          deviceSoftwareversion
        );
    }
  },

  getServices: function () {
    var informationService = new Service.AccessoryInformation();
    this.processInformation(this.info, informationService, true, this.config);

    this.switchService = new Service.Switch(this.name);

    this.switchService
      .getCharacteristic(Characteristic.On)
      .on("get", this.getState.bind(this))
      .on("set", this.setState.bind(this));

    return [informationService, this.switchService];
  },
};
