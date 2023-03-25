import { Button, useTheme } from '@mui/material';
import AnimatedMain from '../../FramerMotion/AnimatedMain';
import EventsManagementListItem from './EventsManagementListItem/EventsManagementListItem';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddOrEditEventDialog from './AddOrEditEventDialog/AddOrEditEventDialog';
import { useState } from 'react';

type Props = {};

const EventsManagement = (props: Props) => {
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    const handleClose = () => {
        setOpenDialog(false);
    };

    const theme = useTheme();

    const testArrForList = [0, 1, 2, 3, 4];

    const eventsList: JSX.Element[] = testArrForList.map((num) => (
        <EventsManagementListItem key={num} />
    ));

    return (
        <AnimatedMain>
            <div
                className="h-full w-full overflow-y-auto overflow-x-hidden px-12 py-6"
                style={{ backgroundColor: theme.palette.background.default }}
            >
                <div className="mb-16 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Events Management</h1>

                    <Button
                        variant="outlined"
                        size="large"
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

                <div className="flex flex-col items-center gap-y-12">
                    {eventsList}
                </div>
            </div>
        </AnimatedMain>
    );
};

export default EventsManagement;
