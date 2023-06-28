import { useState, useContext } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { UserContext, userContext } from "../../contexts/user.context";

import { signInWithGooglePopup, 
    createUserDocumentFromAuth, 
    signInAuthUserWithEmailAndPassword 
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
    email: "",
    password: "",
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    
    const SignInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user);
            resetFormFields();            

        } catch(error) {
            switch(error.code) {
                case "auth/wrong-password" : alert("incorrect password for email");
                break
                case "auth/user-not-found" : alert("user not found");
                break
                default: console.log(error);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value});
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput type="email" 
                label="Email"
                required 
                onChange={handleChange} 
                name="email" 
                value={email}/>

                <FormInput type="password" 
                label="Password"
                required 
                onChange={handleChange} 
                name="password" 
                value={password}/>

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType="google" onClick={SignInWithGoogle}>Google sign In</Button>                
                </div>
            </form>
        </div>
    )
}

export default SignInForm;