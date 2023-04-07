import React, { createRef, useEffect, useState } from 'react';
import SortEventsButton from './SortEventsButton/SortEventsButton';
import EventListItem from './EventListItem/EventListItem';
import { useStore } from '../../../../../stores/useStore';
import dayjs from 'dayjs';
import { Event } from '../../../../../interfaces/Event';

export type SortBy = 'Event title' | 'Creation date';

type Props = {};

const EventsList = (props: Props) => {
    const [sortBy, setSortBy] = useState<SortBy>('Event title');

    const events = useStore((state) => state.events);

    const currentlySelectedEvent = useStore((state) => state.currentlySelectedEvent);

    const listItemRef = createRef<HTMLDivElement>();

    useEffect(() => {
        listItemRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [currentlySelectedEvent]);

    useEffect(() => {
        console.log('useEffect, new sortby: ', sortBy);
    }, [sortBy]);

    const sortByTitle = (a: Event, b: Event) => a.title.localeCompare(b.title);
    const sortByCreationDate = (a: Event, b: Event) =>
        (a.created_at as unknown as string).localeCompare(b.created_at as unknown as string);

    return (
        <div className="flex w-full flex-col overflow-y-auto">
            <div className="mb-3 flex items-center justify-between px-3 pt-4 opacity-60">
                <span className="mt-1 self-start">Event results</span>
                <SortEventsButton sortBy={sortBy} setSortBy={setSortBy}></SortEventsButton>
            </div>

            {events
                ?.sort(sortBy === 'Event title' ? sortByTitle : sortByCreationDate)
                .map((event) => (
                    <EventListItem
                        key={event.id}
                        address={event.address!}
                        charityName={event.charity_name}
                        createdAt={dayjs(event.created_at).format('DD MMMM YYYY, HH:mm')}
                        title={event.title}
                        eventId={event.id}
                        customRef={currentlySelectedEvent?.id === event.id ? listItemRef : null}
                    />
                ))}
        </div>
    );
};

export default EventsList;
