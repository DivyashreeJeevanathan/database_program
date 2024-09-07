const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Supabase Configuration
const supabaseUrl = "https://dwnsgwnkskevuujyxlrl.supabase.co"; // Replace with your Supabase URL
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3bnNnd25rc2tldnV1anl4bHJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU2OTY1NTYsImV4cCI6MjA0MTI3MjU1Nn0.-xXZUhMRVKYNSzpHy8MBuGUao4v6Q3orjUVZDE1v8E8"; // Replace with your Supabase anon key
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the Student API!");
});

// Get all students
app.get("/students", async (req, res) => {
  try {
    const { data, error } = await supabase.from("students").select("*");
    if (error) {
      console.error("Error fetching students:", error);
      return res.status(500).send({ error: "Failed to fetch students" });
    }
    res.send(data);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).send({ error: "Unexpected error occurred" });
  }
});

// Add a student
app.post("/students", async (req, res) => {
  const { regNo, name, department, class: classValue } = req.body;
  try {
    const { data, error } = await supabase
      .from("students")
      .insert([{ regNo, name, department, class: classValue || null }]);
    if (error) {
      console.error("Error adding student:", error);
      return res.status(500).send({ error: "Failed to add student" });
    }
    res.send("Student added...");
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).send({ error: "Unexpected error occurred" });
  }
});

// Update a student
app.put("/students/:regNo", async (req, res) => {
  const { regNo } = req.params;
  const { name, department, class: classValue } = req.body;
  try {
    const { data, error } = await supabase
      .from("students")
      .update({ name, department, class: classValue })
      .match({ regNo });
    if (error) {
      console.error("Error updating student:", error);
      return res.status(500).send({ error: "Failed to update student" });
    }
    res.send("Student updated...");
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).send({ error: "Unexpected error occurred" });
  }
});

// Delete a student
app.delete("/students/:regNo", async (req, res) => {
  const { regNo } = req.params;
  try {
    const { data, error } = await supabase
      .from("students")
      .delete()
      .match({ regNo });
    if (error) {
      console.error("Error deleting student:", error);
      return res.status(500).send({ error: "Failed to delete student" });
    }
    res.send("Student deleted...");
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).send({ error: "Unexpected error occurred" });
  }
});

// Server Listening
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
