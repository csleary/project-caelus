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
          <h3>Remember</h3>
          <ul className={style.list}>
            <li>&raquo; Mic.: Full frequency response required (~20kHz)</li>
            <li>
              &raquo; Recommended source test material:{' '}
              <a href="https://open.spotify.com/album/2amRP58tbPgA6aVJg8aMxj?si=utykSdpcS5yoWzCZCiApSA">
                Stream
              </a>{' '}
              or{' '}
              <a href="https://bandcamp.ochremusic.com/album/project-caelus">
                Lossless
              </a>
            </li>
            <li>&raquo; Direct signal path recommended</li>
            <li>&raquo; Avoid signal overload/distortion</li>
            <li>&raquo; Run array defrost cycle in cold weather</li>
            <li>&raquo; Empty ashtray at end of shift</li>
          </ul>
        </div>
      </>
    );
  }
}

export default App;
