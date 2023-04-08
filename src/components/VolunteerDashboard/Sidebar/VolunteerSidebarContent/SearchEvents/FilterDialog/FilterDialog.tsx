import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material';
import EventTypeSelect from './EventTypeSelect/EventTypeSelect';
import RadiusSlider from './RadiusSlider/RadiusSlider';
import { useEffect, useState } from 'react';
import { useStore } from '../../../../../../stores/useStore';

type Props = {
    openDialog: boolean;
    onClose: () => void;
};

export default function FilterDialog(props: Props) {
    const [radiusValueInKm, setRadiusValueInKm] = useState<number>(1);

    const searchRadiusInMeters = useStore((state) => state.searchRadiusInMeters);

    const setSearchRadiusInMeters = useStore((state) => state.setSearchRadiusInMeters);

    const handleCancelClick = () => {
        props.onClose();
    };

    const handleConfirmClick = () => {
        console.log('handleConfirmClick');
        setSearchRadiusInMeters(radiusValueInKm * 1000);
        props.onClose();
    };

    useEffect(() => {
        console.log('useEffect, searchRadiusInMeters', searchRadiusInMeters);
        setRadiusValueInKm(searchRadiusInMeters / 1000);
    }, [searchRadiusInMeters]);

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 600 } }}
            maxWidth="xs"
            open={props.openDialog}
            onClose={handleCancelClick}
        >
            {/* <DialogTitle>Choose filters</DialogTitle> */}
            <DialogTitle>Show events within this search radius</DialogTitle>

            <DialogContent dividers>
                <div className="flex h-full w-full flex-col gap-y-10 py-2">
                    <div>
                        {/* <h1 className="text-lg font-extrabold">
                            Show events within this search radius
                        </h1>
                        <Divider className="!my-4" /> */}
                        <RadiusSlider
                            value={radiusValueInKm}
                            setValue={setRadiusValueInKm}
                            handleConfirmClick={handleConfirmClick}
                            onClose={props.onClose}
                        />
                    </div>

                    {/* <div>
                        <h1 className="text-lg font-extrabold">Event type</h1>
                        <Divider className="!my-4" />
                        <EventTypeSelect />
                    </div> */}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelClick}>Cancel</Button>
                <Button variant="contained" onClick={handleConfirmClick}>
                    Confirm filters
                </Button>
            </DialogActions>
        </Dialog>
    );
}
