const express = require('express')
const dotenv = require('dotenv')
const mysql = require('mysql2')


const app = express()
dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})


// Question 1 goes here
app.get('/patients', (req, res) => {
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to retrieve patients' });
      }
      res.json(results);
    });
  });

// Question 2 goes here
app.get('/providers', (req, res) => {
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
   db.query(query, (err, results) => {
  if (err) {
    return res.status(500).json({ error: 'Failed to retrieve providers' });
  }
  res.json(results);
  });
  });


// Question 3 goes here
app.get('/patients/:first_name', (req, res) => {
    const { first_name } = req.params;
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
    db.query(query, [first_name], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to filter patients by first name' });
      }
      res.json(results);
    });
  });

// Question 4 goes here
app.get('/providers/specialty/:specialty', (req, res) => {
    const { specialty } = req.params;
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
    db.query(query, [specialty], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to retrieve providers by specialty' });
      }
      res.json(results);
    });
  });


// listen to the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})