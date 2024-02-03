
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const studentRoutes = require('./routes/studentRoutes');
const { processExcelDataAndCreateProfiles } = require('./controllers/student.controller');

const app = express();

// Connect to MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount student routes
processExcelDataAndCreateProfiles();
app.use('/api', studentRoutes);

// Process Excel data and create student profiles


// Start the server
const PORT =3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
