import { useTheme, Button, Divider } from '@mui/material';
import React, { useState } from 'react';
import noImgPlaceholder from '../../../../assets/No-Image-Placeholder.png';
import EditIcon from '@mui/icons-material/Edit';
import MapIcon from '@mui/icons-material/Map';
import EditEventDialog from './EditEventDialog/EditEventDialog';

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
            className="flex h-44 w-10/12 rounded-xl border-2"
            style={{ borderColor: theme.palette.divider }}
        >
            <img src={noImgPlaceholder} alt="" className="w-44 rounded-l-xl" />
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
                    <span>08 January 2023, 13:14</span>
                </div>
                <div>
                    <span className="mr-1 text-lg font-semibold">Ends on:</span>
                    <span>Not defined.</span>
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
                <EditEventDialog
                    handleClose={handleClose}
                    openDialog={openDialog}
                />
                <Button variant="outlined" endIcon={<MapIcon />}>
                    View on map
                </Button>
            </div>
        </div>
    );
};

export default EventsManagementListItem;
