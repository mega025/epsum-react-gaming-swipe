import {useState} from "react";


const loginViewModel= () => {
    const [errorMessage, setErrorMessage] = useState<string>("")

    const[Loginvalue, setLoginvalue] = useState({
        email: "",
        password: "",
    })

    const OnChange=(property:string, value:any)=>{
        setLoginvalue({
            ...Loginvalue,[property]:value})
    }

    const validateForm = () =>{
        if (Loginvalue.email === ""){
        setErrorMessage("Email is required");
        return false;
        }if (Loginvalue.password === ""){
            setErrorMessage("Password is required");
            return false;
        }
        return true;
    }

    const Login= async  () => {

    }
    return{
Loginvalue,OnChange,Login
    }
}

export default {loginViewModel};