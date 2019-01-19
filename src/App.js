import React, { Component } from 'react';
import Receiver from './Receiver';
import Sage from './Sage';
import 'normalize.css/normalize.css';
import style from './App.module.css';

class App extends Component {
  render() {
    return (
      <>
        <Sage>
          <Receiver />
        </Sage>
        <div className={style.tips}>
          <h3>Operating Notes</h3>
          <ul className={style.list}>
            <li>&#9755; Mic.: Full frequency response required (>19kHz)</li>
            <li>
              &#9755; Recommended source test material:{' '}
              <a href="https://open.spotify.com/album/2amRP58tbPgA6aVJg8aMxj?si=utykSdpcS5yoWzCZCiApSA">
                Stream
              </a>{' '}
              or{' '}
              <a href="https://bandcamp.ochremusic.com/album/project-caelus">
                Lossless
              </a>
            </li>
            <li>&#9755; Direct signal path recommended</li>
            <li>&#9755; Avoid signal overload/distortion</li>
            <li>&#9755; Recommended interfaces: Chrome, Firefox.</li>
            <li>&#9755; Run array defrost cycle in cold weather</li>
            <li>&#9755; Empty ashtray at end of shift</li>
          </ul>
        </div>
      </>
    );
  }
}

export default App;
