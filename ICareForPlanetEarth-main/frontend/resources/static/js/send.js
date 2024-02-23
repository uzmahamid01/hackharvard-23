const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

app.post('/sendCoordinatesToFile', (req, res) => {
  const { longitude, latitude, height } = req.body;

  // Create a JSON object with the coordinates
  const coordinates = {
    longitude,
    latitude,
    height,
  };

  // Write the coordinates to a JSON file
  fs.writeFile('/path/to/your/json-file.json', JSON.stringify(coordinates), (err) => {
    if (err) {
      console.error('Error writing to JSON file:', err);
      res.status(500).send('Error writing to JSON file');
    } else {
      console.log('Coordinates written to JSON file:', coordinates);
      res.send('Coordinates written to JSON file successfully');
    }
  });
});

app.listen(3000, () => {
  console.log('Node.js server is running on port 3000');
});
