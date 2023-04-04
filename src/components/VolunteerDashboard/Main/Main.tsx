import React from 'react';
import './Main.css';
import Map from './Map/Map';
import { useTheme } from '@mui/material';

type Props = {
    mainContent?: JSX.Element;
    optionalTailWindClasses?: string;
};

export default function Main(props: Props) {
    const theme = useTheme();

    return (
        <main
            className={`main ${props?.optionalTailWindClasses}`}
            style={{ backgroundColor: theme.palette.action.disabledBackground }}
        >
            {props?.mainContent}
        </main>
    );
}
