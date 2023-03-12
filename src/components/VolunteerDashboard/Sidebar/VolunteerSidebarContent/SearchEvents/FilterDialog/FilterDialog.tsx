import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
} from '@mui/material';
import EventTypeSelect from './EventTypeSelect/EventTypeSelect';
import RadiusSlider from './RadiusSlider/RadiusSlider';

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
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 600 } }}
            maxWidth="xs"
            TransitionProps={{ onEntering: handleEntering }}
            open={openDialog}
            onClose={handleClose}
        >
            {/* <DialogTitle>Choose filters</DialogTitle> */}
            <DialogContent dividers>
                <div className="flex h-full w-full flex-col gap-y-10 py-2">
                    <div>
                        <h1 className="text-lg font-extrabold">
                            Distance radius
                        </h1>
                        <Divider className="!my-4" />
                        <RadiusSlider />
                    </div>

                    <div>
                        <h1 className="text-lg font-extrabold">Event type</h1>
                        <Divider className="!my-4" />
                        <EventTypeSelect />
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleOk}>
                    Confirm filters
                </Button>
            </DialogActions>
        </Dialog>
    );
}
