import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Container } from '@mui/material';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [registerSuccess, setRegisterSuccess] = useState(false);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/users/register', formData);
            setRegisterSuccess(true); // Update state to indicate registration success
            navigate('/login', { state: { success: true } }); // Redirect to login with state
        } catch (error) {
            console.error('Registration failed', error.response.data);
            // Handle registration failure, e.g., display error message
        }
    };

    // JSX code for the registration form
    return (
        <Container maxWidth="xs">
            <Typography variant="h4">Register</Typography>
            {/* Form fields and submit button */}
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    required
                />
                <button type="submit">Register</button>
            </form>
        </Container>
    );
};

export default Register;
