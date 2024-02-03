// studentController.js

const xlsx = require('xlsx');
const config = require('../config');
const Student = require('../models/student');

async function processExcelDataAndCreateProfiles() {
  const workbook = xlsx.readFile(config.excelFilePath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const excelData = xlsx.utils.sheet_to_json(worksheet);

  for (let row of excelData) {
    const student = new Student({
      name: row.Name,
      email: row.Email,
      enrollmentDate: new Date(row.enrollmentDate),
      state: config.defaultState
    });

    try {
      const result = await student.save();
      console.log(`Student profile created for ${result}`);
    } catch (err) {
      console.error('Error creating student profile:', err);
    }
  }
}

async function getAllStudents() {
    try {
      const students = await Student.find();
      return students;
    } catch (err) {
      console.error('Error retrieving students:', err);
      throw err; // Propagate the error to the calling function
    }
  }
module.exports = {
  processExcelDataAndCreateProfiles, getAllStudents
};
