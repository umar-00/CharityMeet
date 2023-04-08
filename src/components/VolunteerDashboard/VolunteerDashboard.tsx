import React, { useEffect } from 'react';
import Header from './Header/Header';
import Main from './Main/Main';
import Sidebar from './Sidebar/Sidebar';
import './VolunteerDashboard.css';
import VolunteerSidebarContent from './Sidebar/VolunteerSidebarContent/VolunteerSidebarContent';
import Map from './Main/Map/Map';
import { useStore } from '../../stores/useStore';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

type props = {
    mode: 'light' | 'dark';
    setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
};

const VolunteerDashboard = (props: props) => {
    const getAllEvents = useStore((state) => state.getAllEvents);

    const currentlySelectedEvent = useStore((state) => state.currentlySelectedEvent);

    const setCurrentlySelectedEvent = useStore((state) => state.setCurrentlySelectedEvent);

    const filteredEvents = useStore((state) => state.filteredEvents);

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        console.log('useEffect, calling getAllEvents');
        getAllEvents();
    }, []);

    useEffect(() => {
        console.log('useEffect, currentlySelectedEvent: ', currentlySelectedEvent);
        if (currentlySelectedEvent) {
            setSearchParams({ eventId: `${currentlySelectedEvent?.id}` });
        }
    }, [currentlySelectedEvent]);

    useEffect(() => {
        let eventIdFromParams = Number(searchParams.get('eventId'));

        console.log('useEffect, filteredEvents, currentlySelectedEvent and searchParams: ', {
            filteredEvents,
            currentlySelectedEvent,
            eventIdFromParams,
        });

        if (filteredEvents && eventIdFromParams) {
            const event = filteredEvents.find((event) => event.id === eventIdFromParams);

            if (!event) {
                toast.error('Event not found in state.');
                return;
            }

            let lat = event.address?.lat!;
            let lng = event.address?.lng!;

            setCurrentlySelectedEvent(event.id, lat, lng);
            console.log('setting currently selected event');
        }
    }, [filteredEvents, searchParams]);

    return (
        <div className="grid-container-volunteer">
            <Header mode={props.mode} setMode={props.setMode} user={1}></Header>
            <Sidebar sidebarContent={<VolunteerSidebarContent />}></Sidebar>
            <Main mainContent={<Map />}></Main>
        </div>
    );
};

export default VolunteerDashboard;
