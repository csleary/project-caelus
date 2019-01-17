import React, { Component, Fragment } from 'react';
import 'libfec';
import style from './Receiver.module.css';

class Receiver extends Component {
  constructor(props) {
    super(props);

    this.state = {
      droppedFrames: 0,
      error: '',
      isOnline: true,
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
    this.setState({ isOnline: true });
  };

  render() {
    const {
      droppedFrames,
      error,
      isOnline,
      numReceived,
      transmission,
    } = this.state;
    const signalQuality = Math.round(
      (numReceived / (numReceived + droppedFrames)) * 100
    );
    const status = isOnline ? (
      <>
        {`Listening…${error && ' ' + error}`}
        <br />
        {!!signalQuality && `Signal quality: ${signalQuality}%`}
      </>
    ) : (
      <button className={style.activate} onClick={this.handleActivation}>
        Activate?
      </button>
    );

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
        <p style={{ textAlign: 'center' }}>
          {isOnline ? '--==[SAGE Online]==--' : 'SAGE Offline'}
        </p>
        <p>{status}</p>
        {isOnline && (
          <p>
            {transmission.length > 0 && 'Log: '}
            {printTransmission}
            <span className={style.cursor}>_</span>
          </p>
        )}
      </>
    );
  }
}

export default Receiver;
