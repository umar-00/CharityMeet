import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { EventAddress, Event, EventToCreate, EventToUpdate } from '../../../../interfaces/Event';
import { useStore } from '../../../../stores/useStore';
import PlacesAutocomplete from '../../../PlacesAutocomplete/PlacesAutocomplete';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type Inputs = {
    eventTitle: string;
    createdOn: Dayjs;
    endsOn: Dayjs;
    address: string;
    volunteersNeeded: number;
    eventDescription: string;
};

type InputFieldConfiguration = {
    id: number;
    fieldName:
        | 'address'
        | 'eventTitle'
        | 'createdOn'
        | 'endsOn'
        | 'volunteersNeeded'
        | 'eventDescription';
    label: string;
    type: 'text' | 'date' | 'number' | 'address';
    multiLine?: boolean;
};

const inputFieldsArr: InputFieldConfiguration[] = [
    {
        id: 1,
        fieldName: 'eventTitle',
        label: 'Event title',
        type: 'text',
    },
    {
        id: 2,
        fieldName: 'createdOn',
        label: 'Created on',
        type: 'date',
    },
    {
        id: 3,
        fieldName: 'endsOn',
        label: 'Ends on',
        type: 'date',
    },
    {
        id: 4,
        fieldName: 'address',
        label: 'Address',
        type: 'address',
    },
    {
        id: 5,
        fieldName: 'volunteersNeeded',
        label: 'Volunteers needed',
        type: 'number',
    },
    {
        id: 6,
        fieldName: 'eventDescription',
        label: 'Event description',
        type: 'text',
        multiLine: true,
    },
];

type Props = {
    handleClose: () => void;
    openDialog: boolean;
    addOrEditString: 'Add' | 'Edit';
    event?: Event;
};

const AddOrEditEventDialog = (props: Props) => {
    const user = useStore((state) => state.authenticatedUser);
    const addEvent = useStore((state) => state.addEvent);
    const updateEvent = useStore((state) => state.updateEvent);

    const [address, setAddress] = useState<EventAddress>();

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors, touchedFields },
    } = useForm<Inputs>({
        defaultValues: {
            // address: props.event?.address.description,
            createdOn: dayjs(props.event?.created_at),
            endsOn: dayjs(props.event?.ends_at),
            eventDescription: props.event?.description,
            eventTitle: props.event?.title,
            volunteersNeeded: props.event?.volunteers_needed,
        },
    });

    useEffect(() => {
        if (!address && props.addOrEditString === 'Edit' && props.event?.address?.description) {
            setAddress(props.event.address);
            console.log('useEffect triggered, dialog: ', { event: props.event, address });
        }
    }, []);

    const renderInputField: (inputField: InputFieldConfiguration) => JSX.Element = (inputField) => {
        // TODO - memoize this function using useCallback
        // console.log('renderInputField');

        if (inputField.type === 'date') {
            return (
                <Controller
                    control={control}
                    name={inputField.fieldName}
                    defaultValue={dayjs()}
                    render={({ field }) => (
                        <DateTimePicker
                            {...field}
                            value={field.value ? field.value : dayjs()}
                            onOpen={() => console.log(field.value)}
                            onChange={(date: any) => {
                                field.onChange(date);
                            }}
                            label={inputField.label}
                            className="w-64"
                            slotProps={{
                                actionBar: {
                                    actions: ['today'],
                                },
                            }}
                        />
                    )}
                />
            );
        } else if (inputField.type === 'address') {
            return (
                <PlacesAutocomplete
                    customTextField={{
                        inputLabelPropsShrink: { shrink: true },
                        fieldWidth: '256px',
                        label: inputField.label,
                        type: inputField.type,
                        required: true,
                        register: register,
                        fieldName: inputField.fieldName,
                        setAddress: setAddress,
                        address: address,
                        initialAutoCompleteValue: props.event?.address?.description,
                    }}
                />
            );
        } else {
            return (
                <TextField
                    id="outlined-basic"
                    required
                    label={inputField.label}
                    type={inputField.type}
                    InputLabelProps={{ shrink: true }}
                    multiline={inputField.multiLine === true ? true : false}
                    rows={inputField.multiLine === true ? 3 : 1}
                    className="w-64"
                    {...register(inputField.fieldName)}
                />
            );
        }
    };

    const textFields: JSX.Element[] = inputFieldsArr.map((obj) => (
        <div className="flex flex-col" key={obj.id}>
            {renderInputField(obj)}
        </div>
    ));

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log({
            ...data,
            createdOn: data.createdOn.toDate(),
            endsOn: data.endsOn.toDate(),
        });

        console.log('form submit: ', { touchedFields, addressRef: address });

        if (!address) {
            toast.error('Please select a valid address.');
            return;
        }

        if (props.addOrEditString === 'Edit') {
            const eventToUpdate: EventToUpdate = {
                id: props.event?.id!,
                address: address ?? null,
                description: data.eventDescription,
                title: data.eventTitle,
                created_at: data.createdOn.toDate(),
                ends_at: data.endsOn.toDate(),
                volunteers_needed: data.volunteersNeeded,
            };

            await updateEvent(eventToUpdate, props.event?.id!);
        } else if (props.addOrEditString === 'Add') {
            const eventToInsert: EventToCreate = {
                address: address ?? null,
                charity_id: user?.user_id!,
                description: data.eventDescription,
                title: data.eventTitle,
                created_at: data.createdOn.toDate(),
                ends_at: data.endsOn.toDate(),
                volunteers_needed: data.volunteersNeeded,
            };

            await addEvent(eventToInsert);
        }

        props.handleClose();
    };

    return (
        <Dialog onClose={props.handleClose} open={props.openDialog}>
            <DialogTitle id="customized-dialog-title">{props.addOrEditString} Event</DialogTitle>
            <DialogContent dividers>
                <Box
                    className="flex h-full w-full flex-wrap items-center justify-between gap-y-8"
                    component="form"
                    id="addEditForm"
                    sx={{ mt: 1 }}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {textFields}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Close</Button>
                <Button variant="contained" type="submit" form="addEditForm">
                    Save changes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddOrEditEventDialog;
