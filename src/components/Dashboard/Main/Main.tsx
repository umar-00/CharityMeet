import React from 'react';
import './Main.css';
import GoogleMap from './GoogleMap/GoogleMap';

type Props = {};

export default function Main({}: Props) {
    return (
        <main className="main">
            <GoogleMap></GoogleMap>
        </main>
    );
}
