import React, { useEffect } from 'react';
import { Marker } from '@react-google-maps/api';
import { Event } from '../../../../../interfaces/Event';
import { OpenInfoBox } from '../Map';
import { useStore } from '../../../../../stores/useStore';

type Props = {
    event: Event;
    openInfoBox: OpenInfoBox;
    setOpenInfoBox: React.Dispatch<React.SetStateAction<OpenInfoBox>>;
    clusterer: any;
};

const EventMarker = (props: Props) => {
    const setCurrentlySelectedEvent = useStore((state) => state.setCurrentlySelectedEvent);
    const currentlySelectedEvent = useStore((state) => state.currentlySelectedEvent);

    const onMarkerIconButtonClick = () => {
        props.setOpenInfoBox({ eventId: props.event.id, isOpen: true });
        setCurrentlySelectedEvent(
            props.event.id,
            props.event.address?.lat!,
            props.event.address?.lng!
        );

        console.log('onMarkerIconClick setOpenInfoBox set to true: ', {
            eventId: props.event.id,
            openInfoBox: props.openInfoBox,
        });
    };

    useEffect(() => {
        if (currentlySelectedEvent?.id === props.event.id) {
            props.setOpenInfoBox({ eventId: props.event.id, isOpen: true });
        }
    }, [currentlySelectedEvent]);

    return (
        <>
            <Marker
                clusterer={props.clusterer}
                position={{
                    lat: props.event.address?.lat!,
                    lng: props.event.address?.lng!,
                }}
                key={props.event.id}
                clickable
                onClick={onMarkerIconButtonClick}
                animation={
                    currentlySelectedEvent?.id === props.event.id ||
                    (props.openInfoBox.isOpen && props.openInfoBox.eventId === props.event.id)
                        ? 1
                        : undefined
                }
            />
        </>
    );
};

export default EventMarker;
