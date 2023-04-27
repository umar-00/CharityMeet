import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import React, { useState } from 'react';
import Header from '../VolunteerDashboard/Header/Header';
import AnimatedMain from '../FramerMotion/AnimatedMain';
import { NavLink, useNavigate } from 'react-router-dom';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useStore } from '../../stores/useStore';

type Props = {
    mode: 'light' | 'dark';
    setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
};

function Signup(props: Props) {
    const [charityName, setCharityName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const signupCharity = useStore((state) => state.signupCharity);

    const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('handleSignUp, text values: ', { email, password });

        const navigateTo = await signupCharity(
            email,
            password,
            charityName,
            contactEmail,
            contactPhone
        );

        if (navigateTo) {
            navigate(navigateTo);
        }

        setEmail('');
        setPassword('');
    };

    return (
        <>
            <Header mode={props.mode} setMode={props.setMode} />
            <AnimatedMain>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <HowToRegIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" align="center">
                            Sign up to Charity Meet (for charities)
                        </Typography>
                        <Box component="form" onSubmit={handleSignup} sx={{ mt: 1 }}>
                            <TextField
                                className="!mb-4"
                                margin="normal"
                                required
                                fullWidth
                                id="charityName"
                                label="Charity name"
                                name="charityName"
                                value={charityName}
                                // error={charityName.length === 0}
                                // helperText={
                                //     charityName.length === 0
                                //         ? 'Name cannot be empty.'
                                //         : ''
                                // }
                                onChange={(e) => setCharityName(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="contactEmail"
                                label="Contact email"
                                helperText="Used by volunteers to contact you, not used for login."
                                name="contactEmail"
                                value={contactEmail}
                                onChange={(e) => setContactEmail(e.target.value)}
                            />
                            <TextField
                                className="!mb-10"
                                margin="normal"
                                fullWidth
                                id="contactPhone"
                                label="Contact phone"
                                name="contactPhone"
                                value={contactPhone}
                                onChange={(e) => setContactPhone(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                helperText="Used by you to login to this application."
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>

                            <NavLink to="/login">
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Already have an account? Log in
                                </Button>
                            </NavLink>
                        </Box>
                    </Box>
                </Container>
            </AnimatedMain>
        </>
    );
}

export default Signup;
