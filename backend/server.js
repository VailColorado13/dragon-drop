const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())



// Routes


app.post('/api/some-endpoint', (req, res) => {
  // Log the request data to the server terminal
  console.log('Received a POST request to /api/some-endpoint');

  // Handle any further logic here

  // Send a response back to the client
  const responseData = {
    message: 'POST request received successfully',
  };
  res.json(responseData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})