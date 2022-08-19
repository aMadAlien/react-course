import { useState } from "react";

const defaultFormField = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUpForm = () => {
    const [formField, setFormField] = useState(defaultFormField);
    const { displayName, email, password, confirmPassword } = formField;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormField({ ...formField, [name]: value });
    }

    return (
        <>
        <h1>Sign up with your email and password</h1>
        <form onSubmit={() => {}}>
            <label htmlFor="">Display Name</label>
            <input 
                type="text" 
                required 
                name="displayName" 
                value={displayName} 
                onChange={handleChange} />
            <label htmlFor="">Email</label>
            <input 
                type="email" 
                required 
                name="email" 
                value={email} 
                onChange={handleChange} />
            <label htmlFor="">Password</label>
            <input 
                type="password" 
                required 
                name="password" 
                value={password} 
                onChange={handleChange} />
            <label htmlFor="">Confirn Password</label>
            <input 
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