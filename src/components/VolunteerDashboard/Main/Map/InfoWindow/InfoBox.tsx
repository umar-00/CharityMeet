import { Chip, IconButton, Tooltip, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Event } from '../../../../../interfaces/Event';
import { OpenInfoBox } from '../Map';
import { useStore } from '../../../../../stores/useStore';

type Props = {
    event: Event | undefined;
    setOpenInfoBox: React.Dispatch<React.SetStateAction<OpenInfoBox>>;
};

const InfoBox = (props: Props) => {
    const theme = useTheme();

    const removeCurrentlySelectedEvent = useStore((state) => state.removeCurrentlySelectedEvent);

    const onCloseIconButtonClick = () => {
        props.setOpenInfoBox({ isOpen: false });
        removeCurrentlySelectedEvent();
        console.log('onCloseIconButtonClick setOpenInfoBox set to false');
    };

    if (!props.event) return null;

    return (
        <div
            className="absolute right-[24px] top-[72px] flex h-fit w-72 flex-col gap-y-2 overflow-auto rounded-xl border border-slate-400 py-4 px-2"
            style={{
                backgroundColor: theme.palette.background.default,
            }}
        >
            <span className="mb-2 self-center font-bold">Title: {props.event.title}</span>
            <span>
                <b>Organiser: </b> {props.event.charity_name}
            </span>
            <span className="flex items-center gap-x-2">
                <b>Volunteers needed: </b>{' '}
                <Chip color="success" label={props.event.volunteers_needed} />
            </span>
            <span>
                <b>Description: </b>
                {props.event.description}
            </span>
            <Tooltip title="Close" placement="bottom">
                <IconButton
                    sx={{
                        fontSize: '12px',
                        maxWidth: 'fit-content',
                        position: 'absolute',
                        top: '0px',
                        right: '0px',
                    }}
                    onClick={onCloseIconButtonClick}
                >
                    <CloseIcon />
                </IconButton>
            </Tooltip>
        </div>
    );
};

export default InfoBox;
