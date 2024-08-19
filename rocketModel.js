let rockets = {};
let nextId = 1;

// Function to launch a rocket / add it to rockets
const launchRocket = (channel, data) => {
  rockets[channel] = {
    id: nextId++, // Assign the next available ID and then increment it
    type: data.type,
    speed: data.launchSpeed,
    mission: data.mission,
    exploded: false,
    explosionReason: null,
    processedMessages: new Set(), // Set to store all processed message numbers
  };
};

// Function to check if the message is a duplicate
const isDuplicateMessage = (channel, messageNumber) => {
  const rocket = rockets[channel];
  console.log(rocket, messageNumber);
  if (rocket && rocket.processedMessages.has(messageNumber)) {
    return true; // Message is a duplicate
  }
  return false; // Message is not a duplicate
};

// Function to update the set of processed message numbers
const markMessageAsProcessed = (channel, messageNumber) => {
  if (rockets[channel]) {
    rockets[channel].processedMessages.add(messageNumber); // Add the message number to the set
  }
};

// Function to increase the rockets speed
const increaseSpeed = (channel, by) => {
  if (rockets[channel] && !rockets[channel].exploded) {
    rockets[channel].speed += by;
  }
};

// Function to decrease the rockets speed
const decreaseSpeed = (channel, by) => {
  if (rockets[channel] && !rockets[channel].exploded) {
    rockets[channel].speed -= by;
  }
};

// Function to change the rockets mission
const changeMission = (channel, newMission) => {
  if (rockets[channel] && !rockets[channel].exploded) {
    rockets[channel].mission = newMission;
  }
};

// Function to mark the rocket as exploded
const explodeRocket = (channel, reason) => {
  if (rockets[channel]) {
    rockets[channel].exploded = true;
    rockets[channel].explosionReason = reason;
  }
};

// Function to get the current state of a rocket by ID
const getRocket = (id) => {
  return (
    Object.values(rockets).find((rocket) => rocket.id === parseInt(id)) || null
  );
};

// Function to get the current state of a rocket by channel
const getRocketByChannel = (channel) => {
  return rockets[channel] || null;
};

// Function to get a list of all rockets
const getAllRockets = () => {
  return Object.values(rockets);
};

// Function to reset the in-memory rockets (used for tests)
const reset = () => {
  rockets = {};
  nextId = 1;
};

// Exporting the functions
module.exports = {
  launchRocket,
  isDuplicateMessage,
  markMessageAsProcessed,
  increaseSpeed,
  decreaseSpeed,
  changeMission,
  explodeRocket,
  getRocket,
  getRocketByChannel,
  getAllRockets,
  reset, //For test clean up
};
