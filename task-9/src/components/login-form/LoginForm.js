import React from 'react';
import styles from './LoginForm.module.css';

class LoginForm extends React.Component {
    login = () => {
        const users = JSON.parse(localStorage.getItem('users'));
        const usersLogins = users.map(user => user.login);
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
                localStorage.setItem('isLogin', '1');
                window.location.href = '/homepage';
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
            <button id='confirm-btn' onClick={this.login}>Login</button>
        </div>
    )
  }
}



export default  LoginForm;
