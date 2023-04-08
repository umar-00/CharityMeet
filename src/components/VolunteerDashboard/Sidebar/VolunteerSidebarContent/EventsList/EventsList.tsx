import { useEffect, useMemo, useRef, useState } from 'react';
import SortEventsButton from './SortEventsButton/SortEventsButton';
import EventListItem from './EventListItem/EventListItem';
import { useStore } from '../../../../../stores/useStore';
import { Event } from '../../../../../interfaces/Event';

export type SortBy = 'Event title' | 'Creation date' | 'Distance from address';

export const Default_Sort_By: SortBy = 'Distance from address';

type Props = {};

const EventsList = (props: Props) => {
    const [sortBy, setSortBy] = useState<SortBy>(Default_Sort_By);

    const filteredEvents = useStore((state) => state.filteredEvents);

    const currentlySelectedEvent = useStore((state) => state.currentlySelectedEvent);

    const listItemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        listItemRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [currentlySelectedEvent]);

    const chooseSortingFunc = useMemo(() => {
        // console.log('calling chooseSortingFunc');

        switch (sortBy) {
            case 'Event title':
                return sortByTitle;
            case 'Creation date':
                return sortByCreationDate;
            case 'Distance from address':
                return sortByDistance;
        }
    }, [sortBy]);

    return (
        <div className="flex w-full flex-col overflow-y-auto">
            <div className="mb-3 flex items-center justify-between px-3 pt-4 opacity-60">
                <span className="mt-1 self-start">Event results</span>
                <SortEventsButton sortBy={sortBy} setSortBy={setSortBy}></SortEventsButton>
            </div>

            {filteredEvents?.sort(chooseSortingFunc).map((event) => (
                <EventListItem
                    key={event.id}
                    event={event}
                    customRef={currentlySelectedEvent?.id === event.id ? listItemRef : null}
                />
            ))}
        </div>
    );
};

export default EventsList;

const sortByTitle = (a: Event, b: Event) => a.title.localeCompare(b.title);

const sortByCreationDate = (a: Event, b: Event) =>
    (a.created_at as unknown as string).localeCompare(b.created_at as unknown as string);

const sortByDistance = (a: Event, b: Event) =>
    a.distanceToAddressInKiloMeters! - b.distanceToAddressInKiloMeters!;
