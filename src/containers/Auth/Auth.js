import React, {useState, useEffect} from 'react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import { Redirect } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as classes from './Auth.css';
import {updateObject} from "../../store/utility";
import {checkValidity} from "../../shared/utility";

const auth = props => {
    const [authForm, setAuthForm] = useState({
            email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'email address'
                    },
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    valid: false,
                    touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
    });
    const [isSignup, setIsSignup] = useState( false);


    useEffect(() => {
        if (!props.buildingBurger && props.authRedirect !== '/') {
            props.onSetAuthRedirectPath('/');
        }
    });

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup);
    };

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(authForm, {
            [controlName]: updateObject(authForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[controlName].validation),
                touched: true
            })
        });
        setAuthForm(updatedControls);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value, isSignup);
    };

    const formElementsArray = [];
    for(let key in authForm) {
        formElementsArray.push({
            id: key,
            config: authForm[key]
        });
    }

    let form = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id)} />
    ));
    if(props.loading) {
        form = <Spinner />
    }

    const errorMessageLookUp = {
        'INVALID_EMAIL': 'Email is not registered to an account',
        'USER_DISABLED': 'This user account has been disabled',
        'USER_NOT_FOUND': 'User not found',
        'TOKEN_EXPIRED': 'Please sign-in again to refresh credentials',
        'INVALID_PASSWORD': 'Username/password combination hasn\'t been found',
        'EMAIL_NOT_FOUND': 'There is no user record corresponding to this email',
        'EMAIL_EXISTS': 'Email is already registered to an account. Please login in'
    };

    let errorMessage = null;
    if (props.error) {
        errorMessage = (
            <div className={classes.errorMessage}>
                <p>{errorMessageLookUp[props.error.message.toString()]}</p>
            </div>
        )
    }

    let authRedirect = null;
    if(props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirect}/>
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
                {errorMessage}
            {isSignup ? <h2>SIGN UP</h2> : <h2>SIGN IN</h2>}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType='Success'>SUBMIT</Button>
            </form>
            <Button btnType='Danger' clicked={switchAuthModeHandler}>SWITCH TO {isSignup ? 'SIGN-IN' : 'SIGN-UP'}</Button>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirect: state.auth.authRedirect
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(auth);
