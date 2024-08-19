const rocketModel = require("./rocketModel");

const processMessage = (message) => {
  const { metadata, message: messageData } = message;
  const { channel, messageNumber, messageType } = metadata;

  // Check if the message is a duplicate
  if (rocketModel.isDuplicateMessage(channel, messageNumber)) {
    console.log(
      `Duplicate message ignored: ${messageNumber} for channel ${channel}`
    );
    return;
  }

  // Switch case on rocket events to pick the correct handler
  switch (messageType) {
    case "RocketLaunched":
      rocketModel.launchRocket(channel, messageData);
      break;

    case "RocketSpeedIncreased":
      rocketModel.increaseSpeed(channel, messageData.by);
      break;

    case "RocketSpeedDecreased":
      rocketModel.decreaseSpeed(channel, messageData.by);
      break;

    case "RocketMissionChanged":
      rocketModel.changeMission(channel, messageData.newMission);
      break;

    case "RocketExploded":
      rocketModel.explodeRocket(channel, messageData.reason);
      break;

    default:
      throw new Error("Unknown message type");
  }

  rocketModel.markMessageAsProcessed(channel, messageNumber);
};

module.exports = {
  processMessage,
};
