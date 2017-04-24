var alt = require('../alt');
var AuthActions = require('../actions/auth-actions');

class AuthStore {
    constructor() {
        this.user = null;
        this.appInitializing = false;

        this.bindListeners({
            loginUser: AuthActions.LOGIN_USER,
            logoutAction: AuthActions.LOGOUT_ACTION,
            appInit: AuthActions.APP_INIT
        });
    }

    appInit() {
        this.appInitializing = true;
    }

    loginUser(user) {
        this.appInitializing = false;
        this.user = user;
    }

    logoutAction() {
        this.appInitializing = false;
        this.user = null;
    }
}

module.exports = alt.createStore(AuthStore, 'AuthStore');