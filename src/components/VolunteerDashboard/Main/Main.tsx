import React from 'react';
import './Main.css';
import GoogleMap from './GoogleMap/GoogleMap';

type Props = {
    VolunteerMainContent?: JSX.Element;
};

export default function Main(props: Props) {
    return <main className="main">{props?.VolunteerMainContent}</main>;
}
