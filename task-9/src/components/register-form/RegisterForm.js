import React from 'react';
import styles from './RegisterForm.module.css';

class RegisterForm extends React.Component {
    register = () => {
      const login = document.getElementById('login').value;
      const password = document.getElementById('password').value;
      const confirmedPassword = document.getElementById('confirm-password').value;
      if(password !== confirmedPassword) {
          alert('Password and confirmed password are not equal');
          return;
      }
      if(!window.localStorage.getItem('users')) {
          window.localStorage.setItem('users', JSON.stringify( [{ login: '', password: ''}] ));
      }
      const users = JSON.parse(window.localStorage.getItem('users'));
      const usersLogins = users.map(user => user.login);
      if(usersLogins.includes(login)) {
          alert('This login has been already used');
          return;
      } else {
          users.push({login: login, password: password});
          window.localStorage.setItem('users', JSON.stringify(users));
          alert('Successfully registered!');
          window.location.href = '/login';
      }
    };

    render() {
    return (
        <div className={styles.form}>
            <label htmlFor='login'>Login:</label>
            <input id='login'/>
            <label htmlFor='password'>Password:</label>
            <input id='password'/>
            <label htmlFor='confirm-password'>Confirm password:</label>
            <input id='confirm-password'/>
            <button className='btn btn-primary' id='confirm-btn' onClick={this.register}>Register</button>
        </div>
    )
  }
}



export default  RegisterForm;
