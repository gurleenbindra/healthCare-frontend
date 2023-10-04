//integrating PatientAPI to frontend
export async function fetchPatients() {
    try {
        const token = localStorage.getItem('token');
        console.log('token', token);

        if (!token) {
            throw new Error('No authentication token available.');
        }
        const response = await fetch('http://localhost:4000/patients',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }});
            console.log('response', response);
        if (!response.ok) {
            throw new Error('Error fetching patients');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching patients:', error);
    }
}

export async function createPatient(params) {

    try {

        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No authentication token available.');
        }
        const response = await fetch(`http://localhost:4000/patients`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(params),
        });
        console.log('response of add', response);
        if (!response.ok) {
            throw new Error('Error creating patient');
        }
        const newPatient = await response.json();
        console.log('new patient', newPatient);
        return newPatient;
    } catch (error) {
        throw error;
    }
}

export async function deletePatient(id) {
    try {
        const token = localStorage.getItem('token');
        console.log('token', token);

        if (!token) {
            throw new Error('No authentication token available.');
        }
        const response = await fetch(`http://localhost:4000/patients/${id}`, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }});
        if (!response.ok) {
            throw new Error('Error deleting patient');
        }
        return response;
    } catch (error) {
        console.error('Error fetching patients:', error);
    }
}

export async function updatePatient(id, params) {
    try {
        const token = localStorage.getItem('token');
        console.log('token', token);

        if (!token) {
            throw new Error('No authentication token available.');
        }
        const response = await fetch(`http://localhost:4000/patients/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(params),
        });

        if (!response.ok) {
            throw new Error('Error updating patient');
        }

        return response;
    } catch (error) {
        console.error('Error updating patient:', error);
        throw error;
    }
}
