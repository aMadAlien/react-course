import './button.styles.scss';

const BUTTON_TYPE_CLESSES = {
    google: 'google-sign-in',
    inverted: 'inverted',
}

const Button = ({ children, buttonType, ...otherProps }) => {
    return <button className={`button-container ${BUTTON_TYPE_CLESSES[buttonType]}`} {...otherProps}>{children}</button>
};

export default Button;