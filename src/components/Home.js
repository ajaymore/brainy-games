import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';

const Home = () => {
    return (
        <div>
            <NavBar />
            <Container text textAlign={'center'}>
                <h2>Welcome to Brainy Games</h2>
            </Container>
        </div>
    )
};

export default Home;