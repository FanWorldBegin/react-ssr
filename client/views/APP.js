import React from 'react';
import { hot } from 'react-hot-loader'; //eslint-disable-line
import { BrowserRouter, Link } from 'react-router-dom';
import Route from '../config/router';

class App extends React.Component {
  componentDidMount() {
    // do sth

  }

  // 可以直接返回数组，避免无意义div
  render() {
    return (
      <BrowserRouter>
        <div>
          <Link to="/">首页</Link>
          <br />
          <Link to="/detail">详情页</Link>
          <Route />
        </div>
      </BrowserRouter>
    );
  }
}

export default hot(module)(App);
