import { useTheme } from '@mui/material';
import EventsManagementListItem from './EventsManagementListItem/EventsManagementListItem';

type Props = {};

const EventsManagement = (props: Props) => {
    const theme = useTheme();

    const testArrForList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const eventsList: JSX.Element[] = testArrForList.map((num) => (
        <EventsManagementListItem key={num} />
    ));

    return (
        <div
            className="h-full w-full overflow-y-auto px-4 py-6"
            style={{ backgroundColor: theme.palette.background.default }}
        >
            <h1 className="mb-16 text-2xl font-bold">EventsManagement</h1>

            <div className="flex flex-col items-center gap-y-8">
                {eventsList}
            </div>
        </div>
    );
};

export default EventsManagement;
