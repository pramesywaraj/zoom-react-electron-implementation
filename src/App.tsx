import React, { useState } from 'react';
import { ipcRenderer } from 'electron';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../assets/icon.svg';
import './App.global.css';

const Hello = () => {
  const [meetingId, setMeetingId] = useState('');
  const [meetingPass, setMeetingPass] = useState('');

  const joinTheMeeting = () => {
    const opt = {
      meetingnum: meetingId,
      username: 'MAMAN RESING',
      psw: meetingPass,
    };

    ipcRenderer.send('JOIN_MEETING', opt);
  };

  const changeMeetingInput = (e) => {
    const { name, value } = e.target;
    if (name === 'MeetingID') {
      setMeetingId(value);
      return;
    }
    if (name === 'MeetingPass') {
      setMeetingPass(value);
    }
  };

  return (
    <div>
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <input
          name="MeetingID"
          value={meetingId}
          placeholder="Meeting ID"
          onChange={changeMeetingInput}
        />
        <input
          name="MeetingPass"
          value={meetingPass}
          placeholder="Meeting Password"
          onChange={changeMeetingInput}
        />
      </div>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <button type="button" onClick={joinTheMeeting}>
          <span role="img" aria-label="books">
            🙏
          </span>
          Join Meeting
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
