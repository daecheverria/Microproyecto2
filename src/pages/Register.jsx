
export default function Register2(){
    return (
      <div>
        Hola B
      </div>
    )
  }

  import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    registerWithEmailAndPassword,
    signInWithGoogle,
} from "firebase/auth"

export function Register() {
    const navigate = useNavigate();
    const [formData, setData] = useState({displayName:""});

    const onSuccess = () => {
        console.log("REGISTER SUCCESS");
        navigate("/Homepage");
    };

    const onFail = (_error) => {
        console.log("REGISTER FAILED, Try Again");
    };

    const validateForm = () => {
         console.log(formData.displayName)
        if (formData.email.length == 0) {
            document.getElementById("email").style.border = "2px solid red";
            return false;
        }
        if (formData.password.length < 6) {
            document.getElementById("password").style.border = "2px solid red"; 
            return false;
        }
        if (!formData.displayName) {
            document.getElementById("name").style.border = "2px solid red";
            return false;
        }
        return true;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }
        else{
             
        await registerWithEmailAndPassword({
        userData: formData,
        onSuccess,
        onFail,
        });
        }
       console.log(formData);
    };

    const handleGoogleClick = async () => {
        await signInWithGoogle({
        onSuccess: () => navigate("/Homepage"), });
    };

    const onChange = (event) => {
        setData((oldData) => ({
        ...oldData,
        [event.target.name]: event.target.value,
        }));
    };

    return(
        <div>
            <form>
              
                <div >
                    <div>
                        <Link to={"/Homepage"}>
                            <i className="fa-light fa-x"></i>
                        </Link>
                    </div>
                    <div>
                    <h1>Registrarse</h1>
                    </div>
                    <div>
                        <label htmlFor="name"><span>Ingrese su nombre completo</span></label>
                        <input type="name" name="displayName" id="name" placeholder="Nombre" onChange={onChange}/>
                    </div>
                    <div>
                        <label htmlFor="email"><span>Ingrese su correo</span></label>
                        <input type="email" name="email" id="email" placeholder="correo@email.com" onChange={onChange}/>
                    </div>
                    <div>
                        <label htmlFor="password"><span>Ingrese su contraseña</span></label>
                        <input type="password" name="password" id="password" placeholder="********" onChange={onChange}/>
                    </div>
                    <button type="submit" onClick={handleSubmit}>Registrarse</button>
                    <button type="button" onClick={handleGoogleClick}>Registrarse con Google</button>
                    <Link to={"/Login"}>
                    ¿Ya tines una cuenta? {" "}
                        <span>Iniciar Sesión</span>
                    </Link>
                </div>
            </form>
        </div>
    )
}