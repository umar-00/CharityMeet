import { useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import { EventAddress } from '../../../../../../interfaces/Event';
import { useStore } from '../../../../../../stores/useStore';
import React from 'react';

type Props = {
    eventId: number;
    address: EventAddress;
    charityName: string;
    title: string;
    createdAt: string;
    customRef: React.RefObject<HTMLDivElement> | null;
};

export default function EventListItem(props: Props) {
    const theme = useTheme();

    const setCurrentlySelectedEvent = useStore((state) => state.setCurrentlySelectedEvent);

    const currentlySelectedEvent = useStore((state) => state.currentlySelectedEvent);

    // const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //     // console.log('mouse enter, title: ', props.title);
    //     setCurrentlySelectedEvent(props.eventId, props.address.lat, props.address.lng);
    // };

    // const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //     // console.log('mouse leave, title: ', props.title);
    //     removeCurrentlySelectedEvent();
    // };

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log('handleClick, title: ', props.title);
        setCurrentlySelectedEvent(props.eventId, props.address.lat, props.address.lng);
    };

    const hoverColor = () => {
        if (theme.palette.mode === 'dark') {
            return 'bg-sky-900';
        } else return 'bg-sky-200';
    };

    return (
        <>
            <div
                // onMouseEnter={handleMouseEnter}
                // onMouseLeave={handleMouseLeave}
                onClick={handleClick}
                className={` hover: flex h-fit cursor-pointer flex-col border-x-0 border-b-0 p-3 transition-colors [&:nth-child(1)]:border-t-0
                ${currentlySelectedEvent?.id === props.eventId ? hoverColor() : ''}`}
                style={{
                    borderColor: theme.palette.text.primary,
                    // backgroundColor: blue[600],
                    // opacity: 0.8,
                }}
                ref={props.customRef}
            >
                <span className="text-lg font-bold">Title: {props.title}</span>
                <span className="text-lg">Charity name: {props.charityName}</span>
                <span className="text-lg">Address: {props.address.description}</span>
                <span className="text-lg">Created at: {props.createdAt}</span>

                {/* <span className="text-xl font-bold">Event XYZ</span>
                <span className="text-lg">Distance: 9.4 kilometres</span>
                <span className="text-lg">Address: College Ring 4</span> */}
            </div>
            <Divider />
        </>
    );
}
