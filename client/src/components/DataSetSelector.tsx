import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

//Radix UI
import { DropdownMenu, Button, AlertDialog, Text } from '@radix-ui/themes';

//Components
import { BabbleCallout } from './BabbleCallout';

//Actions
import { setSelectedDatabase, setAvilableDatabases } from '../redux/reducers/databaseReducer';


//Modules
import { capitalize } from '../modules/capitalize';
import { getDatabaseNames } from '../modules/getDatabaseNames';

//Types
import { BabbleRootState } from '../Types/BabblerRootState';
import { useState } from 'react';

export const DataSetSelector: React.FC = () => {

    const dispatch = useDispatch();
    const databases = useSelector((state: BabbleRootState) => state.database);
    const user = useSelector((state: BabbleRootState) => state.user);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [dataToDelete, setDataToDelete] = useState('');
    const [isCalloutVisible, setIsCalloutVisible] = useState(false);
    const [calloutMessage, setCalloutMessage] = useState('');
    const [calloutColor, setCalloutColor] = useState('blue');

    const handleSelect = (item: string) => {
        dispatch(setSelectedDatabase(item));
    }

    const handleDeleteAlert = (item: string) => {
        setDataToDelete(item);
        setIsAlertOpen(true);
    }

    const handleConfirmDelete = () => {
        axios.delete('/api/data/deleteDataset', { data: { dbName: dataToDelete } })
            .then((response) => {
                setIsCalloutVisible(true);
                setCalloutMessage(response.data.message);
                getDatabaseNames().then((response) => dispatch(setAvilableDatabases(response)));
                setTimeout(() => setIsCalloutVisible(false), 3000);
            }).catch((error) => {
                setIsCalloutVisible(true);
                setCalloutColor('red');
                setCalloutMessage(error.response.data.message || "Error deleting dataset")
                console.error(error);

                setTimeout(() => setIsCalloutVisible(false), 3000);
            })
    }

    return (
        <div>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Button variant="soft">{capitalize(databases.selectedDatabase)}
                        <DropdownMenu.TriggerIcon />
                    </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    {databases.availableDatabases.map((item) => (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <DropdownMenu.Item
                                style={{
                                    display: databases.selectedDatabase === item ? 'none' : '',
                                }}
                                onSelect={() => handleSelect(item)}
                            >{capitalize(item)}
                            </DropdownMenu.Item>
                            {user.is_admin &&
                                <DropdownMenu.Sub>
                                    <DropdownMenu.SubTrigger style={{
                                        display: databases.selectedDatabase === item ? 'none' : '',
                                    }} />
                                    <DropdownMenu.SubContent>
                                        <DropdownMenu.Item
                                            style={{
                                                backgroundColor: 'var(--warningColor)'
                                            }}
                                            onSelect={() => handleDeleteAlert(item)}>
                                            Delete
                                        </DropdownMenu.Item>
                                    </DropdownMenu.SubContent>

                                </DropdownMenu.Sub>
                            }
                        </div>
                    ))}
                </DropdownMenu.Content>
            </DropdownMenu.Root>

            <AlertDialog.Root open={isAlertOpen} onOpenChange={setIsAlertOpen}>
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
                                <Text style={{ marginRight: '0.3rem' }}>Delete Data Set</Text>
                                <Text color='ruby'>
                                    {dataToDelete}
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
                                <Button variant='soft' color="gray" onClick={() => setDataToDelete('')}>Cancel</Button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action>
                                <Button color="red"
                                    onClick={handleConfirmDelete}
                                >Delete Data Set</Button>
                            </AlertDialog.Action>
                        </div>
                    </div>
                </AlertDialog.Content>

            </AlertDialog.Root>
            <BabbleCallout message={calloutMessage} color={calloutColor} isVisible={isCalloutVisible} />

        </div>
    );
};