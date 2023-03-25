import React from 'react';
import GoogleMapReact from 'google-map-react';
import { useTheme } from '@mui/system';
import EventMarker from './EventMarker/EventMarker';

type Props = {};

function GoogleMap({}: Props) {
    const theme = useTheme();
    const defaultProps = {
        center: {
            lat: 53.166666,
            lng: 8.6499974,
        },
        zoom: 16,
    };

    return (
        <div className="h-full w-full">
            <GoogleMapReact
                bootstrapURLKeys={{
                }}
                options={{
                    mapId: `${
                        theme.palette.mode === 'dark' ? 'f0f023e3616c652c' : ''
                    }`,
                }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <EventMarker lat={53.168666} lng={8.6499974} />
                <EventMarker lat={53.166666} lng={8.6499974} />
            </GoogleMapReact>
        </div>
    );
}

export default GoogleMap;
