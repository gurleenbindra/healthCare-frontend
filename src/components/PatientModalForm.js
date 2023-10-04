import React, { useState } from 'react';
import './PatientModalForm.css';

const PatientFormModal = ({ isOpen, onClose, onSubmit, initialValues, action }) => {
    const [formData, setFormData] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name==='lastVisit')
        {
            const newDate=(new Date(value)).toISOString();
            console.log('newDate',newDate);
            setFormData({ ...formData, [name]: newDate })
            return;
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        console.log('formData',formData);
        onSubmit(formData);
        onClose();
    };

    const newDate = new Date(formData.lastVisit);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(newDate.getDate()).padStart(2, '0');
    
    const formattedDate = `${year}-${month}-${day}`;
    return (
        <div className={`modal ${isOpen ? 'is-open' : ''}`}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{action === 'edit' ? 'Edit Patient' : 'Add Patient'}</h2>
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    <label>Age:</label>
                    <input type="text" name="age" value={formData.age} onChange={handleChange} required />
                    <label>Medical History:</label>
                    <input type="text" name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} required />
                    <label>Last Visit:</label>
                    <input type="date" name="lastVisit" value={formattedDate} onChange={handleChange} required />
                    <button type="submit">{action === 'edit' ? 'Update' : 'Add'}</button>
                </form>
            </div>
        </div>
    );
};

export default PatientFormModal;
