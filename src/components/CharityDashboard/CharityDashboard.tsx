import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../VolunteerDashboard/Header/Header';
import Main from '../VolunteerDashboard/Main/Main';
import Sidebar from '../VolunteerDashboard/Sidebar/Sidebar';
import './CharityDashboard.css';
import CharitySideBarContent from './CharitySideBarContent/CharitySideBarContent';

type Props = {
    mode: 'light' | 'dark';
    setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
};

const CharityDashboard = (props: Props) => {
    return (
        <div className="grid-container-charity">
            <Header mode={props.mode} setMode={props.setMode} user={1}></Header>
            <Sidebar sidebarContent={<CharitySideBarContent />}></Sidebar>
            <Main
                mainContent={<Outlet />}
                optionalTailWindClasses="overflow-y-auto overflow-x-hidden"
            ></Main>
        </div>
    );
};

export default CharityDashboard;
