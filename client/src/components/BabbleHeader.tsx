import React from 'react';
import { useUser } from '../main';
import { useNavigate } from 'react-router-dom';

import { Button, Text } from '@radix-ui/themes';

export const BabbleHeader: React.FC = () => {

    const navigate = useNavigate();
    const { user } = useUser();

    const handleLogin = () => {
        navigate('/login');
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            paddingRight: 10

        }}>
            <h1 style={{
                flexGrow: 1,
                margin: 0,
                textAlign: 'center'
            }}>
                Transbabbler</h1>
            <div
                style={{
                    justifyContent: 'flex-end'
                }}
            >
                {!user &&
                    <Button variant='soft' onClick={handleLogin}>Log In</Button>
                }
                {user?.usernanme &&
                    <Text>{user.usernanme}</Text>

                }
            </div>
        </div>
    )
}