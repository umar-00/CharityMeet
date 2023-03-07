import React from 'react';
import { Link } from 'react-router-dom';

type Props = {};

function Error(props: Props) {
    return (
        <div>
            <h2>404</h2>
            <p>page not found</p>
            <Link to="/login">Click here to go to Login.</Link>
        </div>
    );
}

export default Error;
