import React from 'react';
import EventsList from './EventsList/EventsList';
import SearchEvents from './SearchEvents/SearchEvents';

type Props = {};

const VolunteerSidebarContent = ({}: Props) => {
    return (
        <>
            <SearchEvents></SearchEvents>
            <EventsList></EventsList>
        </>
    );
};

export default VolunteerSidebarContent;
