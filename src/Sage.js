import React, { Component } from 'react';
import style from './Sage.module.css';

class Sage extends Component {
  render(props) {
    return (
      <div className={style.frame}>
        <div className={style.screen}>{this.props.children}</div>
        <div className={style.scanlines} />
        <div className={style.shadow} />
        <div className={style.glow} />
      </div>
    );
  }
}

export default Sage;
