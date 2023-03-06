import React from 'react';
import GoogleMapReact from 'google-map-react';
import { useTheme } from '@mui/system';
import FilterListIcon from '@mui/icons-material/FilterList';

type Props = {};

const AnyReactComponent = ({
    text,
}: {
    lat: number;
    lng: number;
    text: string;
}) => {
    return (
        <>
            <FilterListIcon />
            <div>{text}</div>
        </>
    );
};

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
                {/* <AnyReactComponent
                    lat={53.156666}
                    lng={8.6499974}
                    text="My Marker"
                /> */}
            </GoogleMapReact>
        </div>
    );
}

export default GoogleMap;
