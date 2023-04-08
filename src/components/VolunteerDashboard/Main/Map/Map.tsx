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

    const currentlySelectedEvent = useStore((state) => state.currentlySelectedEvent);

    const currentlySelectedAddress = useStore((state) => state.currentlySelectedAddress);

    const mapRef = useRef<google.maps.Map>();

    const center = useMemo<google.maps.LatLngLiteral>(() => {
        // console.log('inside useMemo, currentlySelectedAddress: ', currentlySelectedAddress);
        return { lat: currentlySelectedAddress.lat, lng: currentlySelectedAddress.lng };
    }, [currentlySelectedAddress]);

    const onLoad = useCallback((map: google.maps.Map) => {
        // console.log('on map load, setting mapRef');
        mapRef.current = map;
    }, []);

    const [openInfoBox, setOpenInfoBox] = useState<OpenInfoBox>({ isOpen: false });

    const filteredEvents = useStore((state) => state.filteredEvents);

    const searchRadiusInMeters = useStore((state) => state.searchRadiusInMeters);

    const panAndZoomToCurrentlySelectedEvent = () => {
        // console.log('calling panAndZoomToCurrentlySelectedEvent:', currentlySelectedEvent);
        if (currentlySelectedEvent) {
            mapRef.current?.panTo({
                lat: currentlySelectedEvent.lat,
                lng: currentlySelectedEvent.lng,
            });

            if (mapRef.current?.getZoom() !== 17) {
                // console.log('zooming in, mapRef.current?.getZoom(): ', mapRef.current?.getZoom());
                mapRef.current?.setZoom(17);
            }
        }
    };

    const panToAddress = () => {
        // console.log('calling panToAddress');
        mapRef.current?.panTo({
            lat: currentlySelectedAddress.lat,
            lng: currentlySelectedAddress.lng,
        });
    };

    const setZoomBasedOnSearchRadius = () => {
        // console.log('setZoomBasedOnSearchRadius, mapRef.current: ', mapRef.current);
        // console.log('setZoomBasedOnSearchRadius, current zoom: ', mapRef.current?.getZoom());
        let newZoomVal: number = Google_Map_Default_Zoom;
        const searchRadiusInKiloMeters = searchRadiusInMeters / 1000;

        if (searchRadiusInKiloMeters <= 4) {
            newZoomVal += 3;
        } else if (searchRadiusInKiloMeters >= 5 && searchRadiusInKiloMeters <= 17) {
            newZoomVal += 1;
        } else if (searchRadiusInKiloMeters >= 18 && searchRadiusInKiloMeters <= 35) {
            newZoomVal += 0;
        } else if (searchRadiusInKiloMeters >= 36 && searchRadiusInKiloMeters <= 60) {
            newZoomVal -= 1;
        } else if (searchRadiusInKiloMeters >= 61 && searchRadiusInKiloMeters <= 100) {
            newZoomVal -= 2;
        }

        console.log('setZoomBasedOnSearchRadius, changing zoom (default 10)?: ', {
            newZoomVal,
            searchRadiusInKiloMeters,
        });
        mapRef.current?.setZoom(newZoomVal);
    };

    useEffect(() => {
        // console.log('useEffect, new currentlySelectedEvent:', currentlySelectedEvent);
        panAndZoomToCurrentlySelectedEvent();
    }, [currentlySelectedEvent]);

    useEffect(() => {
        console.log('useEffect, searchRadiusInMeters: ', searchRadiusInMeters);

        panToAddress();
        setZoomBasedOnSearchRadius();
    }, [searchRadiusInMeters, mapRef.current]);

    return (
        <>
            <GoogleMap
                zoom={Google_Map_Default_Zoom}
                center={center}
                mapContainerStyle={{ width: '100%', height: '100%' }}
                options={{
                    mapId: `${theme.palette.mode === 'dark' ? 'f0f023e3616c652c' : ''}`,
                }}
                onLoad={onLoad}
            >
                <MarkerClusterer>
                    {(clusterer) => (
                        <div>
                            {filteredEvents?.map((event): JSX.Element => {
                                return (
                                    <EventMarker
                                        clusterer={clusterer}
                                        event={event}
                                        key={event.id}
                                        openInfoBox={openInfoBox}
                                        setOpenInfoBox={setOpenInfoBox}
                                    />
                                );
                            })}
                        </div>
                    )}
                </MarkerClusterer>

                {openInfoBox && (
                    <InfoBox
                        event={filteredEvents?.find((e) => e.id === openInfoBox.eventId)}
                        setOpenInfoBox={setOpenInfoBox}
                    />
                )}

                <Circle center={center} radius={searchRadiusInMeters} options={closeOptions} />
            </GoogleMap>
        </>
    );
}

export default Map;

export const Google_Map_Default_Zoom = 10;
export const Google_Map_Default_Center = { lat: 53.166666, lng: 8.6499974 };

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
