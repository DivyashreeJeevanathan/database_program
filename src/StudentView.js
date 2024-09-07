import React from "react";

const StudentDetail = ({ student, onClose }) => {
  return (
    <div className="student-detail-container">
      <h2>Student Details</h2>
      <table className="detail-table">
        <tbody>
          <tr>
            <th>RegNo:</th>
            <td>{student.RegNo}</td>
          </tr>
          <tr>
            <th>Name:</th>
            <td>{student.Name}</td>
          </tr>
          <tr>
            <th>Department:</th>
            <td>{student.Department}</td>
          </tr>
          <tr>
            <th>Class:</th>
            <td>{student.Class}</td>
          </tr>
        </tbody>
      </table>
      <button className="close-btn" onClick={onClose}>
        Back
      </button>
    </div>
  );
};

export default StudentDetail;
