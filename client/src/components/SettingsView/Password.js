import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import * as firebase from 'firebase';
import requireAuth from '../../requireAuth';


const PasswordView = props => {
    const [currentPassword, setcurrentPassword] = useState('')
    const [newPassword, setPassword] = useState('');
    const [email, setEmail] = useState(props.user.email);

    const reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(email, currentPassword);
        return user.reauthenticateWithCredential(cred)
    }

    const changePassword = () => {
        reauthenticate(currentPassword).then(() => {
            var user = firebase.auth().currentUser;
            user.updatePassword(newPassword).then(() => {
                alert('Password was changed');
            }).catch((error) => {
                alert(error.message);
            })
        }).catch((error) => {
            alert(error.message);
        })
    }


return (
    <div>
        <form onSubmit={() => changePassword()}>
            <input 
                type='password'
                value={currentPassword}
                placeholder='Current Password'
                autoCapitalize='none'
                onChange={(e) => setcurrentPassword(e.target.value)}
            />
            <input
                type='password'
                value={newPassword}
                placeholder='New Password'
                autoCapitalize='none'
                onChange={(e) => setPassword(e.target.value)}
            />
            <button title='Change Password'>Update Info</button>
        </form>
    </div>
    )
}


export default requireAuth(PasswordView)