import { Divider, IconButton, InputBase, Paper, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterDialog from './FilterDialog/FilterDialog';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import { useTheme } from '@mui/system';

type Props = {};

const SearchEvents = (props: Props) => {
    const [openDialog, setOpenDialog] = useState(false);

    const theme = useTheme();

    const openFilterDialog = () => {
        setOpenDialog(true);
    };

    const closeFilterDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <div
                className="flex w-full flex-col"
                style={{ borderColor: theme.palette.text.primary }}
            >
                <span className="mb-6 px-3 pt-4 opacity-60">Search events</span>

                <div className="flex flex-col items-center justify-evenly gap-y-3 px-3 pb-8">
                    <Paper
                        component="form"
                        sx={{
                            p: '4px 4px',
                            pr: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Enter location"
                        />
                        <IconButton
                            type="button"
                            sx={{ p: '10px' }}
                            aria-label="search"
                        >
                            <SearchIcon />
                        </IconButton>

                        <Divider
                            sx={{ height: 28, m: 0.5 }}
                            orientation="vertical"
                        />

                        <Tooltip
                            title="Choose filters for event results"
                            placement="top"
                        >
                            <IconButton onClick={openFilterDialog}>
                                <Badge
                                    badgeContent={0}
                                    showZero
                                    color="secondary"
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                >
                                    <FilterListIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                    </Paper>

                    <span className="text-[12px] opacity-70">
                        By default, all events within 30km of your chosen
                        location will be shown below. You may change this
                        through the filter options.
                    </span>

                    <FilterDialog
                        onClose={closeFilterDialog}
                        openDialog={openDialog}
                    ></FilterDialog>
                </div>
            </div>
            <Divider flexItem />
        </>
    );
};

export default SearchEvents;
