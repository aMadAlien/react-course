import { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.styles.scss';
import { signInWithGooglePopup, createUserDocFromAuth, signInAuthUserWithEmailAndPassword  } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../context/user.context";

const defaultFormField = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formField, setFormField] = useState(defaultFormField);
    const { email, password } = formField;

    const { setCurrentUser } = useContext(UserContext);

    const resetFormField = () => {
        setFormField(defaultFormField);
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocFromAuth(user);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // receive user docs
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user);

            resetFormField();
        } catch(e) {
            // check what kind of error happened
            switch(e.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(e);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormField({ ...formField, [name]: value });
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
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
                <div className="buttons-container"> 
                    <Button type="submit">Sign In</Button>
                    <Button buttonType='google' type="button" onClick={signInWithGoogle} >Google Sign In</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;