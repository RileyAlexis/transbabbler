import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

//RadixUI
import { Button } from '@radix-ui/themes';
import { DropdownMenu } from '@radix-ui/themes';

//Actions
import { setUser } from '../redux/reducers/userReducer';
import { setSelectedDatabase, setSelectedDatabaseToDefault } from '../redux/reducers/databaseReducer';

//Types
import { BabbleRootState } from 'src/Types/BabblerRootState';
import { CheckIcon } from '@radix-ui/react-icons';

export const BabbleHeader: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: BabbleRootState) => state.user);
    const databases = useSelector((state: BabbleRootState) => state.database);

    const handleLogin = () => {
        navigate('/login');
    }

    const handleLogout = async () => {
        axios.get('/api/users/logout', { withCredentials: true })
            .then((response) => {
                if (response.request.responseURL) {
                    dispatch(setUser(null));
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
            <div style={{ cursor: 'pointer', flexGrow: 1, margin: 0, textAlign: 'center' }}>
                <a onClick={() => navigate('/')}>
                    <h1>Transbabbler</h1>
                </a>
            </div>

            <div
                style={{
                    justifyContent: 'flex-end'
                }}
            >
                {!user.username &&
                    <Button variant='soft' onClick={handleLogin}>Log In</Button>
                }
                {user.usernanme !== null &&
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Button variant='soft' style={{
                                background: 'var(--pink-a5'
                            }}>
                                {user.username}
                                <DropdownMenu.TriggerIcon />
                            </Button>
                        </DropdownMenu.Trigger>

                        <DropdownMenu.Content>
                            <DropdownMenu.Item onSelect={handleLogout}>Logout</DropdownMenu.Item>
                            {user.is_admin === true &&
                                <>
                                    <DropdownMenu.Item onSelect={handleAdminSelect}>Admin Panel</DropdownMenu.Item>
                                </>
                            }
                            <DropdownMenu.Separator />
                            <DropdownMenu.Sub>
                                <DropdownMenu.SubTrigger>Data Set</DropdownMenu.SubTrigger>
                                <DropdownMenu.SubContent>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}>
                                        <DropdownMenu.Item
                                            style={{
                                                backgroundColor: databases.selectedDatabase === 'default' ? 'var(--highlightColor)' : '',
                                                border: databases.selectedDatabase === 'default' ? '1px solid white' : ''
                                            }}
                                            onSelect={() => dispatch(setSelectedDatabaseToDefault())}>Default
                                        </DropdownMenu.Item>

                                    </div>
                                    {databases.availableDatabases.map((item, index) => (
                                        <DropdownMenu.Item key={index}
                                            style={{
                                                backgroundColor: databases.selectedDatabase === item ? 'var(--highlightColor)' : '',
                                                border: databases.selectedDatabase === item ? '1px solid white' : '',
                                            }}
                                            onSelect={() => dispatch(setSelectedDatabase(item))}>{item}
                                        </DropdownMenu.Item>
                                    ))}

                                </DropdownMenu.SubContent>
                            </DropdownMenu.Sub>
                        </DropdownMenu.Content>

                    </DropdownMenu.Root>
                }
            </div>
        </div>
    )
}