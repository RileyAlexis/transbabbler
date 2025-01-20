import { useEffect, useState } from "react";
import axios from "axios";

import { Button, Table, AlertDialog, Text } from "@radix-ui/themes";

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
                            <Table.Cell>{user.is_admin ? 'Yes' : 'No'}</Table.Cell>
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