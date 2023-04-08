import { createTheme } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import Header from './Header/Header';
import Main from './Main/Main';
import Sidebar from './Sidebar/Sidebar';
import './VolunteerDashboard.css';
import VolunteerSidebarContent from './Sidebar/VolunteerSidebarContent/VolunteerSidebarContent';
import Map from './Main/Map/Map';
import { useStore } from '../../stores/useStore';

type props = {
    mode: 'light' | 'dark';
    setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
};

const VolunteerDashboard = (props: props) => {
    const getAllEvents = useStore((state) => state.getAllEvents);

    useEffect(() => {
        console.log('useEffect, calling getAllEvents');
        getAllEvents();
    }, []);

    return (
        <div className="grid-container-volunteer">
            <Header mode={props.mode} setMode={props.setMode} user={1}></Header>
            <Sidebar sidebarContent={<VolunteerSidebarContent />}></Sidebar>
            <Main mainContent={<Map />}></Main>
        </div>
    );
};

export default VolunteerDashboard;
