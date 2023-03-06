import React from 'react';
import SortEventsButton from './SortEventsButton/SortEventsButton';
import EventListItem from './EventListItem/EventListItem';

type Props = {};

const EventsList = (props: Props) => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    const eventItems = numbers.map((number) => (
        <EventListItem key={number.toString()}></EventListItem>
    ));
    return (
        <div className="flex w-full flex-col overflow-y-auto">
            <div className="mb-3 flex items-center justify-between px-3 pt-4 opacity-60">
                <span className="">Event results</span>
                <SortEventsButton></SortEventsButton>
            </div>

            {eventItems}
        </div>
    );
};

export default EventsList;
