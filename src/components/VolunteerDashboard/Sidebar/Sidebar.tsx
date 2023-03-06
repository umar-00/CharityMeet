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
                className={`sidebar text.primary flex flex-col items-center justify-start border-r ${
                    theme.palette.mode === 'dark'
                        ? '!bg-[#0a1929]'
                        : '!bg-white'
                }`}
                style={{ borderColor: theme.palette.divider }}
            >
                <div
                    className="flex min-h-[60px] w-full items-center justify-center gap-x-4"
                    style={{ borderColor: theme.palette.text.primary }}
                >
                    <span className="text-2xl font-black">Charity Meet</span>
                    <SignLanguageIcon></SignLanguageIcon>
                </div>

                <Divider flexItem />

                {props?.sidebarContent}
            </section>
        </>
    );
}
