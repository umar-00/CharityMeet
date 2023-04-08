import { Button, useTheme } from '@mui/material';
import AnimatedMain from '../../FramerMotion/AnimatedMain';
import EventsManagementListItem from './EventsManagementListItem/EventsManagementListItem';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddOrEditEventDialog from './AddOrEditEventDialog/AddOrEditEventDialog';
import { useEffect, useState } from 'react';
import { useStore } from '../../../stores/useStore';

type Props = {};

const EventsManagement = (props: Props) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [eventsList, setEventsList] = useState<JSX.Element[]>();

    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    const handleClose = () => {
        setOpenDialog(false);
    };

    const theme = useTheme();

    const user = useStore((state) => state.authenticatedUser);
    const getEventsByCharityId = useStore((state) => state.getEventsByCharityId);
    const events = useStore((state) => state.events);

    useEffect(() => {
        const getEventsAsync = async (charity_id: string) => {
            console.log('calling getEvents wih charity_id: ', charity_id);

            await getEventsByCharityId(charity_id);
        };

        if (user) {
            getEventsAsync(user.user_id);
        }
    }, [user]);

    useEffect(() => {
        if (events) {
            console.log('settings events management list item with new events: ', events);
            const authenticatedUser = useStore.getState().authenticatedUser;

            if (!authenticatedUser) {
                console.error('User not logged in');
                return;
            }

            setEventsList(
                events
                    .filter((e) => e.charity_id === authenticatedUser.user_id)
                    .map((event) => <EventsManagementListItem key={event.id} event={event} />)
            );
        }
    }, [events]);

    return (
        user && (
            <AnimatedMain>
                <div
                    className="h-full w-full overflow-y-auto overflow-x-hidden px-12 py-6"
                    style={{ backgroundColor: theme.palette.background.default }}
                >
                    <div className="mb-16 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Events Management</h1>

                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            endIcon={<AddBoxIcon fontSize="large" />}
                            onClick={handleClickOpen}
                        >
                            <span className="font-semibold">Add event</span>
                        </Button>

                        <AddOrEditEventDialog
                            handleClose={handleClose}
                            openDialog={openDialog}
                            addOrEditString="Add"
                        />
                    </div>

                    <div className="flex flex-col items-center gap-y-12">{eventsList}</div>
                </div>
            </AnimatedMain>
        )
    );
};

export default EventsManagement;
