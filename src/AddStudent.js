import React, { useState } from "react";
import axios from "axios";
import "./AddStudentForm.css";

const AddStudent = ({ onClose }) => {
  const [student, setStudent] = useState({
    regNo: "",
    name: "",
    department: "",
    class: "",
  });

  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleAdd = () => {
    axios
      .post("https://xdzhmv-5000.csb.app/students/", student)
      .then((response) => {
        console.log("Student added successfully:", response.data);
        setMessage("Student added successfully!");
        setStudent({
          regNo: "",
          name: "",
          department: "",
          class: "",
        });
      })
      .catch((error) => {
        console.error("There was an error adding the student:", error);
        setMessage("Failed to add student. Please try again.");
      });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add Student</h2>
      {message && <p>{message}</p>}
      <div className="form-group">
        <label>RegNo:</label>
        <input
          type="text"
          name="regNo"
          value={student.regNo}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={student.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Department:</label>
        <input
          type="text"
          name="department"
          value={student.department}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Class:</label>
        <input
          type="text"
          name="class"
          value={student.class}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-actions">
        <button className="btn add-btn" onClick={handleAdd}>
          Add
        </button>
        <button className="btn back-btn" onClick={onClose}>
          Back
        </button>
      </div>
    </div>
  );
};

export default AddStudent;
