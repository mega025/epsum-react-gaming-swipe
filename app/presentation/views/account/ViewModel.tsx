import {removeUserUseCase} from "../../../domain/usesCases/userLocal/removeUser";
import {ApiDelivery} from "../../../data/sources/remote/api/ApiDelivery";
import {LoggedUserInterface, UserInterface} from "../../../domain/entities/User";
import Toast from "react-native-toast-message";
import {UserNavigation} from "../../navigation/UserNavigation";
import {UserLocalRepository} from "../../../data/repositories/UserLocalRepository";
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";
import {useState} from "react";
import {PasswordsDTO} from "../../../domain/entities/UpdatePasswordDTO";

export const AccountViewModel =()=> {

    const [userDB, setUserDB] = useState<UserInterface>()
    const [showLoading, setShowLoading] = useState(true);
    let [errorMessage, setErrorMessage] = useState("");

    const [updatePasswordDTO, setUpdatePasswordDTO] = useState<PasswordsDTO>({
        oldPassword: "",
        newPassword: "",
    });

    const deleteSession = async () => {
        await removeUserUseCase()
    }

    const getUserDB = async (userId: number) => {
        await ApiDelivery.get(`/users/${userId}`)
            .then((response) => {
                setUserDB(response.data);
                setShowLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const updateUserDetails = async (updatedUser: UserInterface, userId: number) => {
        await ApiDelivery.post(`/users/update/${userId}`, updatedUser)
            .then((response) => {
                if (response.status === 200) {
                    Toast.show({
                        type: 'success',
                        text1: response.data.message,
                    });
                    setUserDB(updatedUser);
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

    const validateUpdatePasswordForm = () => {
        if (updatePasswordDTO.oldPassword === "" || updatePasswordDTO.confirmPassword === "" || updatePasswordDTO.newPassword === "") {
            setErrorMessage("Empty fields are not allowed")
            return false
        } if (updatePasswordDTO.confirmPassword !== updatePasswordDTO.newPassword) {
            setErrorMessage("Passwords do not match");
            return  false
        }
        return true;
    }

    const updateUserPassword = async (passwordDTO: PasswordsDTO, userId: number) => {
        if (validateUpdatePasswordForm()) {
            await ApiDelivery.post(`/users/updatepassword/${userId}`, passwordDTO)
                .then((response) => {
                    Toast.show({
                        type: 'success',
                        text1: response.data.message,
                    })
                })
                .catch(error => {
                    Toast.show({
                        type: 'error',
                        text1: "Incorrect password",
                    })
                })
        }
    }

    return {
        deleteSession,
        getUserDB,
        userDB,
        showLoading,
        updateUserDetails,
        updatePasswordDTO,
        setUpdatePasswordDTO,
        errorMessage,
        setErrorMessage,
        updateUserPassword
    };
}

export default { AccountViewModel };