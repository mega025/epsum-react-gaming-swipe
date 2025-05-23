import {removeUserUseCase} from "../../../domain/usesCases/userLocal/removeUser";
import {ApiDelivery} from "../../../data/sources/remote/api/ApiDelivery";
import {GetUserInterface, LoggedUserInterface, UpdateUserDTO, UserInterface} from "../../../domain/entities/User";
import Toast from "react-native-toast-message";
import {UserNavigation} from "../../navigation/UserNavigation";
import {UserLocalRepository} from "../../../data/repositories/UserLocalRepository";
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";
import {useState} from "react";
import {PasswordsDTO} from "../../../domain/entities/UpdatePasswordDTO";
import {getUserDBUseCase} from "../../../domain/usesCases/account/GetUser";
import {updateUserUseCase} from "../../../domain/usesCases/account/UpdateUser";
import {updatePasswordUseCase} from "../../../domain/usesCases/account/UpdatePassword";

export const accountViewModel =()=> {

    const [userDB, setUserDB] = useState<GetUserInterface>()
    const [showLoading, setShowLoading] = useState(true);
    let [errorMessage, setErrorMessage] = useState("");

    const [updatePasswordDTO, setUpdatePasswordDTO] = useState<PasswordsDTO>({
        oldPassword: "",
        newPassword: "",
    });

    const deleteSession = async () => {
        await removeUserUseCase()
    }

    const getUserDB = async (slug: string, token: string) => {
        const response = await getUserDBUseCase(slug, token)
        setUserDB(response)
        setShowLoading(false)
    }

    const updateUserDetails = async (slug: string, token: string, data: UpdateUserDTO | FormData | undefined) => {
        const response = await updateUserUseCase(slug, token, data)
        Toast.show({
            type:"success",
            text1: response.message,
        })
    }

    const updateUserPassword = async (slug: string, token: string, passwordDTO: PasswordsDTO) => {
        if (validateUpdatePasswordForm()) {
            const response = await updatePasswordUseCase(slug, token, passwordDTO)
            Toast.show({
                type:"success",
                text1: response.message,
            })
        }
    }


    const validateUpdatePasswordForm = () => {
        if (updatePasswordDTO.oldPassword === "" || updatePasswordDTO.confirmPassword === "" || updatePasswordDTO.newPassword === "") {
            setErrorMessage("Empty fields are not allowed")
            return false
        } if (updatePasswordDTO.newPassword.length < 8) {
            setErrorMessage("Password must have at least 8 characters")
            return false
        } if (updatePasswordDTO.confirmPassword !== updatePasswordDTO.newPassword) {
            setErrorMessage("Passwords do not match");
            return false
        }
        return true;
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

export default { AccountViewModel: accountViewModel };