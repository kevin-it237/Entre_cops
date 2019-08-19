import React, { Component, Fragment } from 'react';
import './AdminLogin.scss';


class AdminLogin extends Component {

    render() {
        return (
            <Fragment>
                <section classNameName="admin-login">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-6 text-white">
                                <form action="/admin/teacher/login" method="POST">
                                <div className="container">
                                    <div className="login-container">
                                    <h4 className="text-center py-2">COOPS</h4>
                                        <div id="output"></div>
                                        <center><img className="profile-img-card rounded-circle my-3" alt="" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" /></center>
                                        <div className="form-box">
                                            <form action="" method="">
                                                <input name="email" type="text"  value="ngaleuabel@gmail.com" placeholder="Email"/>
                                                <input type="password" value="noelle"  placeholder="Password" />
                                                <a href="/admin/home"  className="btn btn-danger btn-lg btn-block login btn-block mb-3 my-2">Login</a>
                                            </form>
                                        </div>
                                    </div>    
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
        );
    }
}

export default AdminLogin;