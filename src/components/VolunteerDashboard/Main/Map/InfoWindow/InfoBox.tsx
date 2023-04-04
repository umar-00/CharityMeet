import { IconButton, Tooltip, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Event } from '../../../../../interfaces/Event';
import { OpenInfoBox } from '../Map';

type Props = {
    event: Event | undefined;
    setOpenInfoBox: React.Dispatch<React.SetStateAction<OpenInfoBox>>;
};

const InfoBox = (props: Props) => {
    const theme = useTheme();

    const onCloseIconButtonClick = () => {
        props.setOpenInfoBox({ isOpen: false });
        console.log('onCloseIconButtonClick setOpenInfoBox set to false');
    };

    if (!props.event) return null;

    return (
        <div
            className="absolute right-[24px] top-[72px] flex h-44 w-72 flex-col gap-y-4 overflow-auto rounded-xl border border-slate-400 p-2"
            style={{
                backgroundColor: theme.palette.background.default,
            }}
        >
            <span className=" self-center font-bold">Organiser: {props.event.charity_name}</span>
            <span>
                <b>Type: </b> Blood donation drive
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
