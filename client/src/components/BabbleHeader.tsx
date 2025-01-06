import React from 'react';
import { useUser } from '../main';
import { useNavigate } from 'react-router-dom';

import { Button } from '@radix-ui/themes';
import { Badge } from '@radix-ui/themes/dist/cjs/index.js';

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
                    <Badge color="pink" size="3" variant='soft'
                        style={{
                            paddingTop: 7,
                            paddingBottom: 7,
                            paddingLeft: 12,
                            paddingRight: 12,
                        }}
                    >{user.usernanme}</Badge>

                }
            </div>
        </div>
    )
}