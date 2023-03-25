import { Button, useTheme } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import MapIcon from '@mui/icons-material/Map';
import { NavLink } from 'react-router-dom';

type Props = {};

const CharitySideBarContent = (props: Props) => {
    const theme = useTheme();

    return (
        <div className="flex w-full flex-col overflow-y-auto pt-6">
            <div className="flex w-full flex-col gap-y-3">
                <NavLink
                    to="/charity-dashboard/manage"
                    className="flex justify-center"
                >
                    {({ isActive }) => (
                        <>
                            <Button
                                style={{
                                    backgroundColor: isActive
                                        ? theme.palette.action.hover
                                        : 'initial',
                                    color: isActive
                                        ? undefined
                                        : theme.palette.text.primary,
                                    width: '90%',
                                    justifyContent: 'flex-start',
                                }}
                                size="large"
                                startIcon={
                                    <ViewListIcon className="!text-3xl" />
                                }
                            >
                                Manage active events
                            </Button>
                        </>
                    )}
                </NavLink>

                <NavLink
                    to="/charity-dashboard/map-view"
                    className="flex justify-center"
                >
                    {({ isActive }) => (
                        <>
                            <Button
                                style={{
                                    backgroundColor: isActive
                                        ? theme.palette.action.hover
                                        : 'initial',
                                    color: isActive
                                        ? undefined
                                        : theme.palette.text.primary,
                                    width: '90%',
                                    justifyContent: 'flex-start',
                                }}
                                size="large"
                                startIcon={<MapIcon className="!text-3xl" />}
                            >
                                View events on map
                            </Button>
                        </>
                    )}
                </NavLink>
            </div>
        </div>
    );
};

export default CharitySideBarContent;
