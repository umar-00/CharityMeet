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
import { supabase } from '../../../../supabase/supabaseClient';
import { Event, EventToCreateAndUpdate } from '../../../../interfaces/Event';
import { useStore } from '../../../../stores/useStore';

type Props = {
    handleClose: () => void;
    openDialog: boolean;
    addOrEditString: 'Add' | 'Edit';
    event?: Event;
};

type Inputs = {
    eventTitle: string;
    createdOn: Dayjs;
    endsOn: Dayjs;
    address: string;
    volunteersNeeded: number;
    eventDescription: string;
};

const AddOrEditEventDialog = (props: Props) => {
    const user = useStore((state) => state.authenticatedUser);
    const addEvent = useStore((state) => state.addEvent);
    const updateEvent = useStore((state) => state.updateEvent);

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors, touchedFields },
    } = useForm<Inputs>({
        defaultValues: {
            address: props.event?.address,
            createdOn: dayjs(props.event?.created_at),
            endsOn: dayjs(props.event?.ends_at),
            eventDescription: props.event?.description,
            eventTitle: props.event?.title,
            volunteersNeeded: props.event?.volunteers_needed,
        },
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log({
            ...data,
            createdOn: data.createdOn.toDate(),
            endsOn: data.endsOn.toDate(),
        });

        if (props.addOrEditString === 'Edit') {
            const eventToUpdate: Event = {
                id: props.event?.id!,
                address: data.address,
                charity_id: user?.user_id!,
                description: data.eventDescription,
                title: data.eventTitle,
                created_at: data.createdOn.toDate(),
                ends_at: data.endsOn.toDate(),
                volunteers_needed: data.volunteersNeeded,
            };

            await updateEvent(eventToUpdate, props.event?.id!);
        }

        if (props.addOrEditString === 'Add') {
            const eventToInsert: EventToCreateAndUpdate = {
                address: data.address,
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

    const numArr: {
        id: number;
        title:
            | 'address'
            | 'eventTitle'
            | 'createdOn'
            | 'endsOn'
            | 'volunteersNeeded'
            | 'eventDescription';
        type: string;
        multiLine?: boolean;
    }[] = [
        {
            id: 1,
            title: 'eventTitle',
            type: 'text',
        },
        {
            id: 2,
            title: 'createdOn',
            type: 'date',
        },
        {
            id: 3,
            title: 'endsOn',
            type: 'date',
        },
        {
            id: 4,
            title: 'address',
            type: 'text',
        },
        {
            id: 5,
            title: 'volunteersNeeded',
            type: 'number',
        },
        {
            id: 6,
            title: 'eventDescription',
            type: 'text',
            multiLine: true,
        },
    ];

    const textFields: JSX.Element[] = numArr.map((obj) => (
        <div className="flex flex-col" key={obj.id}>
            {obj.type === 'date' ? (
                <Controller
                    control={control}
                    name={obj.title}
                    defaultValue={dayjs()}
                    render={({ field }) => (
                        <DateTimePicker
                            {...field}
                            value={field.value ? field.value : dayjs()}
                            onOpen={() => console.log(field.value)}
                            onChange={(date: any) => {
                                field.onChange(date);
                            }}
                            label={field.name}
                            className="w-64"
                            slotProps={{
                                actionBar: {
                                    actions: ['today'],
                                },
                            }}
                        />
                    )}
                />
            ) : (
                <TextField
                    id="outlined-basic"
                    required
                    label={obj.title}
                    type={obj.type}
                    InputLabelProps={{ shrink: true }}
                    multiline={obj.multiLine === true ? true : false}
                    rows={obj.multiLine === true ? 3 : 1}
                    className="w-64"
                    {...register(obj.title)}
                />
            )}
        </div>
    ));

    return (
        <Dialog onClose={props.handleClose} open={props.openDialog}>
            <DialogTitle id="customized-dialog-title">
                {props.addOrEditString} Event
            </DialogTitle>
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
