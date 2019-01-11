import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';

import TopicList from '../views/topic-list/index';
import TopicDetail from '../views/topic-detail/index';
// 返回一个pure function
// 返回一个数组
export default () => [
  <Route
    path="/"
    render={() => <Redirect to="list" />}
    exact
  />,
  <Route path="/list" component={TopicList} exact />,
  <Route path="/detail" component={TopicDetail} exact />,
];
