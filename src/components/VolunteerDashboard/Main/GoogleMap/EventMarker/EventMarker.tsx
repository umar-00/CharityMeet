import { useTheme } from '@mui/system';
import React, { useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { blue, red } from '@mui/material/colors';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
    lat: number;
    lng: number;
};

const EventMarker = (props: Props) => {
    const [openInfoBox, setOpenInfoBox] = useState(false);

    const theme = useTheme();

    const onCloseIconButtonClick = () => {
        setOpenInfoBox(false);
        console.log('onCloseIconButtonClick, openInfoBox: ', openInfoBox);
    };

    const onMarkerIconButtonClick = () => {
        setOpenInfoBox(true);
        console.log('onMarkerIconClick, openInfoBox: ', openInfoBox);
    };

    const infoBox: JSX.Element = (
        <div
            className="absolute left-[-116px] top-[-128px] flex h-32 w-72 flex-col gap-y-4 overflow-auto rounded-xl border-2 p-2"
            style={{
                borderColor: theme.palette.divider,
                backgroundColor: blue[500],
            }}
        >
            <span className=" self-center font-bold">
                Deutsches Rotes Kreuz
            </span>
            <span>Type: Blood donation drive</span>
            <span>
                Description: We are hosting a blood drive between 15:00 and
                21:00 at the SCC building.
            </span>
            <IconButton
                sx={{
                    fontSize: '12px',
                    maxWidth: 'fit-content',
                    position: 'absolute',
                    top: '0px',
                    right: '0px',
                }}
                onClick={onCloseIconButtonClick}
            >
                <CloseIcon />
            </IconButton>
        </div>
    );

    return (
        <div className="relative h-64 w-64">
            <IconButton onClick={onMarkerIconButtonClick}>
                <LocationOnIcon
                    fontSize="large"
                    sx={{ color: blue[500], fontSize: '64px' }}
                />
            </IconButton>
            {openInfoBox && infoBox}
        </div>
    );
};

export default EventMarker;
