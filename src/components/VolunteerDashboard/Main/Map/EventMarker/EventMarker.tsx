import { useTheme } from '@mui/system';
import React from 'react';
import { Marker } from '@react-google-maps/api';
import { Event } from '../../../../../interfaces/Event';
import { OpenInfoBox } from '../Map';

type Props = {
    event: Event;
    openInfoBox: OpenInfoBox;
    setOpenInfoBox: React.Dispatch<React.SetStateAction<OpenInfoBox>>;
};

const EventMarker = (props: Props) => {
    const theme = useTheme();

    const onMarkerIconButtonClick = () => {
        props.setOpenInfoBox({ eventId: props.event.id, isOpen: true });

        console.log('onMarkerIconClick setOpenInfoBox set to true: ', {
            eventId: props.event.id,
            openInfoBox: props.openInfoBox,
        });
    };

    return (
        <>
            <Marker
                position={{
                    lat: props.event.address?.lat!,
                    lng: props.event.address?.lng!,
                }}
                key={props.event.id}
                clickable
                onClick={onMarkerIconButtonClick}
                animation={
                    props.openInfoBox.isOpen && props.openInfoBox.eventId === props.event.id
                        ? 1
                        : undefined
                }
            />
        </>
    );
};

export default EventMarker;
