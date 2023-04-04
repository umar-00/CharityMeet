import { useTheme } from '@mui/system';
import React from 'react';
import AnimatedMain from '../../FramerMotion/AnimatedMain';
import Map from '../../VolunteerDashboard/Main/Map/Map';

type Props = {};

const ViewEventsOnMap = (props: Props) => {
    const theme = useTheme();

    return (
        <AnimatedMain>
            <div
                className="h-full w-full"
                style={{ backgroundColor: theme.palette.background.default }}
            >
                <Map />
            </div>
        </AnimatedMain>
    );
};

export default ViewEventsOnMap;
