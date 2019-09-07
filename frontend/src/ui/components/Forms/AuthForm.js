import React, { Component } from 'react';
import Header from '../../globalComponent/Header';
import Hoc from '../../globalComponent/Hoc'
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';

class AuthForm extends Component {

    state = {
        isLogin: true
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
                {this.props.token ? this.props.history.goBack(): null}
                <Header />
                {Form}
            </Hoc>
        );
    }
}

const mapPropsToState = state => {
    return {
        token: state.auth.token,
    }
}

export default connect(mapPropsToState)(AuthForm);