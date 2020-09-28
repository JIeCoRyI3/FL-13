import React from 'react';
import styles from './RegisterForm.module.css';
import {connect} from 'react-redux';
import {addUser} from "./actions";
import {withTranslation} from "../../hocs/withTranslation";

class RegisterForm extends React.Component {
    register = () => {
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        const confirmedPassword = document.getElementById('confirm-password').value;
        const usersNames = this.props.users.map((user) => user.name);
        if(password !== confirmedPassword) {
          alert(this.props.labels.passwordNotEqualMessage);
        } else if(usersNames.includes(login)) {
          alert(this.props.labels.loginMessage);
        } else {
            this.props.addUser( {
                id: Math.floor(Math.random()*100),
                name: login,
                password
            });
            alert(this.props.labels.registeredMessage);
        }
    };

    render() {
        const {labels} = this.props;
    return (
        <div className={styles.form}>
            <label htmlFor='login'>{labels.login}:</label>
            <input id='login'/>
            <label htmlFor='password'>{labels.password}:</label>
            <input id='password'/>
            <label htmlFor='confirm-password'>{labels.confirmPassword}:</label>
            <input id='confirm-password'/>
            <button className='btn btn-primary' id='confirm-btn' onClick={this.register}>{labels.register}</button>
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

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withTranslation(withStore(RegisterForm));
