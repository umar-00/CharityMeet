import { Button, ListItemIcon, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import SortIcon from '@mui/icons-material/Sort';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { SortByAlpha, ArrowUpward, SocialDistance } from '@mui/icons-material';

const SortEventsButton = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                variant="outlined"
                size="small"
                onClick={handleClick}
                startIcon={<SortIcon />}
                endIcon={<ArrowDropDownIcon />}
            >
                Sort by
            </Button>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 0.5,
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <SortByAlpha fontSize="small" />
                    </ListItemIcon>

                    <span className="mr-2">Event name</span>

                    <ListItemIcon className="!min-w-fit">
                        <ArrowUpward fontSize="small" />
                    </ListItemIcon>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <SocialDistance fontSize="small" />
                    </ListItemIcon>

                    <span className="mr-2">Distance</span>

                    <ListItemIcon className="ml-auto !min-w-fit">
                        <ArrowUpward fontSize="small" />
                    </ListItemIcon>
                </MenuItem>
            </Menu>
        </>
    );
};

export default SortEventsButton;
