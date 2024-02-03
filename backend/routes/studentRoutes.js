const express = require('express');
const router = express.Router();


const { getAllStudents } = require('../controllers/student.controller');

router.get('/students', async (req, res) => {
  try {
    
    const students = await getAllStudents();
    console.log(students)
    res.status(200).json(students);
  } catch (err) {
    console.error('Error retrieving student details:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;