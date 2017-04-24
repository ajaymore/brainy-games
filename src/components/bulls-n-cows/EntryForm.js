import React from 'react';
import { Button, Input } from 'semantic-ui-react';

const EntryForm = ({ onInputChange, inputNumber, checkIfCorrect, digitsMap, trialMap, replayGame }) => {
    return (
        <div>
            <h3 style={{ textAlign: 'center', marginBottom: 20 }}>Guess a Number between 1000 to 9999!</h3>
            <form style={{ textAlign: 'center', marginBottom: 40 }}>
                <div>
                    <Input focus placeholder='Enter Number...' type="number" maxLength="4"
                        onChange={onInputChange} value={inputNumber} />
                    <Button onClick={checkIfCorrect} disabled={digitsMap.length !== 4}
                        style={{ marginLeft: 20 }}>Check!</Button>
                </div>
                <div style={{ margin: '20px 0px' }}>
                    <span style={{ marginRight: 20, fontSize: '1.28rem', fontWeight: 700 }}>Attempts: {trialMap.length}</span>
                    <Button basic color='blue' onClick={replayGame}>Replay!</Button>
                </div>
            </form>
        </div>
    );
};

export default EntryForm;