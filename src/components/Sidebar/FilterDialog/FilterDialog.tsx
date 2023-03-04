import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    RadioGroup,
} from '@mui/material';
import React from 'react';

type Props = {
    openDialog: boolean;
    // selectedValue: string;
    onClose: () => void;
};

export default function FilterDialog({ openDialog, onClose }: Props) {
    // const { onClose, value: valueProp, open, ...other } = props;

    // const [value, setValue] = useState();
    // const radioGroupRef = useRef<HTMLElement>(null);

    //   React.useEffect(() => {
    //     if (!open) {
    //       setValue(valueProp);
    //     }
    //   }, [valueProp, open]);

    const handleEntering = () => {
        // if (radioGroupRef.current != null) {
        //     radioGroupRef.current.focus();
        // }
    };

    const handleClose = () => {
        onClose();
    };

    const handleOk = () => {
        // onClose(value);
    };

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     // setValue((event.target as HTMLInputElement).value);
    // };

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            TransitionProps={{ onEntering: handleEntering }}
            open={openDialog}
            onClose={handleClose}
        >
            <DialogTitle>Phone Ringtone</DialogTitle>
            <DialogContent dividers>
                <div>
                    <h1>TEST</h1>
                    <span>test tes test</span>
                </div>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Cancel
                </Button>
                <Button onClick={handleOk}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
}
