import { useTheme } from '@mui/system';
import React from 'react';
import AnimatedMain from '../../FramerMotion/AnimatedMain';
import GoogleMap from '../../VolunteerDashboard/Main/GoogleMap/GoogleMap';

type Props = {};

const ViewEventsOnMap = (props: Props) => {
    const theme = useTheme();

    return (
        <AnimatedMain>
            <div
                className="h-full w-full"
                style={{ backgroundColor: theme.palette.background.default }}
            >
                <GoogleMap />
                {/* <h1>EventsCreation</h1> */}
            </div>
        </AnimatedMain>
    );
};

export default ViewEventsOnMap;
