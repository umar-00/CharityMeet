import AnimatedMain from '../../FramerMotion/AnimatedMain';
import EventsManagementListItem from './EventsManagementListItem/EventsManagementListItem';

type Props = {};

const EventsManagement = (props: Props) => {
    const theme = useTheme();

    const testArrForList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const eventsList: JSX.Element[] = testArrForList.map((num) => (
        <EventsManagementListItem key={num} />
    ));

    return (
        <AnimatedMain>

        </AnimatedMain>
    );
};

export default EventsManagement;
