import {useEffect, useState} from "react";
import {registerUseCase} from "../../../domain/usesCases/auth/RegisterAuth";
import {LoggedUserInterface, LoginUserInterface, UserInterface} from "../../../domain/entities/User";
import TabViewLoginRegister from "./TabViewLoginRegister";
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";
import {loginAuthUseCase} from "../../../domain/usesCases/auth/LoginAuth";
import {saveUserUserCase} from "../../../domain/usesCases/userLocal/saveUser";
import Toast from "react-native-toast-message";

const loginViewModel= () => {

    const [errorMessage, setErrorMessage] = useState<string>("")

    const {user, getUserSession} = UseUserLocalStorage()

    const[loginValues, setLoginvalue] = useState({
        email: "",
        password: "",
    })


    const onChangeLogin=(property:string, value:any)=>{
        setErrorMessage("")
        setLoginvalue({
            ...loginValues,[property]:value})
    }

    const validateForm = () =>{
        if (loginValues.email === ""){
            setErrorMessage("Email is required");
            return false;
        } if (loginValues.password === ""){
            setErrorMessage("Password is required");
            return false;
        }
        return true;
    }

    const login= async  () => {
        if (validateForm()){
            const response = await loginAuthUseCase(loginValues as LoginUserInterface);
            if(!response.success){
                setErrorMessage(response.message)
            } else {
                await saveUserUserCase(response.data as LoggedUserInterface)
                await getUserSession()
            }
        }
    }

    return{
        loginValues, onChangeLogin, login, user, errorMessage, setErrorMessage
    }
}


const registerViewModel= () => {

    const [errorMessage, setErrorMessage] = useState<string>("")

    const [registerValues, setRegisterValue] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const register = async  () => {
        if(validateForm()){
            const user: UserInterface = {
                email: registerValues.email,
                personalDetails: {
                    firstName: registerValues.firstName,
                    lastName: registerValues.lastName,
                    image_url: "",
                    password: registerValues.password
                },
                listFavGames: []
            }
            const response = await registerUseCase(user)
            if(response.success){
                Toast.show({
                    type: 'success',
                    text1: response.data.message,
                })
            }

        }
    }

    const onChangeRegister=(property:string, value:any)=>{
        setRegisterValue({
            ...registerValues, [property]:value
        })
    }

    const validateEmail = (email: string) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (!reg.test(email)) {
            return false;
        } else {
            return true
        }
    }

    const validateForm = () => {
        if (registerValues.firstName === "") {
            setErrorMessage("First name is required");
            return false
        } if (registerValues.lastName === "") {
            setErrorMessage("Last name is required")
            return false
        } if (registerValues.email === "") {
            setErrorMessage("Email is required")
            return false
        } if (!validateEmail(registerValues.email)) {
            setErrorMessage("Email is not valid")
            return false
        } if (registerValues.password === "") {
            setErrorMessage("Password is required")
            return false
        } if (registerValues.password.length < 8) {
            setErrorMessage("Password must have at least 8 characters")
            return false
        } if (registerValues.password !== registerValues.confirmPassword) {
            setErrorMessage("The passwords do not match")
            return false
        }
        return true
    }

    return {
        registerValues, onChangeRegister, register, errorMessage, setErrorMessage
    }
}

export default {loginViewModel, registerViewModel}