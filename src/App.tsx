import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useState, useMemo } from 'react';
import { Dashboard } from './components/Dashboard/Dashboard';

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
                <Dashboard mode={mode} setMode={setMode}></Dashboard>
        </ThemeProvider>
    );
}

export default App;
