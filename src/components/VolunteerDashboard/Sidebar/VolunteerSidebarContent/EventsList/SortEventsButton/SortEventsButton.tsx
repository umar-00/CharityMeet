import { Button, ListItemIcon, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import SortIcon from '@mui/icons-material/Sort';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { SortByAlpha, ArrowUpward, SocialDistance, DateRange } from '@mui/icons-material';
import { Default_Sort_By, SortBy } from '../EventsList';

type Props = {
    sortBy: SortBy;
    setSortBy: React.Dispatch<React.SetStateAction<SortBy>>;
};

const SortEventsButton = (props: Props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleMenuBtnClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        console.log('handleClose');
        setAnchorEl(null);
    };

    const handleSortBtnClick = (event: React.MouseEvent<any, MouseEvent>) => {
        console.log('handleSortBtnClick');
        const sortByString = (event.target as any).textContent;
        console.log('handleSortBtnClick, event target textContent', sortByString);

        if (sortByString) props.setSortBy(sortByString);
        else props.setSortBy(Default_Sort_By);
    };

    return (
        <>
            <div className="flex flex-col items-end justify-center gap-y-2">
                <Button
                    variant="outlined"
                    size="small"
                    onClick={handleMenuBtnClick}
                    startIcon={<SortIcon />}
                    endIcon={<ArrowDropDownIcon />}
                >
                    Sort by
                </Button>

                <span className="text-xs">Sorting by: {props.sortBy.toLowerCase()}</span>
            </div>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleSortBtnClick}
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

                    <span className="mr-3">{'Event title' as SortBy}</span>

                    <ListItemIcon className="ml-auto !min-w-fit">
                        <ArrowUpward fontSize="small" />
                    </ListItemIcon>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <DateRange fontSize="small" />
                    </ListItemIcon>

                    <span className="mr-3">{'Creation date' as SortBy}</span>

                    <ListItemIcon className="ml-auto !min-w-fit">
                        <ArrowUpward fontSize="small" />
                    </ListItemIcon>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <SocialDistance fontSize="small" />
                    </ListItemIcon>

                    <span className="mr-3">{'Distance from address' as SortBy}</span>

                    <ListItemIcon className="ml-auto !min-w-fit">
                        <ArrowUpward fontSize="small" />
                    </ListItemIcon>
                </MenuItem>
            </Menu>
        </>
    );
};

export default SortEventsButton;
