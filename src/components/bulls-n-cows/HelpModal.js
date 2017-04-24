import React from 'react';
import { Modal, Header, Button } from 'semantic-ui-react';

const HelpModal = () => {
    return (
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <Modal trigger={<Button>Instructions!</Button>} closeIcon='close'>
                <Modal.Header>How to play?</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Header>Instructions</Header>
                        <div>
                            <ul>
                                <li>The computer selects a random number between 1000 and 9999. Your aim is to guess that number in the least number of steps.</li>
                                <li>Enter a number between and including 1000 and 9999.</li>
                                <li>The computer verifies the number and displays the result in terms of bulls and cows.</li>
                                <li>A <strong>Bull</strong> indicates that the digit in your number and the computer's number are in the correct position.</li>
                                <li>A <strong>Cow</strong> indicates that the digit is present in the number, but is not in the right position.</li>
                                <li>You Goal is to get <strong>4 Bulls</strong> to guess the number correctly.</li>
                            </ul>
                            <p>Courtsey: <a href="http://buzypi.in/project/bullsncows/index.html">jnaapti</a></p>
                        </div>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        </div>
    );
};

export default HelpModal;