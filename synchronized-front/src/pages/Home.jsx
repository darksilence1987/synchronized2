import React, {useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import {Button, AppBar, Toolbar, Typography, TextField, Container, CardHeader, Card, Avatar, CardContent} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Profile from "./Profile"; // Import the useAuth hook

const Home = (callback, deps) => {
    const { isAuthenticated, logout, sessionId } = useAuth(); // Retrieve the sessionId from the context
    const [posts, setPosts] = useState([]);
    const[newTitleContent, setNewTitleContent] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const navigate = useNavigate();
        const navigateToProfile = () => {
            navigate('/profile');
        };
    const handleNewPostChange = (event) => {
        setNewPostContent(event.target.value);
    };
    const handleNewTitleChange = (event) => {
        setNewTitleContent(event.target.value);
    }
    const handleCreatePost = async (event) => {
        event.preventDefault();
        try {
            await axios.post(
                'http://localhost:8080/posts/create',
                { title: newTitleContent,
                    content: newPostContent,
                    sessionId : sessionId
                },
                { }
            );
            setNewTitleContent(''); // Clear the title input field
            setNewPostContent(''); // Clear the input field
            fetchPosts(); // Re-fetch posts to update the list
        } catch (error) {
            console.error('Failed to create post', error);
        }
    };
    const fetchPosts = useCallback(async () => {
        if (sessionId) {
            try {
                const response = await axios.get('http://localhost:8080/posts/getAll', {
                    params: { sessionId },
                });
                setPosts(response.data);
            } catch (error) {
                console.error('Failed to fetch posts', error);
            }
        }
    });
    useEffect(() => {
        

        if (isAuthenticated) {
            fetchPosts();
        }


        }, [isAuthenticated, sessionId, fetchPosts]);
    return (
        <Container>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Social Media App
                    </Typography>
                    {!isAuthenticated ? (
                        <>
                            <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
                            <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
                        </>
                    ) : (
                        <Button color="inherit" onClick={logout}>Logout</Button>
                    )}
                </Toolbar>
            </AppBar>
            <Button onClick={navigateToProfile}>View Profile</Button>
            <Container maxWidth="md">
                {isAuthenticated ? (
                    <>
                        <Typography variant="h4" gutterBottom>
                            Create a new post
                        </Typography>
                        <form onSubmit={handleCreatePost}>
                            <TextField label="Title"
                                       value={newTitleContent}
                                       onChange={handleNewTitleChange}
                                       variant="outlined"
                                       margin="normal" />
                            <TextField
                                label="What's on your mind?"
                                fullWidth
                                multiline
                                rows={4}
                                value={newPostContent}
                                onChange={handleNewPostChange}
                                variant="outlined"
                                margin="normal"
                            />
                            <Button type="submit" variant="contained" color="primary">
                                Post
                            </Button>
                        </form>

                    </>
                ) : (
                    <Typography variant="h5">
                        Please log in to view and create posts.
                    </Typography>
                )}
            </Container>
            {isAuthenticated ? (
                posts.map((post) => (
                    <Card key={post.id} sx={{ marginBottom: 2 }}>
                        <CardHeader
                            avatar={<Avatar aria-label="post">{post.username.charAt(0)}</Avatar>}
                            title={post.username}
                            subheader={new Date(post.timestamp).toLocaleString()}
                        />
                        <CardContent>
                            <Typography variant="h6" component="h3" gutterBottom>
                                {post.title} {/* Display the post title */}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {post.content}
                            </Typography>
                        </CardContent>
                        {/* Add CardActions for like, comment, share, etc. */}
                    </Card>
                ))
            ) : (
                <Typography variant="h5">
                    Please login to view posts.
                </Typography>
            )}
        </Container>
    );
};

export default Home;