import React, { useState , useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {useAuth} from "../context/AuthContext";
import { TextField, Button, Typography, Container, Alert } from '@mui/material';

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const {login} = useAuth();

    useEffect(() => {
        if (location.state?.success) {
            setShowSuccessMessage(true);
            // Optionally, clear the state so it doesn't show the message if the user navigates away and comes back
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location, navigate]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/users/login', formData);
            const sessionId = response.data;
            console.log('Login successful', sessionId);
            login(sessionId); // This should update your authentication context
            navigate('/'); // Redirect to home page
        } catch (error) {
            // 'error.response' might be undefined if the server doesn't send a response or
            // if there's a network error, so we check for its existence first.
            if (error.response) {
                console.error('Login failed', error.response.data);
                // Handle login failure with data from the server's response
            } else if (error.request) {
                console.error('No response received', error.request);
                // Handle no response received case
            } else {
                console.error('Error setting up the request', error.message);
                // Handle other errors related to setting up the request
            }
            // Optionally, you can provide a more generic error message to the user
        }
    };

    return (
        <div>
            <Container maxWidth="xs">
                <Typography variant="h4">Login</Typography>
                {showSuccessMessage && <Alert severity="success">Registration successful! Please log in.</Alert>}
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Username"
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
                    <button type="submit">Login</button>
                </form>
            </Container>

        </div>
    );
};

export default Login;
