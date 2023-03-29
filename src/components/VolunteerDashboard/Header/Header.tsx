import React from 'react';
import './Header';
import {
    Button,
    IconButton,
    SelectChangeEvent,
    Tooltip,
    useTheme,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ProfileAvatar } from './ProfileAvatar/ProfileAvatar';
import { NavLink } from 'react-router-dom';

type Props = {
    mode: 'light' | 'dark';
    setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
    user?: any;
};

const names = [
    'Blood drive',
    'Food drive',
    'Clothes Drive',
    'Refugee assistance',
    'Disaster assistance',
];

function Header(props: Props) {
    const [charityType, setCharityType] = React.useState<string[]>([]);

    const theme = useTheme();

    const toggleColorMode = () => {
        props.setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const handleChange = (event: SelectChangeEvent<typeof charityType>) => {
        const {
            target: { value },
        } = event;
        setCharityType(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        );
    };

    return (
        <>
            <header
                className={`header flex items-center justify-end gap-x-4 border-b p-3 ${
                    theme.palette.mode === 'dark'
                        ? '!bg-[#0a1929]'
                        : '!bg-white'
                }`}
                style={{ borderColor: theme.palette.divider }}
            >
                <div className="flex flex-1 gap-x-4">
                    <NavLink to="/volunteer-dashboard">
                        {({ isActive }) => (
                            <>
                                <Button
                                    style={{
                                        backgroundColor: isActive
                                            ? theme.palette.action.hover
                                            : 'initial',
                                    }}
                                >
                                    Volunteer
                                </Button>
                            </>
                        )}
                    </NavLink>

                    <NavLink to="/charity-dashboard">
                        {({ isActive }) => (
                            <>
                                <Button
                                    style={{
                                        backgroundColor: isActive
                                            ? theme.palette.action.hover
                                            : 'initial',
                                    }}
                                >
                                    Charity
                                </Button>
                            </>
                        )}
                    </NavLink>

                    <NavLink to="/login">
                        {({ isActive }) => (
                            <>
                                <Button
                                    style={{
                                        backgroundColor: isActive
                                            ? theme.palette.action.hover
                                            : 'initial',
                                    }}
                                >
                                    Log in
                                </Button>
                            </>
                        )}
                    </NavLink>

                    <NavLink to="/signup">
                        {({ isActive }) => (
                            <>
                                <Button
                                    style={{
                                        backgroundColor: isActive
                                            ? theme.palette.action.hover
                                            : 'initial',
                                    }}
                                >
                                    Sign up
                                </Button>
                            </>
                        )}
                    </NavLink>

                    {/* <Button onClick={checkSession}>Check Session</Button> */}
                </div>

                {/* <TextField
                    id="outlined-basic"
                    label="Location"
                    variant="outlined"
                    size="small"
                /> */}

                {/* <FormControl className="w-40" size="small">
                    <InputLabel id="demo-simple-select-label" size="small">
                        Charity Type
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-multiple-checkbox"
                        label="Charity Type"
                        multiple
                        value={charityType}
                        onChange={handleChange}
                        // input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(', ')}
                        size="small"
                    >
                        {names.map((name) => (
                            <MenuItem key={name} value={name}>
                                <Checkbox
                                    checked={charityType.indexOf(name) > -1}
                                />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl> */}
                <Tooltip title="Toggle dark mode" placement="left">
                    <IconButton
                        sx={{ ml: 1 }}
                        onClick={toggleColorMode}
                        color="inherit"
                        className="h-full"
                        // size="large"
                    >
                        {theme.palette.mode === 'dark' ? (
                            <Brightness7Icon />
                        ) : (
                            <Brightness4Icon />
                        )}
                    </IconButton>
                </Tooltip>

                {props.user && <ProfileAvatar />}
            </header>
        </>
    );
}

export default Header;
