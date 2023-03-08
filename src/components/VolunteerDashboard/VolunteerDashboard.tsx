import { createTheme } from '@mui/material';
import React, { useMemo, useState } from 'react';
import Header from './Header/Header';
import Main from './Main/Main';
import Sidebar from './Sidebar/Sidebar';
import './VolunteerDashboard.css';
import VolunteerSidebarContent from './Sidebar/VolunteerSidebarContent/VolunteerSidebarContent';
import GoogleMap from './Main/GoogleMap/GoogleMap';

type props = {
    mode: 'light' | 'dark';
    setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
};

const VolunteerDashboard = (props: props) => {
    return (
        <div className="grid-container-volunteer">
            <Header mode={props.mode} setMode={props.setMode} user={1}></Header>
            <Sidebar sidebarContent={<VolunteerSidebarContent />}></Sidebar>
            <Main mainContent={<GoogleMap />}></Main>
        </div>
    );
};

export default VolunteerDashboard;
