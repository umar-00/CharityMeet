import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import React, { useEffect, useRef, useState } from 'react';
import Header from '../VolunteerDashboard/Header/Header';
import AnimatedMain from '../FramerMotion/AnimatedMain';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/useUserStore';

type Props = {
    mode: 'light' | 'dark';
    setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
};

function Login(props: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const login = useUserStore((state) => state.login);
    // const redirectToRef = useRef(useUserStore.getState().redirectTo);

    // useEffect(
    //     () =>
    //         useUserStore.subscribe(
    //             (state) => (redirectToRef.current = state.redirectTo)
    //         ),
    //     []
    // );

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('handleSignUp, text values: ', {
            email,
            password,
            // redirectTo: redirectToRef.current,
        });

        const navigateTo = await login(email, password);

        console.log('after login: ', {
            // redirectTo: redirectToRef.current,
            navigateTo,
        });

        if (navigateTo) {
            navigate(navigateTo);
        }

        // if (redirectToRef.current) {
        //     navigate(redirectToRef.current);
        // }

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
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Log in to Charity Meet
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleLogin}
                            noValidate
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
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
                                Log In
                            </Button>
                            <NavLink to="/signup">
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Don't have an account? Sign Up
                                </Button>
                            </NavLink>
                            {/* <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid> */}
                        </Box>
                    </Box>
                </Container>
            </AnimatedMain>
        </>
    );
}

export default Login;
