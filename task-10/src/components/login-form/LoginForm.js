import React from 'react';
import styles from './LoginForm.module.css';
import {connect} from "react-redux";

class LoginForm extends React.Component {
    login = () => {
        if(this.props.users) {
            const { users } = this.props;
            const usersLogins = users.map(user => user.name);
            const usersPasswords = users.map(user => user.password);
            const login = document.getElementById('login').value;
            const password = document.getElementById('password').value;
            if(!usersLogins.includes(login)) {
                alert('Register to login!');
            } else {
                const index = usersLogins.findIndex(find_login => find_login === login);
                if(usersPasswords[index] !== password) {
                    alert('Incorrect password!');
                } else {
                    alert('Successfully login in!');
                    window.localStorage.setItem('isLogin', JSON.stringify(true));
                    window.location.href = '/homepage';
                }
            }
        }
    };

    render() {
    return (
        <div className={styles.form}>
            <label htmlFor='login'>Login:</label>
            <input id='login'/>
            <label htmlFor='login'>Password:</label>
            <input id='password'/>
            <button className='btn btn-primary' id='confirm-btn' onClick={this.login}>Login</button>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
};

export default connect(mapStateToProps)(LoginForm);
