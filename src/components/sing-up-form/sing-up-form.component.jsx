import { async } from "@firebase/util";
import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from "../../utils/firebase/firebase.utils";

const defaultFormField = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUpForm = () => {
    const [formField, setFormField] = useState(defaultFormField);
    const { displayName, email, password, confirmPassword } = formField;

    const resetFormField = () => {
        setFormField(defaultFormField);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            alert('passwords do not match');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            );

            await createUserDocFromAuth(user, { displayName });
            resetFormField();
        } catch(e) {
            if (e.code === 'auth/email-already-in-use') {
                alert('email already in use');
            } else {
                console.error(e);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormField({ ...formField, [name]: value });
    }

    return (
        <>
        <h1>Sign up with your email and password</h1>
        <form onSubmit={handleSubmit}>
            <FormInput 
                label="Display Name"
                type="text" 
                required 
                name="displayName" 
                value={displayName} 
                onChange={handleChange} />
            <FormInput 
                label="Email"
                type="email" 
                required 
                name="email" 
                value={email} 
                onChange={handleChange} />
            <FormInput 
                label="Password"
                type="password" 
                required 
                name="password" 
                value={password} 
                onChange={handleChange} />
            <FormInput 
                label="Confirn Password"
                type="password" 
                required 
                name="confirmPassword" 
                value={confirmPassword} 
                onChange={handleChange} />
            <button type="submit">Sign Up</button>
        </form>
        </>
    );
};

export default SignUpForm;