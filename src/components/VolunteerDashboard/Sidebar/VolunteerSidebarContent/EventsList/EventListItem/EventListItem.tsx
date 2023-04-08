import { Chip, useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import { Event, EventAddress } from '../../../../../../interfaces/Event';
import { useStore } from '../../../../../../stores/useStore';
import React from 'react';
import dayjs from 'dayjs';

type Props = {
    customRef: React.RefObject<HTMLDivElement> | null;
    event: Event;
};

export default function EventListItem(props: Props) {
    const theme = useTheme();

    const setCurrentlySelectedEvent = useStore((state) => state.setCurrentlySelectedEvent);

    const currentlySelectedEvent = useStore((state) => state.currentlySelectedEvent);

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log('handleClick, title: ', props.event.title);
        setCurrentlySelectedEvent(
            props.event.id,
            props.event.address?.lat!,
            props.event.address?.lng!
        );
    };

    const hoverColor = () => {
        if (theme.palette.mode === 'dark') {
            return 'bg-sky-900';
        } else return 'bg-sky-200';
    };

    return (
        <>
            <div
                onClick={handleClick}
                className={` hover: flex h-fit cursor-pointer flex-col border-x-0 border-b-0 p-3 transition-colors [&:nth-child(1)]:border-t-0
                ${currentlySelectedEvent?.id === props.event.id ? hoverColor() : ''}`}
                style={{
                    borderColor: theme.palette.text.primary,
                }}
                ref={props.customRef}
            >
                <span className="text-lg font-bold">Title: {props.event.title}</span>

                <span className="text-lg">
                    Distance from address:{' '}
                    <Chip
                        color="success"
                        label={props.event.distanceToAddressInKiloMeters?.toFixed(2) + ' km'}
                    />
                    {/* {props.event.distanceToAddressInKiloMeters?.toFixed(2)}{' '}
                    km */}
                </span>

                <span className="text-lg">Charity name: {props.event.charity_name}</span>
                <span className="text-lg">Address: {props.event.address?.description}</span>
                <span className="text-lg">
                    Created at: {dayjs(props.event.created_at).format('DD MMMM YYYY, HH:mm')}
                </span>
            </div>
            <Divider />
        </>
    );
}
