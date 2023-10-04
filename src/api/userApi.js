//integrating PatientAPI to frontend
export async function fetchUser(payload) {
    try {
        const response = await fetch('http://localhost:4000/auth/login',{
           method:"POST", 
           headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        });
        if (!response.ok) {
            throw new Error('Error fetching user');
        }
        const data = await response.json();
        console.log('login data', data);
        return data;
    } catch (error) {
        console.error('Error fetching user:', error);
    }
}