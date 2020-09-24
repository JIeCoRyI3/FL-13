import React from 'react';
import styles from './RegisterForm.module.css';
import {connect} from 'react-redux';
import {addUser} from "./actions";
import store from "../app/store";

class RegisterForm extends React.Component {
    register = () => {
        console.log(store.getState());
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        const confirmedPassword = document.getElementById('confirm-password').value;
        const usersNames = this.props.users.map((user) => user.name);
        if(password !== confirmedPassword) {
          alert('Password and confirmed password are not equal');
        } else if(usersNames.includes(login)) {
          alert('This login has been already used');
        } else {
            this.props.addUser( {
                id: Math.floor(Math.random()*100),
                name: login,
                password
            });
            alert('Successfully registered!');
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

const mapDispatchToProps = {
    addUser
};

const mapStateToProps = (state) => ({
    users: state.users
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
