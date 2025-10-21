const autocannon = require("autocannon");

const API_URL = "http://localhost:5000/todos/";
const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNtYjBxamI3eTAwMDF6d2VzZ2p4eHlocXMiLCJyb2xlIjoic3VwZXJfYWRtaW4ifQ.RXnEkNEx9koIWuSPhPXE61cdIrbX_B1WLB0TQ-G0WAw"; // replace with your actual token

// Run autocannon benchmark
const instance = autocannon(
  {
    url: API_URL,
    method: "GET",
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    // customize the load test
    connections: 50, // number of concurrent connections
    pipelining: 10, // how many requests to pipeline
    duration: 30, // test duration in seconds
  },
  finishedBench
);

// Prints progress during the run
autocannon.track(instance, { renderProgressBar: true });

// Called when finished
function finishedBench(err, res) {
  if (err) {
    console.error("Benchmark failed:", err);
    return;
  }
  console.log("Benchmark results:");
  console.log(res);
}
