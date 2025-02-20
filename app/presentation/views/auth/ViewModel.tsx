import {useState} from "react";
import {registerUseCase} from "../../../domain/usesCases/auth/RegisterAuth";
import {LoggedUserInterface, LoginUserInterface, UserInterface} from "../../../domain/entities/User";
import TabViewLoginRegister from "./TabViewLoginRegister";
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";
import {loginAuthUseCase} from "../../../domain/usesCases/auth/LoginAuth";
import {saveUserUserCase} from "../../../domain/usesCases/userLocal/saveUser";

const loginViewModel= () => {

    const [errorMessage, setErrorMessage] = useState<string>("")

    const {user, getUserSession} = UseUserLocalStorage()

    const[loginValues, setLoginvalue] = useState({
        email: "",
        password: "",
    })


    const onChangeLogin=(property:string, value:any)=>{
        setLoginvalue({
            ...loginValues,[property]:value})
    }

    const validateForm = () =>{
        if (loginValues.email === ""){
        setErrorMessage("Email is required");
        return false;
        }if (loginValues.password === ""){
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
        loginValues, onChangeLogin, login, user, errorMessage
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
                    imageUrl: "",
                    password: registerValues.password
                },
                listFavGames: []
            }
            const response = await registerUseCase(user)
            console.log("RESULT "+ JSON.stringify(response))
            if(response.success){
                alert(response.message)
            }

        }
    }

    const onChangeRegister=(property:string, value:any)=>{
        setRegisterValue({
            ...registerValues, [property]:value
        })
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
        } if (registerValues.password === "") {
            setErrorMessage("Password is required")
            return false
        } if (registerValues.password !== registerValues.confirmPassword) {
            setErrorMessage("The passwords do not match")
            return false
        }
        return true
    }

    return {registerValues, onChangeRegister, register,errorMessage}
}

export default {loginViewModel, registerViewModel}