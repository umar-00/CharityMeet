import React, { useState } from 'react';
import { InputAdornment, OutlinedInput, Slider } from '@mui/material';

type Props = {};

const RadiusSlider = (props: Props) => {
    const [value, setValue] = useState<
        number | string | Array<number | string>
    >(30);

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 100) {
            setValue(100);
        }
    };

    return (
        <div className="flex w-full items-center justify-between">
            <Slider
                value={typeof value === 'number' ? value : 0}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                valueLabelFormat={(value: number) => `${value} km`}
                aria-labelledby="input-slider"
                className="!w-4/6"
            />

            <OutlinedInput
                id="outlined-adornment-weight"
                endAdornment={
                    <InputAdornment position="end">km</InputAdornment>
                }
                value={value}
                size="small"
                onChange={handleInputChange}
                onBlur={handleBlur}
                className="w-28"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                    step: 10,
                    min: 0,
                    max: 100,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                }}
            />
        </div>
    );
};

export default RadiusSlider;
