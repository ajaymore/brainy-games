import React from 'react';
import { Menu } from 'semantic-ui-react';
import AuthActions from '../actions/auth-actions';
import {
    Link,
    withRouter
} from 'react-router-dom';


const NavBar = withRouter(({ history }) => {
    const pathname = history.location.pathname;
    return (
        <Menu stackable>
            <Menu.Item name='home' active={pathname === '/'}>
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item name='bulls-n-cows' active={pathname === '/bulls-n-cows'}>
                <Link to="/bulls-n-cows">Bulls N Cows</Link>
            </Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item name='logout' onClick={() => {
                    AuthActions.logoutAction(() => history.push(pathname))
                }} />
            </Menu.Menu>
        </Menu>
    )
});

export default NavBar;