import {
    Button,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ViewListIcon from '@mui/icons-material/ViewList';
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {};

const CharitySideBarContent = (props: Props) => {
    return (
        <div className="flex w-full flex-col overflow-y-auto pt-6">
            <List component="nav">
                <Link to="/charity-dashboard/manage">
                    <ListItemButton>
                        <ListItemIcon>
                            <ViewListIcon fontSize="large" />
                        </ListItemIcon>
                        <ListItemText primary="Manage active events" />
                    </ListItemButton>
                </Link>

                <Link to="/charity-dashboard/create">
                    <ListItemButton>
                        <ListItemIcon>
                            <AddBoxIcon fontSize="large" />
                        </ListItemIcon>
                        <ListItemText primary="Create new events" />
                    </ListItemButton>
                </Link>
            </List>
            {/* <div className="mb-3 flex items-center justify-between pt-4 opacity-60">
                <span className=""></span>
            </div> */}
            {/* <div className="flex w-full flex-col gap-y-4">
                <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    className="pt-2"
                >
                    View active events
                </Button>
                <Button variant="outlined" startIcon={<AddBoxIcon />}>
                    Create new events
                </Button>
            </div> */}
        </div>
        // <div className="flex w-full flex-col overflow-y-auto px-3 pt-4">
        //     <Button variant="outlined" startIcon={<DeleteIcon />}>
        //         Delete
        //     </Button>
        // </div>
    );
};

export default CharitySideBarContent;
