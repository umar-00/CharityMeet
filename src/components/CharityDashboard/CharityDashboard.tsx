import React from 'react';
import Header from '../VolunteerDashboard/Header/Header';
import Main from '../VolunteerDashboard/Main/Main';
import Sidebar from '../VolunteerDashboard/Sidebar/Sidebar';
import './CharityDashboard.css';
import CharityMainContent from './CharityMainContent/CharityMainContent';
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
            <Main VolunteerMainContent={<CharityMainContent />}></Main>
        </div>
    );
};

export default CharityDashboard;
