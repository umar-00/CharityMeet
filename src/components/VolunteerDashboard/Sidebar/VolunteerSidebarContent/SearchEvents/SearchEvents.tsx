import { Divider, IconButton, InputBase, Paper, Tooltip } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterDialog from './FilterDialog/FilterDialog';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import { useTheme } from '@mui/system';
import PlacesAutocomplete from '../../../../PlacesAutocomplete/PlacesAutocomplete';
import { useStore } from '../../../../../stores/useStore';

type Props = {};

const SearchEvents = (props: Props) => {
    const [openDialog, setOpenDialog] = useState(false);

    const searchRadiusInMeters = useStore((state) => state.searchRadiusInMeters);

    const filterBtnRef = useRef<HTMLButtonElement>(null);

    const theme = useTheme();

    const openFilterDialog = () => {
        console.log('openDialog setting to true');
        setOpenDialog(true);
    };

    const closeFilterDialog = () => {
        setOpenDialog(false);
    };

    /*Fixes issue where if we press 'enter' key from inside radius slider to call the closeFilterDialog
     the filterBtnRef's button would be focused and would again open the dialog */
    const handleOnFocusCapture = (event: React.FocusEvent<HTMLButtonElement, Element>) => {
        // console.log('handleOnFocusCapture, ref: ', filterBtnRef.current);

        filterBtnRef.current?.blur();
    };

    return (
        <>
            <div
                className="flex w-full flex-col"
                style={{ borderColor: theme.palette.text.primary }}
            >
                <span className="mb-6 px-3 pt-4 opacity-60">Search events by address</span>

                <div className="flex flex-col items-center justify-evenly gap-y-3 px-3 pb-8">
                    <Paper
                        component="form"
                        onSubmit={(e) => e.preventDefault()}
                        sx={{
                            p: '4px 4px',
                            pr: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                    >
                        <PlacesAutocomplete />
                        {/* <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton> */}

                        <Divider sx={{ height: 28, m: 0.5, ml: 3 }} orientation="vertical" />

                        <Tooltip title="Search radius in kilometers" placement="top">
                            <IconButton
                                onClick={openFilterDialog}
                                ref={filterBtnRef}
                                onFocusCapture={handleOnFocusCapture}
                            >
                                <Badge
                                    // badgeContent={searchRadiusInMeters === 1000 ? 0 : 1}
                                    badgeContent={searchRadiusInMeters / 1000}
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
                        By default, all events within 10km of your chosen location will be shown
                        below. Click on the filter button to change this.
                        {/* By default, all events within 10km of your chosen location will be shown
                        below. You may change this by clicking on the filter button - to the left of
                        the search address input. */}
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
