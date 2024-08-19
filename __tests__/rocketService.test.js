const rocketService = require("../rocketService");
const rocketModel = require("../rocketModel");

describe("Rocket Service", () => {
  beforeEach(() => {
    // Clear all rockets before each test
    rocketModel.reset();
  });

  test("should process RocketLaunched message correctly", () => {
    const message = {
      metadata: {
        channel: "channel-1",
        messageNumber: 1,
        messageType: "RocketLaunched",
      },
      message: { type: "Falcon-9", launchSpeed: 500, mission: "ARTEMIS" },
    };

    rocketService.processMessage(message);
    const rocket = rocketModel.getRocketByChannel("channel-1");

    expect(rocket).toBeDefined();
    expect(rocket.type).toBe("Falcon-9");
    expect(rocket.speed).toBe(500);
  });

  test("should ignore duplicate RocketLaunched messages", () => {
    const message = {
      metadata: {
        channel: "channel-1",
        messageNumber: 1,
        messageType: "RocketLaunched",
      },
      message: { type: "Falcon-9", launchSpeed: 500, mission: "ARTEMIS" },
    };

    // Process the first message
    rocketService.processMessage(message);

    // Process the same message again (duplicate)
    rocketService.processMessage(message);

    const rocket = rocketModel.getRocketByChannel("channel-1");
    expect(rocket.speed).toBe(500); // Speed should not have changed
  });
});
