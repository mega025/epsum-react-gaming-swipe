import {removeUserUseCase} from "../../../domain/usesCases/userLocal/removeUser";
import {ApiDelivery} from "../../../data/sources/remote/api/ApiDelivery";
import {LoggedUserInterface, UserInterface} from "../../../domain/entities/User";
import Toast from "react-native-toast-message";
import {UserNavigation} from "../../navigation/UserNavigation";
import {UserLocalRepository} from "../../../data/repositories/UserLocalRepository";
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";
import {useState} from "react";

export const AccountViewModel =()=> {

    const [userDB, setUserDB] = useState<UserInterface>()
    const {user} = UseUserLocalStorage()

    const deleteSession = async () => {
        await removeUserUseCase()
    }

    const getUserDB = async (userId: number) => {
        if(user?.userId != undefined){
            ApiDelivery.get(`/users/${userId}`)
                .then((response) => {
                    setUserDB(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    const updateUserDetails = async (updatedUser: UserInterface, userId: number) => {
        ApiDelivery.post(`/users/update/${userId}`, updatedUser)
            .then((response) => {
                if (response.status === 200) {
                    Toast.show({
                        type: 'success',
                        text1: response.data.message,
                    });
                } else {
                    Toast.show({
                        type: 'error',
                        text1: response.data.message,
                    })
                }

            })
            .catch((error) => {
                Toast.show({
                    type: 'error',
                    text1: error,
                })
            })
    }

    return {
        deleteSession,
        getUserDB,
        userDB,
    };
}

export default { AccountViewModel };