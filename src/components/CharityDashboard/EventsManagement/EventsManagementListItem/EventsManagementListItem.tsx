import { useTheme, Button, Divider } from '@mui/material';
import React, { useState } from 'react';
import noImgPlaceholder from '../../../../assets/No-Image-Placeholder.png';
import EditIcon from '@mui/icons-material/Edit';
import MapIcon from '@mui/icons-material/Map';
import AddOrEditEventDialog from '../AddOrEditEventDialog/AddOrEditEventDialog';
import dayjs from 'dayjs';

type Props = {};

const EventsManagementListItem = (props: Props) => {
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    const handleClose = () => {
        setOpenDialog(false);
    };

    const theme = useTheme();

    return (
        <div
            className="flex h-52 w-11/12 rounded-xl border-2"
            style={{ borderColor: theme.palette.divider }}
        >
            <img
                src={noImgPlaceholder}
                alt=""
                className="w-60 rounded-l-xl object-cover"
            />
            <div className="flex flex-1 flex-col gap-y-4 overflow-auto p-4">
                <div>
                    <span className="mr-1 text-lg font-semibold">
                        Event title:
                    </span>
                    <span>Lorem ipsum dolor sit.</span>
                </div>
                <div>
                    <span className="mr-1 text-lg font-semibold">
                        Created on:
                    </span>
                    <span>
                        {dayjs()
                            .subtract(2, 'days')
                            .format('DD MMMM YYYY, HH:mm')}
                    </span>
                </div>
                <div>
                    <span className="mr-1 text-lg font-semibold">Ends on:</span>
                    <span>
                        {dayjs()
                            .add(4, 'days')
                            .add(3, 'hours')
                            .add(43, 'minutes')
                            .format('DD MMMM YYYY, HH:mm')}
                    </span>
                </div>
                <div>
                    <span className="mr-1 text-lg font-semibold">Address:</span>
                    <span>
                        Lorem ipsum dolor sit amet, 24581, Hamburg, Germany.
                    </span>
                </div>
                <div>
                    <span className="mr-1 text-lg font-semibold">
                        Volunteers needed:
                    </span>
                    <span>None.</span>
                </div>
                <div>
                    <span className="mr-1 text-lg font-semibold">
                        Description:
                    </span>
                    <span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Porro accusantium ut quibusdam suscipit totam,
                        dignissimos animi corporis quos dolorum, veniam
                        accusamus iste molestias officiis ex. Culpa facere
                        ratione aperiam. Itaque, reiciendis voluptatibus quaerat
                        consectetur harum ratione, placeat saepe in voluptates
                        laborum, ea similique. Nobis sit laboriosam voluptatum
                        dignissimos. Nemo, suscipit.
                    </span>
                </div>
            </div>

            <Divider flexItem orientation="vertical"></Divider>

            <div className="flex flex-col justify-center gap-y-4 p-4">
                <Button
                    variant="outlined"
                    endIcon={<EditIcon />}
                    onClick={handleClickOpen}
                >
                    Edit
                </Button>
                <AddOrEditEventDialog
                    handleClose={handleClose}
                    openDialog={openDialog}
                    addOrEditString="Edit"
                />
                <Button variant="outlined" endIcon={<MapIcon />}>
                    View on map
                </Button>
            </div>
        </div>
    );
};

export default EventsManagementListItem;
