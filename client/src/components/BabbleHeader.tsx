import React from 'react';
import { useUser } from '../main';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Button } from '@radix-ui/themes';
import { DropdownMenu } from '@radix-ui/themes';

export const BabbleHeader: React.FC = () => {

    const navigate = useNavigate();
    const { user, setUser } = useUser();

    const handleLogin = () => {
        navigate('/login');
    }

    const handleLogout = async () => {
        axios.get('/api/users/logout', { withCredentials: true })
            .then((response) => {
                if (response.request.responseURL) {
                    setUser(null);
                    navigate('/');
                }
            }).catch((error) => {
                console.log(error);
            })
    }

    const handleAdminSelect = () => {
        navigate('/admin')
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            paddingRight: 10,
            background: 'linear-gradient(to right, var(--pink-a5), var(--blue)'

        }}>
            <a style={{
                cursor: 'pointer'
            }}
                onClick={() => navigate('/')}>
                <h1 style={{
                    flexGrow: 1,
                    margin: 0,
                    textAlign: 'center'
                }}>
                    Transbabbler</h1>
            </a>
            <div
                style={{
                    justifyContent: 'flex-end'
                }}
            >
                {!user &&
                    <Button variant='soft' onClick={handleLogin}>Log In</Button>
                }
                {user?.usernanme &&


                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Button variant='soft' style={{
                                background: 'var(--pink-a5'
                            }}>{user.usernanme}
                                <DropdownMenu.TriggerIcon />
                            </Button>
                        </DropdownMenu.Trigger>

                        <DropdownMenu.Content>
                            <DropdownMenu.Item onSelect={handleLogout}>Logout</DropdownMenu.Item>
                            {user.is_admin &&
                                <>
                                    <DropdownMenu.Separator />
                                    <DropdownMenu.Item onSelect={handleAdminSelect}>Admin Panel</DropdownMenu.Item>
                                </>
                            }
                        </DropdownMenu.Content>

                    </DropdownMenu.Root>
                }
            </div>
        </div>
    )
}