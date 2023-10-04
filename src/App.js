import React, { useState, useEffect } from 'react';
import './App.css';
import PatientList from './components/PatientList';
import * as patientApi from './api/patientApi'
import PatientFormModal from './components/PatientModalForm';
import Login from './components/Login';

function App() {
  const [patients, setPatients] = useState([]);
  const [editedPatient, setEditedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('add');
  const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated") === "true");
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    medicalHistory: '',
    lastVisit: '',
  });


  async function fetchPatients() {
    try {
      const data = await patientApi.fetchPatients();
      console.log('response', data);
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  }
  useEffect(() => {
    if (authenticated) //checks user if it's authenticated
      fetchPatients();
  }, [authenticated]);

  const setFormValues = (patient) => {
    setFormData({
      name: patient.name,
      age: patient.age,
      medicalHistory: patient.medicalHistory,
      lastVisit: patient.lastVisit,
    });
  };

  const onEdit = (patient) => {
    setEditedPatient(patient);
    setFormValues(patient);
    openEditPatientModal();
  };

  const onDelete = async (patientId) => {
    try {
      await patientApi.deletePatient(patientId);
      const updatedPatients = await patientApi.fetchPatients();
      setPatients(updatedPatients);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const openAddPatientModal = () => {
    setModalAction('add');
    setIsModalOpen(true);
  };


  const openEditPatientModal = () => {
    setModalAction('edit');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: '',
      age: '',
      medicalHistory: '',
      lastVisit: '',
    });
  };

  const handleFormSubmit = async (formData) => {
    try {
      //if editing is enabled the same modal form will be handled for edit else for add
      if (editedPatient) {
        await patientApi.updatePatient(editedPatient._id, formData);
        const updatedPatients = await patientApi.fetchPatients();
        setPatients(updatedPatients);
        setEditedPatient(null);
        closeModal();
      } else {
        await patientApi.createPatient(formData);
        const updatedPatients = await patientApi.fetchPatients();
        setPatients(updatedPatients);
        closeModal();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleLogin = () => {
    setAuthenticated(true);
    localStorage.setItem('authenticated', 'true');
  };
  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem('authenticated');
    localStorage.removeItem('token');
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-container">
          <h1>Healthcare Dashboard</h1>
          {authenticated && <button onClick={handleLogout}>Logout</button>}
        </div>
      </header>
      <main>
        {authenticated ?
          <PatientList patients={patients} onEdit={onEdit} onDelete={onDelete} />
          : <Login onLogin={handleLogin} />}
        {isModalOpen &&
          <PatientFormModal className="patient-form-modal"
            isOpen={isModalOpen}
            onClose={closeModal}
            onSubmit={handleFormSubmit}
            initialValues={formData}
            action={modalAction}
          />}
          {authenticated ? (
          <div className="add-button-container">
            <button onClick={openAddPatientModal} className="add-button">
              Add Patient
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </main>
    </div>
  );
}



export default App;


