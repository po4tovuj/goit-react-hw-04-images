import { Component } from 'react';

import { Container } from './App.styled';
const INITIAL_STATE = {
  images: [],
};
export class App extends Component {
  state = {
    ...INITIAL_STATE,
  };

  handleLeaveFeedback = e => {
    const { name } = e.currentTarget;
    this.setState(state => ({ [name]: state[name] + 1 }));
  };
  render() {
    return <Container></Container>;
  }
}
