var alt = require('../alt');
import * as firebase from 'firebase';
const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/plus.login');

class AuthActions {

    loginAction() {
        firebase.auth().signInWithPopup(provider).then((result) => { }).catch((error) => {
            console.log(error);
            this.logoutAction(() => { });
        });
        return true;
    }

    logoutAction(cb) {
        firebase.auth().signOut();
        cb();
        return true;
    }

    loginUser(user) {
        return user;
    }

    appInit() {
        return true;
    }

    initialize() {
        this.appInit();
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const userData = {
                    photoUrl: user.photoURL,
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email
                };
                firebase.database().ref('users/' + user.uid)
                    .set(userData)
                    .then(() => {
                    });
                this.loginUser(userData);
            } else {
                this.logoutAction(() => { });
            }
        });
        return true
    }
}

module.exports = alt.createActions(AuthActions);