import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useState, useMemo } from 'react';
import VolunteerDashboard from './components/VolunteerDashboard/VolunteerDashboard';
import { Route, Routes } from 'react-router-dom';
import Error from './components/Error/Error';
import CharityDashboard from './components/CharityDashboard/CharityDashboard';
import Login from './components/Login/Login';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    const [mode, setMode] = useState<'light' | 'dark'>('dark');

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode]
    );
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                <Route
                    path="/volunteer-dashboard"
                    element={
                        <VolunteerDashboard mode={mode} setMode={setMode} />
                    }
                />
                <Route
                    path="/charity-dashboard"
                    element={<CharityDashboard mode={mode} setMode={setMode} />}
                />
                <Route
                    path="/login"
                    element={<Login mode={mode} setMode={setMode} />}
                />
                <Route path="*" element={<Error />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
