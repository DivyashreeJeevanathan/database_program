import React, { useState, useEffect } from "react";
import axios from "axios";
import AddStudent from "./AddStudent";
import StudentView from "./StudentView";
import EditStudent from "./EditStudent";

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    axios
      .get("https://xdzhmv-5000.csb.app/students/")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the students!", error);
      });
  }, []);

  const handleAddStudentClick = () => {
    setShowAddStudent(true);
  };

  const handleCloseForm = () => {
    setShowAddStudent(false);
  };

  const handleViewStudentClick = (student) => {
    setSelectedStudent(student);
  };

  const handleCloseView = () => {
    setSelectedStudent(null);
  };

  const handleEditStudentClick = (student) => {
    setEditingStudent(student);
  };

  const handleCloseEdit = () => {
    setEditingStudent(null);
  };

  const handleSaveStudent = (updatedStudent) => {
    setStudents(
      students.map((student) =>
        student.RegNo === updatedStudent.RegNo ? updatedStudent : student
      )
    );
  };

  const handleDeleteStudentClick = (regNo) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      axios
        .delete(`https://xdzhmv-5000.csb.app/students/${regNo}`)
        .then((response) => {
          console.log("Student deleted successfully:", response.data);
          setStudents(students.filter((student) => student.RegNo !== regNo));
        })
        .catch((error) => {
          console.error("There was an error deleting the student:", error);
        });
    }
  };

  return (
    <div>
      {!showAddStudent && !selectedStudent && !editingStudent ? (
        <>
          <h1 className="title">Students List</h1>
          <button className="add-button" onClick={handleAddStudentClick}>
            Add Student
          </button>
          <table className="student-table">
            <thead>
              <tr>
                <th>RegNo</th>
                <th>Name</th>
                <th>Department</th>
                <th>Class</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.RegNo}>
                  <td>{student.RegNo}</td>
                  <td>{student.Name}</td>
                  <td>{student.Department}</td>
                  <td>{student.Class}</td>
                  <td>
                    <button
                      className="action-btn view"
                      onClick={() => handleViewStudentClick(student)}
                    >
                      👁️
                    </button>
                    <button
                      className="action-btn edit"
                      onClick={() => handleEditStudentClick(student)}
                    >
                      ✏️
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDeleteStudentClick(student.RegNo)}
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : showAddStudent ? (
        <AddStudent onClose={handleCloseForm} />
      ) : editingStudent ? (
        <EditStudent
          student={editingStudent}
          onClose={handleCloseEdit}
          onSave={handleSaveStudent}
        />
      ) : (
        <StudentView student={selectedStudent} onClose={handleCloseView} />
      )}
    </div>
  );
};

export default StudentTable;
