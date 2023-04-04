import { Autocomplete, InputBase, TextField } from '@mui/material';
import { useEffect, useLayoutEffect, useState } from 'react';
import { UseFormRegister, UseFormRegisterReturn } from 'react-hook-form';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { EventAddress } from '../../interfaces/Event';

type placeOption = {
    place_id: string;
    description: string;
};

type Props = {
    customTextField?: {
        required: boolean;
        label: string;
        type: string;
        inputLabelPropsShrink: {
            shrink: boolean;
        };
        fieldName: string;
        fieldWidth: string;
        register: UseFormRegister<any>;
        setAddress: React.Dispatch<React.SetStateAction<EventAddress | undefined>>;
        initialAutoCompleteValue: string | undefined;
    };
};

const PlacesAutocomplete = (props: Props) => {
    const customTextField = props.customTextField!;

    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete({
        debounce: 400,
    });

    const [placeOptions, setPlaceOptions] = useState<placeOption[]>([]);

    const handlePlaceSelect = async (
        e: React.SyntheticEvent<Element, Event>,
        newValue: NonNullable<string | placeOption>
    ) => {
        const address = newValue as placeOption;
        console.log('handlePlaceSelect, onChange: ', address.description);

        clearSuggestions();

        const results = await getGeocode({ address: address.description });
        const { lat, lng } = await getLatLng(results[0]);

        if (customTextField) {
            customTextField.setAddress({ description: address.description, lat, lng });
        }

        console.log('handlePlaceSelect', { results, lat, lng });
    };

    // Sets initial value in Autocomplete
    useLayoutEffect(() => {
        if (customTextField && customTextField.initialAutoCompleteValue) {
            console.log('on placeautomcomplete mount: ', { value });
            setValue(customTextField.initialAutoCompleteValue);
        }
    }, []);

    useEffect(() => {
        if (status === 'OK') {
            console.log('useEffect triggered, ', { value, data });

            // Required because sometimes (possibly due to a bug?) data can be undefined, leading to placeOptions state being undefined, leading to app crash
            if (data) {
                setPlaceOptions(
                    data.map(
                        (place) =>
                            ({
                                place_id: place.place_id,
                                description: place.description,
                            } as placeOption)
                    )
                );
            }
        }
    }, [status, data]);

    return (
        <>
            <Autocomplete
                freeSolo
                disableClearable
                options={placeOptions}
                filterOptions={(x) => x}
                getOptionLabel={(option) =>
                    typeof option === 'string' ? option : option.description
                }
                noOptionsText="No locations"
                sx={customTextField ? { width: customTextField.fieldWidth } : { width: 300 }}
                value={value}
                onChange={handlePlaceSelect}
                disabled={!ready}
                // defaultValue={
                //     { place_id: '1', description: 'Test address' } || ''
                // }
                renderInput={(params) => {
                    const { InputLabelProps, InputProps, ...rest } = params;
                    return (
                        <>
                            {customTextField ? (
                                <TextField
                                    required={customTextField.required}
                                    label={customTextField.label}
                                    type={customTextField.type}
                                    InputLabelProps={customTextField.inputLabelPropsShrink}
                                    {...customTextField.register(customTextField.fieldName)}
                                    onChange={(event) => {
                                        setValue(event.target.value);
                                    }}
                                    ref={params.InputProps.ref}
                                    className={params.InputProps.className}
                                    {...rest}
                                />
                            ) : (
                                <InputBase
                                    {...params.InputProps}
                                    {...rest}
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Enter address"
                                    onChange={(event) => {
                                        setValue(event.target.value);
                                    }}
                                />
                            )}
                        </>
                    );
                }}
            />
        </>
    );
};

export default PlacesAutocomplete;
