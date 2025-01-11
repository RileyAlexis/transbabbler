import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

//RadixUI
import { Button } from '@radix-ui/themes';
import { DropdownMenu } from '@radix-ui/themes';


//Actions
import { logoutUser } from '../redux/reducers/userReducer';

//Types
import { BabbleRootState } from '../Types/BabblerRootState';

export const UserMenu: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: BabbleRootState) => state.user);

    const handleLogin = () => {
        navigate('/login');
    }

    const handleLogout = async () => {
        axios.get('/api/users/logout', { withCredentials: true })
            .then((response) => {
                if (response.request.responseURL) {
                    dispatch(logoutUser());
                    navigate('/');
                }
            }).catch((error) => {
                console.log(error);
            })
    }

    const handleAdminSelect = () => {
        navigate('/admin');
    }



    return (
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
                    </DropdownMenu.Content>

                </DropdownMenu.Root>
            }
        </div>
    )
}