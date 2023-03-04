import React from 'react';
import './Header';
import defaultProfilePicture from '../../assets/default_profile.jpg';
import {
    Checkbox,
    FormControl,
    IconButton,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Tooltip,
    useTheme,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

type Props = {
    mode: 'light' | 'dark';
    setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
};

const names = [
    'Blood drive',
    'Food drive',
    'Clothes Drive',
    'Refugee assistance',
    'Disaster assistance',
];

function Header({ mode, setMode }: Props) {
    const [charityType, setCharityType] = React.useState<string[]>([]);

    const theme = useTheme();

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
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
                className={`header flex items-center justify-end gap-x-4 p-3 ${
                    theme.palette.mode === 'dark'
                        ? '!bg-[#0a1929]'
                        : '!bg-white'
                }`}
            >
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
                        className="h-full self-end"
                        // size="large"
                    >
                        {theme.palette.mode === 'dark' ? (
                            <Brightness7Icon />
                        ) : (
                            <Brightness4Icon />
                        )}
                    </IconButton>
                </Tooltip>

                <div className="h-10 w-10 rounded-full">
                    <img
                        src={defaultProfilePicture}
                        alt="profile"
                        className="h-full w-full rounded-full"
                    />
                </div>
            </header>
        </>
    );
}

export default Header;
