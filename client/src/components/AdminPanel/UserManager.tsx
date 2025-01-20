import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { Button, Text } from "@radix-ui/themes";

import { UserType } from "src/Types/UserType";

export const UserManager: React.FC = () => {

    const [userList, setUserList] = useState<UserType[]>([]);

    const getAllUsers = () => {
        axios.get('/api/users/allUsers')
            .then((response) => {
                console.log(response.data);
            }).catch((error) => {
                console.log(error);
            })
    }


    return (
        <div>
            <Text>User Manager</Text>
            <Button onClick={getAllUsers}>Get</Button>
        </div>
    )
}