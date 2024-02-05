import React, { useContext, useState, useEffect } from 'react';
import { Container, Typography, Paper, Avatar } from '@mui/material';
import { useAuth } from '../context/AuthContext'; // Import your authentication context
import axios from "axios";

const Profile = () => {
    const { sessionId } = useAuth(); // Get the sessionId from the AuthContext
    const [profile, setProfile] = useState(null);
    const avatarUrl = '/path/to/default/avatar.jpg'; // Replace with the actual avatar URL path

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/users/profile`, {
                    params: { sessionId },
                });
                setProfile(response.data); // Set the profile in the state
            } catch (error) {
                console.error('Failed to fetch profile', error);
                // Handle errors appropriately
            }
        };

        if (sessionId) {
            fetchProfile();
        }
    }, [sessionId]);

    // If profile data is not fetched yet, you can show a loading indicator or a message
    if (!profile) {
        return <div>Loading profile...</div>;
    }

    return (
        <Container component="main" maxWidth="md">
            <Paper style={{ marginTop: 24, padding: 16 }}>
                <Avatar src={profile.avatar || avatarUrl} alt={profile.username} />
                <Typography variant="h4" component="h1" gutterBottom>
                    {profile.username || 'User Profile'}
                </Typography>
                <Typography variant="body1">
                    Email: {profile.email}
                </Typography>
                {/* More user profile information */}
            </Paper>
        </Container>
    );
};

export default Profile;