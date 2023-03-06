import React from 'react';
import { Link } from 'react-router-dom';

type Props = {};

function Error(props: Props) {
    return (
        <div>
            <h2>404</h2>
            <p>page not found</p>
            <Link to="/dashboard">back to the dashboard</Link>
        </div>
    );
}

export default Error;
