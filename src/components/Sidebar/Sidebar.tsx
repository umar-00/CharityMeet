import React, { useState } from 'react';
import './Sidebar.css';
import EventListItem from './EventListItem/EventListItem';
import {
    Divider,
    IconButton,
    TextField,
    Tooltip,
    useTheme,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterDialog from './FilterDialog/FilterDialog';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import SignLanguageIcon from '@mui/icons-material/SignLanguage';

type Props = {};

export default function Sidebar({}: Props) {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    const [openDialog, setOpenDialog] = useState(false);

    const theme = useTheme();

    const eventItems = numbers.map((number) => (
        <EventListItem key={number.toString()}></EventListItem>
    ));

    const openFilterDialog = () => {
        setOpenDialog(true);
    };

    const closeFilterDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <section
                className={`sidebar text.primary flex flex-col items-center justify-start border-r ${
                    theme.palette.mode === 'dark'
                        ? '!bg-[#0a1929]'
                        : '!bg-white'
                }`}
                style={{ borderColor: theme.palette.divider }}
            >
                <div
                    className="flex min-h-[60px] w-full items-center justify-center gap-x-4"
                    style={{ borderColor: theme.palette.text.primary }}
                >
                    <span className="text-2xl font-black">Charity Meet</span>
                    <SignLanguageIcon></SignLanguageIcon>
                </div>

                <Divider flexItem />

                <div
                    className="flex w-full flex-col"
                    style={{ borderColor: theme.palette.text.primary }}
                >
                    <span className="mb-6 px-3 pt-4 opacity-60">
                        Search events
                    </span>

                    <div className="flex items-center justify-evenly px-3 pb-8">
                        <Paper
                            component="form"
                            sx={{
                                p: '2px 4px',
                                display: 'flex',
                                alignItems: 'center',
                                width: 400,
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
                                    <FilterListIcon />
                                </IconButton>
                            </Tooltip>
                        </Paper>

                        {/* <Tooltip
                            title="Choose filters for event results"
                            placement="top"
                        >
                            <IconButton onClick={openFilterDialog}>
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip> */}

                        <FilterDialog
                            onClose={closeFilterDialog}
                            openDialog={openDialog}
                        ></FilterDialog>
                    </div>
                </div>

                <Divider flexItem />

                <div className="flex w-full flex-col overflow-y-auto">
                    <span className="mb-3 px-3 pt-4 opacity-60">
                        Event results
                    </span>
                    {eventItems}
                </div>
            </section>
        </>
    );
}
