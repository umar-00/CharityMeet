import { useTheme, Button, Divider } from '@mui/material';
import React, { useState } from 'react';
import noImgPlaceholder from '../../../../assets/No-Image-Placeholder.png';
import EditIcon from '@mui/icons-material/Edit';
import MapIcon from '@mui/icons-material/Map';
import DeleteIcon from '@mui/icons-material/Delete';
import AddOrEditEventDialog from '../AddOrEditEventDialog/AddOrEditEventDialog';
import dayjs from 'dayjs';
import { Event } from '../../../../interfaces/Event';
import { useStore } from '../../../../stores/useStore';

type Props = {
    event: Event;
};

const EventsManagementListItem = (props: Props) => {
    const [openDialog, setOpenDialog] = useState(false);

    const deleteEvent = useStore((state) => state.deleteEvent);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleDelete = async () => {
        console.log('now deleting event: ', props.event);
        await deleteEvent(props.event.id);
    };

    const theme = useTheme();

    return (
        <div
            className="flex h-52 w-11/12 rounded-xl border-2"
            style={{ borderColor: theme.palette.divider }}
        >
            {/* <img
                src={noImgPlaceholder}
                alt=""
                className="w-60 rounded-l-xl object-cover"
            /> */}

            <div className="flex flex-1 flex-col gap-y-4 overflow-auto p-4">
                <div>
                    <span className="mr-1 text-lg font-semibold">Event title:</span>
                    <span>{props.event.title}</span>
                </div>
                <div>
                    <span className="mr-1 text-lg font-semibold">Created on:</span>
                    <span>{dayjs(props.event.created_at).format('DD MMMM YYYY, HH:mm')}</span>
                </div>
                <div>
                    <span className="mr-1 text-lg font-semibold">Ends on:</span>
                    <span>{dayjs(props.event.ends_at).format('DD MMMM YYYY, HH:mm')}</span>
                </div>
                <div>
                    <span className="mr-1 text-lg font-semibold">Address:</span>
                    <span>
                        {props.event.address?.description} {' | Lat: '} {props.event.address?.lat},
                        {' Lng: '}
                        {props.event.address?.lng}
                    </span>
                </div>

                <div>
                    <span className="mr-1 text-lg font-semibold">Volunteers needed:</span>
                    <span>{props.event.volunteers_needed}</span>
                </div>
                <div>
                    <span className="mr-1 text-lg font-semibold">Description:</span>
                    <span>{props.event.description}</span>
                </div>
            </div>

            <Divider flexItem orientation="vertical"></Divider>

            <div className="flex flex-col justify-center gap-y-4 p-4">
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<EditIcon />}
                    onClick={handleClickOpen}
                >
                    Edit
                </Button>

                <AddOrEditEventDialog
                    handleClose={handleClose}
                    openDialog={openDialog}
                    addOrEditString="Edit"
                    event={props.event}
                    key={props.event.id}
                />

                {/* <Button variant="outlined" color="primary" endIcon={<MapIcon />}>
                    View on map
                </Button> */}

                <Button
                    variant="outlined"
                    color="error"
                    endIcon={<DeleteIcon />}
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default EventsManagementListItem;
