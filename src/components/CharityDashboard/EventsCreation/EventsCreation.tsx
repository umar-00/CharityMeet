import { useTheme } from '@mui/system';
import React from 'react';

type Props = {};

const EventsCreation = (props: Props) => {
    const theme = useTheme();

    return (
        <div
            className="h-full w-full overflow-auto p-4"
            style={{ backgroundColor: theme.palette.background.default }}
        >
            <h1>EventsCreation</h1>
        </div>
    );
};

export default EventsCreation;
