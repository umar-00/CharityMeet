import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from '@mui/system';
import { GoogleMap, Circle, MarkerClusterer } from '@react-google-maps/api';
import { useStore } from '../../../../stores/useStore';
import EventMarker from './EventMarker/EventMarker';
import InfoBox from './InfoWindow/InfoBox';

export type OpenInfoBox = {
    isOpen: boolean;
    eventId?: number;
};

type Props = {};

function Map({}: Props) {
    const theme = useTheme();

    const mapRef = useRef<google.maps.Map>();

    const center = useMemo<google.maps.LatLngLiteral>(
        () => ({ lat: 53.166666, lng: 8.6499974 }),
        []
    );

    const onLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
    }, []);

    const [openInfoBox, setOpenInfoBox] = useState<OpenInfoBox>({ isOpen: false });

    const currentlySelectedEvent = useStore((state) => state.currentlySelectedEvent);

    const events = useStore((state) => state.events);

    const getAllEvents = useStore((state) => state.getAllEvents);

    useEffect(() => {
        console.log('useEffect, calling getAllEvents');
        getAllEvents();
    }, []);

    useEffect(() => {
        console.log('useEffect, openInfoBox change: ', openInfoBox);
    }, [openInfoBox]);

    useEffect(() => {
        console.log('useEffect, new currentlySelectedEvent:', currentlySelectedEvent);

        if (currentlySelectedEvent) {
            mapRef.current?.panTo({
                lat: currentlySelectedEvent.lat,
                lng: currentlySelectedEvent.lng,
            });
        }
    }, [currentlySelectedEvent]);

    return (
        <>
            <GoogleMap
                zoom={14}
                center={center}
                mapContainerStyle={{ width: '100%', height: '100%' }}
                options={{
                    mapId: `${theme.palette.mode === 'dark' ? 'f0f023e3616c652c' : ''}`,
                }}
                onLoad={onLoad}
            >
                {/* <MarkerClusterer>
                    {clusterer => }
                </MarkerClusterer> */}

                {events?.map((event): JSX.Element => {
                    return (
                        <EventMarker
                            event={event}
                            key={event.id}
                            openInfoBox={openInfoBox}
                            setOpenInfoBox={setOpenInfoBox}
                        />
                    );
                })}
                {openInfoBox && (
                    <InfoBox
                        event={events?.find((e) => e.id === openInfoBox.eventId)}
                        setOpenInfoBox={setOpenInfoBox}
                    />
                )}

                <Circle center={center} radius={1000} options={closeOptions} />
            </GoogleMap>
        </>
    );
}

export default Map;

// ---------- GoogleMap Circle options ----------
const defaultOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
};
const closeOptions = {
    ...defaultOptions,
    zIndex: 3,
    fillOpacity: 0.05,
    strokeColor: '#8BC34A',
    fillColor: '#8BC34A',
};
