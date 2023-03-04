import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Main from './components/Main/Main';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import { CssBaseline } from '@mui/material';
import { useState, useMemo } from 'react';

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
            <div className="App">
                <Header mode={mode} setMode={setMode}></Header>
                <Sidebar></Sidebar>
                <Main></Main>
            </div>
        </ThemeProvider>
    );
}

export default App;
