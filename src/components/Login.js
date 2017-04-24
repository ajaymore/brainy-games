import React from 'react';
import AuthActions from '../actions/auth-actions';
import { Button, Icon, Grid, Card, Dimmer, Loader } from 'semantic-ui-react';
import {
    Redirect
} from 'react-router-dom';
import AuthStore from '../store/auth-store';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        const authState = AuthStore.getState();
        this.state = {
            redirectToReferrer: false,
            user: authState.user,
            initializing: true
        }
        this.onChange = this.onChange.bind(this);
    }

    login = () => {
        AuthActions.loginAction();
    }

    componentDidMount() {
        AuthStore.listen(this.onChange);
    }

    onChange(state) {
        this.setState({ initializing: state.initializing });
        if (state.user) {
            this.setState({ redirectToReferrer: true });
        }
    }

    componentWillUnmount() {
        AuthStore.unlisten(this.onChange);
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer, initializing } = this.state
        const visibleView =
            initializing ? (<div>
                <Dimmer active inverted>
                    <Loader size='large'>App initializing ...</Loader>
                </Dimmer>
            </div>) : (<Grid centered container>
                <Grid.Column mobile={14} tablet={8} computer={4}>
                    <Card style={{ marginTop: 100 }}>
                        <Card.Content>
                            <Card.Header>Login to App</Card.Header>
                            <Card.Description>
                                <Button color='google plus' onClick={this.login}><Icon name='google plus' />Google Plus</Button>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </Grid>)

        if (redirectToReferrer) {
            return (
                <Redirect to={from} />
            )
        }

        return visibleView;
    }
}