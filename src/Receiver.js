import React, { Component, Fragment } from 'react';
import 'libfec';
import style from './Receiver.module.css';

class Receiver extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bootProgress: 0,
      bootStatus: '',
      droppedFrames: 0,
      error: '',
      isBootingUp: false,
      isOnline: false,
      isReceiving: false,
      numReceived: 0,
      profile: 'ultrasonic',
      transmission: '',
    };
  }

  componentDidMount() {
    window.Quiet.init({
      profilesPrefix: `${process.env.PUBLIC_URL}/`,
      memoryInitializerPrefix: `${process.env.PUBLIC_URL}/`,
      libfecPrefix: '/',
    });

    window.Quiet.addReadyCallback(this.onQuietReady, this.onQuietFail);

    const greeting = `
         ___ ___ ___ _______ ___ ____
        /  //  //  /  / /   /     /
       /__//__//  /  / /__ /     /
      /   /  |/__/|_/ /__ /___  /
         ___ ___ ___ /         ___
        /   /  //   /    /   //__
       /   /__//__ /    /   /   /
      /___/  //__ /___ /___/___/
    `;
    console.log(greeting);
  }

  onQuietReady = () => {
    window.Quiet.receiver({
      profile: this.state.profile,
      onReceive: this.onReceive,
      onCreateFail: this.onReceiverCreateFail,
      onReceiveFail: this.onReceiveFail,
    });
  };

  onQuietFail = reason => {
    this.setState({ error: `Equipment failure. ${reason}.` });
  };

  onReceive = payload => {
    const message = window.Quiet.ab2str(payload);
    this.setState({
      error: '',
      isReceiving: true,
      numReceived: this.state.numReceived + 1,
      transmission: this.state.transmission + message,
    });
  };

  onReceiverCreateFail = reason => {
    const createFail = `Interface failure. Reason: "${reason}". Are we able to use your microphone?`;
    this.setState({ isOnline: false, isReceiving: false, error: createFail });
  };

  onReceiveFail = numFails => {
    const receiveFail = `[FRAME DROPPED]`;
    this.setState({
      droppedFrames: numFails,
      error: receiveFail,
      transmission: this.state.transmission + '[???]',
    });
  };

  handleActivation = () => {
    window.Quiet.resume();
    this.setState({ isBootingUp: true });
    this.bootup(() => this.setState({ isBootingUp: false, isOnline: true }));
  };

  bootup = cb => {
    let i = 0;
    let bootStatus = 'Self integrity check…';
    const loop = () => {
      setTimeout(() => {
        if (i === 10) bootStatus = 'Effective clock rate: 75kHz.';
        if (i === 20)
          bootStatus = `Warning: Vacuum tube #${Math.floor(
            Math.random() * 60000
          )} damaged!`;
        if (i === 28) bootStatus = 'Warning: Light gun not detected.';
        if (i === 35) bootStatus = 'Establishing network connection…';
        if (i === 45)
          bootStatus = 'Establishing network connection… connected.';
        if (i === 48) bootStatus = 'Updating target data tracks…';
        if (i === 65) bootStatus = 'Updating target data tracks… complete.';
        if (i === 70) bootStatus = 'CCA operational.';
        if (i === 80) bootStatus = 'Starting interpreter…';
        if (i === 95) bootStatus = 'Ready lets go.';
        this.setState({
          bootProgress: i,
          bootStatus,
        });
        i++;
        if (i < 100) {
          loop();
        } else {
          cb();
        }
      }, Math.random() * 200);
    };
    loop();
  };

  render() {
    const {
      bootProgress,
      bootStatus,
      droppedFrames,
      error,
      isBootingUp,
      isOnline,
      numReceived,
      transmission,
    } = this.state;

    const signalQuality = Math.round(
      (numReceived / (numReceived + droppedFrames)) * 100
    );

    const header = (
      <p className={style.centre}>
        <span className={style.nowrap}>
          &#8473;&#8450; 2018&ndash;{new Date().getFullYear()}
          <br />
          {isOnline ? (
            <>&#9601;&#9603;&#9605; SAGE Online &#9605;&#9603;&#9601;</>
          ) : (
            'SAGE Offline'
          )}
        </span>
      </p>
    );

    if (isBootingUp) {
      return (
        <>
          {header}
          <p className={style.centre}>
            Initialising. Please stand by…
            <br />
            {bootProgress}%
          </p>
          <p>{bootStatus}</p>
        </>
      );
    }

    if (!isOnline) {
      return (
        <>
          {header}
          <button className={style.activate} onClick={this.handleActivation}>
            Activate?
          </button>
        </>
      );
    }

    const printTransmission = transmission
      .split('\n')
      .map((line, index, array) => {
        if (line.length) {
          return (
            <Fragment key={index}>
              {line}
              {index < array.length - 1 && <br />}
            </Fragment>
          );
        }
        return null;
      });

    return (
      <>
        {header}
        <p>
          Listening…{error && ' ' + error}
          <br />
          {!!signalQuality && `Signal quality: ${signalQuality}%`}
        </p>
        <p className={style.transmission}>
          {transmission.length > 0 && 'Log: '}
          {printTransmission}
          <span className={style.cursor}>_</span>
        </p>
        <p className={style.centre}>&#9776; Aura Materia &#9783;</p>
      </>
    );
  }
}

export default Receiver;
