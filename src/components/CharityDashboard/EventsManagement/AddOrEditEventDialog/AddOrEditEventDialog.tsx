import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

type Props = {
    handleClose: () => void;
    openDialog: boolean;
    addOrEditString: 'Add' | 'Edit';
};

const AddOrEditEventDialog = (props: Props) => {
    const numArr: {
        id: number;
        title: string;
        type: string;
        multiLine?: boolean;
    }[] = [
        {
            id: 1,
            title: 'Event title',
            type: 'text',
        },
        {
            id: 2,
            title: 'Created on',
            type: 'date',
        },
        {
            id: 3,
            title: 'Ends on',
            type: 'date',
        },
        {
            id: 4,
            title: 'Address',
            type: 'text',
        },
        {
            id: 5,
            title: 'Volunteers needed',
            type: 'number',
        },
        {
            id: 6,
            title: 'Event description',
            type: 'text',
            multiLine: true,
        },
    ];

    const textFields: JSX.Element[] = numArr.map((obj) => (
        <div className="flex flex-col" key={obj.id}>
            {/* <span className="mb-2">{obj.title}</span> */}
            {obj.type === 'date' ? (
                <DateTimePicker
                    label={obj.title}
                    className="w-64"
                    defaultValue={dayjs()}
                />
            ) : (
                <TextField
                    id="outlined-basic"
                    label={obj.title}
                    type={obj.type}
                    InputLabelProps={{ shrink: true }}
                    multiline={obj.multiLine === true ? true : false}
                    rows={obj.multiLine === true ? 3 : 1}
                    className="w-64"
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
                <div className="flex h-full w-full flex-wrap items-center justify-between gap-y-8">
                    {textFields}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Close</Button>
                <Button variant="contained" onClick={props.handleClose}>
                    Save changes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddOrEditEventDialog;
