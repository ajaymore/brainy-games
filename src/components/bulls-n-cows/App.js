import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import * as firebase from 'firebase';
import NavBar from '../NavBar';
import HelpModal from './HelpModal';
import ResultModal from './ResultModal';
import EntryForm from './EntryForm';
import TrialTable from './TrialTable';
import AuthStore from '../../store/auth-store';
import Archive from './Archive';

class BullsNCows extends Component {

  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.checkIfCorrect = this.checkIfCorrect.bind(this);
    this.replayGame = this.replayGame.bind(this);
    this.resultModalClose = this.resultModalClose.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.state = {
      inputNumber: '',
      digitsMap: [],
      randomNum: Math.floor(1000 + Math.random() * 9000),
      trialMap: [],
      resultModalOpen: false,
      uid: AuthStore.getState().user.uid,
      archive: [],
      archiveIndex: 0,
      perPageItemCount: 5
    }
  }

  componentDidMount() {
    firebase.database().ref('bulls-n-cows/' + this.state.uid + '/current-game/').once('value').then((snap) => {
      if (snap.val()) {
        this.setState(snap.val());
      }
    });
    firebase.database().ref('bulls-n-cows/' + this.state.uid + '/archive/').on('child_added', (data) => {
      this.setState({ archive: [...this.state.archive, data.val()] });
    });
  }

  replayGame(e) {
    e.preventDefault();
    this.setState({
      resultModalOpen: true,
      result: `The number to be guessed was ${this.state.randomNum}, Now try guessing a new number!`,
      inputNumber: '',
      digitsMap: [],
      randomNum: Math.floor(1000 + Math.random() * 9000),
      trialMap: []
    }, () => {
      firebase.database().ref('bulls-n-cows/' + this.state.uid + '/current-game/').set(null);
    })
  }

  onInputChange(e) {
    e.preventDefault();
    let input = e.target.value;
    if (isNaN(input) || input.toString().length > 4) {
      return;
    }
    input = Math.abs(e.target.value);
    const digitsMap = input.toString().split('').map((num, index) => {
      return { index, num };
    });
    this.setState({ inputNumber: input, digitsMap });
  }

  checkIfCorrect(e) {
    e.preventDefault();
    const { randomNum, inputNumber, digitsMap, trialMap } = this.state;
    if (randomNum === inputNumber) {
      const archiveInfo = {
        completionDate: JSON.stringify(new Date()),
        randomNum,
        trialMap: [...trialMap, { bulls: 4, cows: 0, inputNumber }]
      }
      const newAppState = {
        resultModalOpen: true,
        result: `Congratulations you guessed the number ${inputNumber} after ${trialMap.length + 1} attempts!`,
        inputNumber: '',
        digitsMap: [],
        randomNum: Math.floor(1000 + Math.random() * 9000),
        trialMap: []
      };
      this.setState(newAppState, () => {
        const uid = this.state.uid;
        firebase.database().ref('bulls-n-cows/' + uid + '/archive/').push(archiveInfo);
        firebase.database().ref('bulls-n-cows/' + uid + '/current-game/').set(newAppState);
      });
      return;
    }
    const randomNumMap = randomNum.toString().split('').map((num, index) => {
      return { index, num, bullMatch: false, cowMatch: false };
    });
    let bulls = 0, cows = 0;
    for (let digitIndex in digitsMap) {
      const digitEntry = digitsMap[digitIndex];
      if (digitEntry.num === randomNumMap[digitIndex].num) {
        bulls++;
        randomNumMap[digitIndex].bullMatch = true;
      }
    }
    for (let digitIndex in digitsMap) {
      const digitEntry = digitsMap[digitIndex];
      if (randomNumMap[digitIndex].bullMatch) {
        continue;
      } else {
        for (let randomIndex in randomNumMap) {
          const randomDigit = randomNumMap[randomIndex];
          if (randomDigit.cowMatch === true || randomDigit.bullMatch) {
            continue;
          } else if (randomDigit.num === digitEntry.num) {
            cows++;
            randomNumMap[randomIndex].cowMatch = true;
            break;
          }
        }
      }
    }

    const newAppState = {
      ...this.state,
      inputNumber: '',
      trialMap: [...trialMap, { bulls, cows, inputNumber }],
      digitsMap: []
    };

    this.setState(newAppState, () => {
      const uid = this.state.uid;
      delete newAppState.archive;
      firebase.database().ref('bulls-n-cows/' + uid + '/current-game/').set(newAppState);
    });
  }

  resultModalClose() {
    this.setState({ resultModalOpen: false, result: '' });
  }

  handlePageClick(data) {
    this.setState({ archiveIndex: data.selected });
  }

  render() {
    const { trialMap, resultModalOpen, result, inputNumber, digitsMap, archive, archiveIndex, perPageItemCount } = this.state;
    return (
      <div>
        <NavBar />
        <Header as='h1' style={{ margin: 50, textAlign: 'center' }}>Cows N Bulls</Header>
        <HelpModal />
        <ResultModal
          resultModalOpen={resultModalOpen}
          resultModalClose={this.resultModalClose}
          result={result} />
        <EntryForm
          onInputChange={this.onInputChange}
          inputNumber={inputNumber}
          checkIfCorrect={this.checkIfCorrect}
          digitsMap={digitsMap}
          trialMap={trialMap}
          replayGame={this.replayGame} />
        <TrialTable trialMap={trialMap} />
        <Archive
          archive={archive}
          archiveIndex={archiveIndex}
          perPageItemCount={perPageItemCount}
          handlePageClick={this.handlePageClick} />
      </div>
    );
  }
}

export default BullsNCows;