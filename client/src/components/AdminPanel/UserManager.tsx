import { useEffect, useState } from "react";
import axios from "axios";

import { Button, Table, AlertDialog, Text, DropdownMenu } from "@radix-ui/themes";

import { UserType } from "src/Types/UserType";

interface UserManagerProps {
    setAllWords: React.Dispatch<React.SetStateAction<string[]>>;
}

export const UserManager: React.FC<UserManagerProps> = ({ setAllWords }) => {

    const [userList, setUserList] = useState<UserType[]>([]);
    const [userToDelete, setUserToDelete] = useState<UserType>();
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const getAllUsers = () => {
        axios.get('/api/users/allUsers')
            .then((response) => {
                setUserList(response.data);
                setAllWords(response.data);
            }).catch((error) => {
                console.log(error);
            })
    };

    const removeUser = () => {
        console.log('removeUser', userToDelete);
        axios.delete('/api/users/removeUser', { data: { userId: userToDelete?._id } })
            .then(() => {
                getAllUsers();
            }).catch((error) => {
                console.log(error);
            })
    }

    const runAlert = (user: UserType) => {
        console.log(user);
        setIsAlertOpen(true);
        setUserToDelete(user);
    };

    const makeAdmin = (userId: string) => {
        axios.post('/api/users/makeAdmin', { userId: userId })
            .then(() => {
                getAllUsers();
            }).catch((error) => {
                console.log(error);
            }
            )
    }

    const removeAdmin = (userId: string) => {
        axios.post('/api/users/removeAdmin', { userId: userId })
            .then(() => {
                getAllUsers();
            }).catch((error) => {
                console.log(error);
            })
    }


    useEffect(() => {
        getAllUsers();
    }, [])


    return (
        <div className="userListContainer"
            style={{
                display: 'flex',
                justifyContent: 'space-around',
                paddingTop: '0.1rem',
                paddingBottom: '0.3rem',
                overflowY: 'scroll'
            }}
        >
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>UserName</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Is Admin</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Phrases</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Remove</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {userList.map((user, index) => (
                        <Table.Row key={index}>
                            <Table.RowHeaderCell>{user.username}</Table.RowHeaderCell>
                            <Table.Cell>
                                <DropdownMenu.Root>
                                    <DropdownMenu.Trigger>
                                        <Button variant='soft' color={user.is_admin ? 'green' : 'gray'}>{user.is_admin ? 'Admin' : 'User'}
                                            <DropdownMenu.TriggerIcon />
                                        </Button>
                                    </DropdownMenu.Trigger>
                                    <DropdownMenu.Content>
                                        <DropdownMenu.Item onSelect={() => makeAdmin(user._id)}>Make Admin</DropdownMenu.Item>
                                        <DropdownMenu.Item onSelect={() => removeAdmin(user._id)}>Remove Admin</DropdownMenu.Item>
                                    </DropdownMenu.Content>
                                </DropdownMenu.Root>
                            </Table.Cell>
                            <Table.Cell>{user.phrases?.length}</Table.Cell>
                            <Table.Cell>
                                <Button onClick={() => runAlert(user)}>Remove</Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}

                </Table.Body>
            </Table.Root>

            <AlertDialog.Root open={isAlertOpen} onOpenChange={() => setIsAlertOpen(false)}>
                <AlertDialog.Content>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '2rem'
                    }}>
                        <AlertDialog.Title>
                            <div>
                                <Text style={{ marginRight: '0.3rem' }}>Delete User</Text>
                                <Text color='ruby'>
                                    {userToDelete?.username}
                                </Text>
                            </div>
                        </AlertDialog.Title>
                        <AlertDialog.Description size="2">
                            <Text color="red" weight="bold">Warning: This cannot be undone!</Text>
                        </AlertDialog.Description>
                        <div style={{
                            display: 'flex',
                            gap: '2rem'
                        }}>
                            <AlertDialog.Cancel>
                                <Button variant='soft' color="gray" onClick={() => setUserToDelete({ username: '', is_admin: false, phrases: [], _id: 0 })}>Cancel</Button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action>
                                <Button color="red"
                                    onClick={removeUser}
                                >Delete User</Button>
                            </AlertDialog.Action>
                        </div>
                    </div>
                </AlertDialog.Content>

            </AlertDialog.Root>





        </div>
    )
}