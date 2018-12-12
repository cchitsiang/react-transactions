import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IceContainer from '@icedesign/container';
import './NotFound.scss';

export default class NotFound extends Component {
  static displayName = 'NotFound';

  render() {
    return (
      <div className="basic-not-found">
        <IceContainer>
          <div style={styles.exceptionContent} className="exception-content">
            <img
              src="https://img.alicdn.com/tfs/TB1txw7bNrI8KJjy0FpXXb5hVXa-260-260.png"
              style={styles.image}
              className="imgException"
              alt="404"
            />
            <div className="prompt">
              <h3 style={styles.title} className="title">
              Sorry, page not found
              </h3>
              <p style={styles.description} className="description">
              Page not found，please navigate to <Link to="/">Home</Link> to continue
              </p>
            </div>
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  exceptionContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#333',
  },
  description: {
    color: '#666',
  },
};
