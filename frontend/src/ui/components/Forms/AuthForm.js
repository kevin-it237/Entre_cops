import React, { Component } from 'react';
import Header from '../../globalComponent/Header';
import Hoc from '../../globalComponent/Hoc'
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

class AuthForm extends Component {

    state = {
        isLogin: false
    }

    changeForm = () => {
        this.setState({ isLogin: !this.state.isLogin});
    }

    render() {
        const Form = this.state.isLogin ? 
            <LoginForm changeForm={this.changeForm} /> : 
            <SignupForm changeForm={this.changeForm} />;
        return (
            <Hoc>
                <Header />
                {Form}
            </Hoc>
        );
    }
}

export default AuthForm;