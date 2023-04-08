import React, { useState } from 'react';
import { InputAdornment, OutlinedInput, Slider } from '@mui/material';
import { useStore } from '../../../../../../../stores/useStore';

type Props = {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
    handleConfirmClick: () => void;
    onClose: () => void;
};

const RadiusSlider = (props: Props) => {
    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        console.log('handleSliderChange');
        props.setValue(newValue as number);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handleInputChange');
        if (event.target.value) {
            let value: number = Number(event.target.value);

            if (value > 100) {
                props.setValue(100);
            } else if (value < 1) {
                props.setValue(1);
            } else {
                props.setValue(value);
            }
        }
        // setValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (props.value < 0) {
            props.setValue(0);
        } else if (props.value > 100) {
            props.setValue(100);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            props.handleConfirmClick();
            props.onClose();
        }
    };

    return (
        <div className="flex w-full items-center justify-between">
            <Slider
                value={typeof props.value === 'number' ? props.value : 1}
                min={1}
                max={100}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                valueLabelFormat={(value: number) => `${value} km`}
                aria-labelledby="input-slider"
                className="!w-4/6"
            />

            <OutlinedInput
                autoFocus
                id="outlined-adornment-weight"
                endAdornment={<InputAdornment position="end">km</InputAdornment>}
                value={props.value}
                size="small"
                onChange={handleInputChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className="w-28"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                    // step: 10,
                    min: 1,
                    max: 100,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                }}
            />
        </div>
    );
};

export default RadiusSlider;
