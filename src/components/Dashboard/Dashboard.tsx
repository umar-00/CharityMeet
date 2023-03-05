import { createTheme } from '@mui/material';
import React, { useMemo, useState } from 'react';
import Header from './Header/Header';
import Main from './Main/Main';
import Sidebar from './Sidebar/Sidebar';
import './Dashboard.css';   

type props = {
    mode: 'light' | 'dark';
    setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
};

export const Dashboard = ({ mode, setMode }: props) => {
    return (
        <>
            <div className="App">
                <Header mode={mode} setMode={setMode}></Header>
                <Sidebar></Sidebar>
                <Main></Main>
            </div>
        </>
    );
};
