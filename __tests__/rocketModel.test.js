const rocketModel = require("../rocketModel");

describe("Rocket Model", () => {
  beforeEach(() => {
    // Clear all rockets before each test
    rocketModel.reset();
  });

  test("should launch a rocket", () => {
    rocketModel.launchRocket("channel-1", {
      type: "Falcon-9",
      launchSpeed: 500,
      mission: "ARTEMIS",
    });
    const rocket = rocketModel.getRocketByChannel("channel-1");
    expect(rocket).toBeDefined();
    expect(rocket.type).toBe("Falcon-9");
    expect(rocket.speed).toBe(500);
    expect(rocket.mission).toBe("ARTEMIS");
  });

  test("should increase rocket speed when RocketSpeedIncreased message is received", () => {
    rocketModel.launchRocket("channel-1", {
      type: "Falcon-9",
      launchSpeed: 500,
      mission: "ARTEMIS",
    });
    rocketModel.increaseSpeed("channel-1", 1000);
    const rocket = rocketModel.getRocketByChannel("channel-1");
    expect(rocket.speed).toBe(1500);
  });

  test("should ignore duplicate messages", () => {
    rocketModel.launchRocket("channel-1", {
      type: "Falcon-9",
      launchSpeed: 500,
      mission: "ARTEMIS",
    });
    const isDuplicate = rocketModel.isDuplicateMessage("channel-1", 1);
    expect(isDuplicate).toBe(false);

    rocketModel.markMessageAsProcessed("channel-1", 1);

    const isDuplicateAfterMarking = rocketModel.isDuplicateMessage(
      "channel-1",
      1
    );
    expect(isDuplicateAfterMarking).toBe(true);
  });
});
