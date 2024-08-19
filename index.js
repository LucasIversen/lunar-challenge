const express = require("express");
const rocketService = require("./rocketService");
const rocketModel = require("./rocketModel");
const app = express();
const port = 8088;

app.use(express.json());

// Route to handle incoming rocket messages
app.post("/messages", (req, res) => {
  const message = req.body;

  try {
    // Process the incoming message using the rocketService
    rocketService.processMessage(message);
    res.status(200).send("Message processed");
  } catch (error) {
    console.log(error);
    res.status(400).send("Invalid message format");
  }
});

// Route to display all rockets in an HTML table
app.get("/rockets", (req, res) => {
  const rockets = rocketModel.getAllRockets(); // Get all rockets from the model

  // Create a simple HTML page
  let html = `
      <html>
        <head>
          <title>Rockets</title>
        </head>
        <body>
          <h1>Rocket Dashboard</h1>
          <table border="1">
            <tr>
              <th>Rocket Type</th>
              <th>Mission</th>
              <th>Speed</th>
              <th>Status</th>
            </tr>`;

  // Iterate through all rockets and generate rows for the table
  rockets.forEach((rocket) => {
    html += `
            <tr>
              <td><a href="/rocket/${rocket.id}">${rocket.type}</a></td>
              <td>${rocket.mission}</td>
              <td>${rocket.speed}</td>
              <td>${
                rocket.exploded
                  ? "Exploded: " + rocket.explosionReason
                  : "Active"
              }</td>
            </tr>`;
  });

  html += `
          </table>
        </body>
      </html>`;

  // Send the HTML response
  res.send(html);
});

// Route to display detailed information about a specific rocket
app.get("/rocket/:id", (req, res) => {
  const rocket = rocketModel.getRocket(req.params.id); // Get the rocket by its ID

  if (!rocket) {
    return res.status(404).send("Rocket not found");
  }

  // Generate the HTML for the detailed rocket view
  let html = `
      <html>
        <head>
          <title>${rocket.type}</title>
        </head>
        <body>
          <h1>Rocket: ${rocket.type}</h1>
          <p><strong>Mission:</strong> ${rocket.mission}</p>
          <p><strong>Speed:</strong> ${rocket.speed}</p>
          <p><strong>Status:</strong> ${
            rocket.exploded ? "Exploded: " + rocket.explosionReason : "Active"
          }</p>
          <a href="/rockets">Back to list</a>
        </body>
      </html>`;

  // Send the HTML response
  res.send(html);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
