import { useState } from 'react';
import './Sidebar.css';
import EventListItem from './VolunteerSidebarContent/EventsList/EventListItem/EventListItem';
import {
    Divider,
    IconButton,
    TextField,
    Tooltip,
    useTheme,
} from '@mui/material';
import SignLanguageIcon from '@mui/icons-material/SignLanguage';
type Props = {
    sidebarContent?: JSX.Element;
};

export default function Sidebar(props: Props) {
    const theme = useTheme();

    return (
        <>
            <section
                className="sidebar text.primary z-10 flex flex-col items-center justify-start border-r shadow-2xl"
                style={{
                    borderColor: theme.palette.divider,
                    backgroundColor: theme.palette.background.default,
                }}
            >
                <div
                    className="flex min-h-[60px] w-full items-center justify-center gap-x-4 border-b"
                    style={{ borderColor: theme.palette.divider }}
                >
                    <span className="text-2xl font-black">Charity Meet</span>
                    <SignLanguageIcon></SignLanguageIcon>
                </div>

                {props?.sidebarContent}
            </section>
        </>
    );
}
