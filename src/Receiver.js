import React, { Component } from 'react';
import style from './Receiver.module.css';

class Receiver extends Component {
  state = {
    isOnline: false,
    isReceiving: false,
  };

  handleActivation = () => {
    this.setState({ isOnline: true });
  };

  render() {
    const { isOnline } = this.state;
    const status = isOnline ? (
      'Listening…'
    ) : (
      <button className={style.activate} onClick={this.handleActivation}>
        Activate?
      </button>
    );

    return (
      <>
        <p style={{ textAlign: 'center' }}>
          --==[SAGE {isOnline ? 'Online' : 'Offline'}]==--
        </p>
        <p>{status}</p>
        {isOnline && <span className={style.cursor}>_</span>}
      </>
    );
  }
}

export default Receiver;
