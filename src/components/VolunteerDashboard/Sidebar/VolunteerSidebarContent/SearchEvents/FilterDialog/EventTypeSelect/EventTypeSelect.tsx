import {
    Box,
    Checkbox,
    Chip,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import React, { useState } from 'react';

const eventTypesArr = [
    'Food drive',
    'Blood drive',
    'Clothes drive',
    'Disaster relief volunteering',
    'Donation collection',
];

type Props = {};

const EventTypeSelect = (props: Props) => {
    const [eventType, setEventType] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof eventType>) => {
        const {
            target: { value },
        } = event;
        setEventType(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        );
    };

    return (
        <div className="w-full">
            <FormControl sx={{ width: '100%' }}>
                <InputLabel>Event type</InputLabel>
                <Select
                    multiple
                    value={eventType}
                    onChange={handleChange}
                    input={<OutlinedInput label="Event type" />}
                    renderValue={(selected) => (
                        <Box
                            sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                        >
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                >
                    {eventTypesArr.map((type) => (
                        <MenuItem key={type} value={type}>
                            <Checkbox checked={eventType.indexOf(type) > -1} />
                            <ListItemText primary={type} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default EventTypeSelect;
