import React from 'react';
import { useNavigate } from 'react-router-dom';

export const BabbleHeader: React.FC = () => {

    const navigate = useNavigate();

    return (
        <div className='babbleHeader'>
            <div style={{ cursor: 'pointer', flexGrow: 1, margin: 0, textAlign: 'center' }}>
                <a onClick={() => navigate('/')}>
                    <h1>Transbabble</h1>
                </a>
            </div>
        </div>
    )
}