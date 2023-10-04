import React from 'react';
import './patientList.css';

const PatientList = props => {
  const { patients, onEdit, onDelete } = props;
  console.log('patients',patients);
  return (
    <div className="patient-list">
      <h2>Patients</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Medical History</th>
            <th>Last Visit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients && patients.map((patient) => (
            <tr key={patient._id}>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.medicalHistory}</td>
              <td>{patient.lastVisit}</td>
              <td>
                <button className="patient-list-edit-btn" onClick={() => onEdit(patient)}>Edit</button>
                <button className="patient-list-delete-btn" onClick={() => onDelete(patient._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default PatientList;
