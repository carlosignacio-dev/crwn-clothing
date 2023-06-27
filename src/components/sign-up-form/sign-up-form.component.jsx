import { useState } from "react";

import FormInput from "../form-input/form-input.component"

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if(password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }
        try {
            const user  = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();            

        } catch(error) {
            if(error.code == "auth/email-already-in-use") {
                alert("Cannot create user, email already in use");
            }
            console.log("user creation encountered an error", error);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value});
    }

    return (
        <div>
            <h1>Sign Up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <FormInput type="text" 
                label="Display Name"
                required 
                onChange={handleChange} 
                name="displayName" 
                value={displayName}/>

                <label>Email</label>
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

                <FormInput type="password" 
                label="Confirm Password"
                required 
                onChange={handleChange} 
                name="confirmPassword" 
                value={confirmPassword}/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm;