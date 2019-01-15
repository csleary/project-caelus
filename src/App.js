import React, { Component } from 'react';
import Receiver from './Receiver';
import Sage from './Sage';
import 'normalize.css/normalize.css';
import style from './App.module.css';

class App extends Component {
  render() {
    return (
      <div className={style.panel}>
        <Sage>
          <Receiver />
        </Sage>
        <Sage />
      </div>
    );
  }
}

export default App;
