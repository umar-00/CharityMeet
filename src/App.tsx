import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useState, useMemo } from 'react';
import VolunteerDashboard from './components/VolunteerDashboard/VolunteerDashboard';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Error from './components/Error/Error';
import CharityDashboard from './components/CharityDashboard/CharityDashboard';
import Login from './components/Login/Login';
import EventsManagement from './components/CharityDashboard/EventsManagement/EventsManagement';
import EventsCreation from './components/CharityDashboard/EventsCreation/EventsCreation';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AnimatePresence } from 'framer-motion';

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
                    ...(mode === 'dark'
                        ? {
                              // palette values for light mode
                              background: {
                                  default: '#0a1929',
                              },
                          }
                        : {
                              // palette values for light mode
                          }),
                },
            }),
        [mode]
    );

    const location = useLocation();

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AnimatePresence mode="wait">
                    <Routes key={location.pathname} location={location}>
                        <Route
                            path="/"
                            element={
                                <Navigate to="/volunteer-dashboard" replace />
                            }
                        />
                        <Route
                            path="/volunteer-dashboard"
                            element={
                                <VolunteerDashboard
                                    mode={mode}
                                    setMode={setMode}
                                />
                            }
                        />

                        <Route
                            path="/charity-dashboard"
                            element={
                                <CharityDashboard
                                    mode={mode}
                                    setMode={setMode}
                                />
                            }
                        >
                            <Route
                                index
                                element={
                                    <Navigate
                                        to="/charity-dashboard/manage"
                                        replace
                                    />
                                }
                            />
                            <Route
                                path="manage"
                                element={<EventsManagement />}
                            />
                            <Route
                                path="map-view"
                                element={<EventsCreation />}
                            />
                        </Route>

                        <Route
                            path="/login"
                            element={<Login mode={mode} setMode={setMode} />}
                        />
                        <Route path="*" element={<Error />} />
                    </Routes>
                </AnimatePresence>
            </ThemeProvider>
        </LocalizationProvider>
    );
}

export default App;
