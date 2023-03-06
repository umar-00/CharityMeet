import { useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';

type Props = {};

export default function EventListItem({}: Props) {
    const theme = useTheme();

    return (
        <>
            <div
                className={`flex h-28 flex-col border-x-0 border-b-0 p-3 [&:nth-child(1)]:!border-t-0`}
                style={{ borderColor: theme.palette.text.primary }}
            >
                <span className="text-xl font-bold">Event XYZ</span>
                <span className="text-lg">Distance: 9.4 kilometres</span>
                <span className="text-lg">Address: College Ring 4</span>
            </div>
            <Divider />
        </>
    );
}
