// install dependencies before running:
// npm install axios faker

const axios = require("axios");
const { faker } = require("@faker-js/faker");

// API configuration
const API_URL = "http://localhost:5000/todos/";
const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNtYjBxamI3eTAwMDF6d2VzZ2p4eHlocXMiLCJyb2xlIjoic3VwZXJfYWRtaW4ifQ.RXnEkNEx9koIWuSPhPXE61cdIrbX_B1WLB0TQ-G0WAw";
const USER_ID = "cmb0qj4150000zwespdtzqkat";

// Number of records to insert
const TOTAL = 5000;

// Function to generate one record
function generateData() {
  return {
    title: faker.lorem.sentence(), // generates realistic names
    description: faker.lorem.sentence(), // generates realistic names

    userId: USER_ID,
  };
}

// Function to insert data
async function insertData(data) {
  try {
    const res = await axios.post(API_URL, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error inserting:", err.response?.data || err.message);
  }
}

// Main loop
(async () => {
  console.log(`Starting insert of ${TOTAL} records...`);
  for (let i = 1; i <= TOTAL; i++) {
    const payload = generateData();
    await insertData(payload); // sequential to avoid overwhelming server
    // if (i % 1000 === 0) {
    console.log(`${i} records inserted`);
    // }
  }
  console.log("✅ Finished inserting all records.");
})();
