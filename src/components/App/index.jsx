import React, { Component } from 'react';
import Statistics from 'components/Statistics';
import { Section } from 'components/Section';
import { Notification } from 'components/Notifications';
import { Container } from './App.styled';
import { FeedbackOptions } from 'components/FeedbackOptions';
const INITIAL_STATE = {
  good: 0,
  neutral: 0,
  bad: 0,
};
const OPTIONS = ['good', 'neutral', 'bad'];
export class App extends Component {
  state = {
    ...INITIAL_STATE,
  };
  countTotalFeedback = () =>
    Object.values(this.state).reduce((total, i) => total + i, 0);
  countPositiveFeedbackPercentage = () => {
    const posititve = this.state.good;
    const total = this.countTotalFeedback();
    return ((posititve * 100) / total).toFixed(2) + '%';
  };
  handleLeaveFeedback = e => {
    const { name } = e.currentTarget;
    const currentState = this.state[name];
    this.setState({ [name]: currentState + 1 });
  };
  render() {
    return (
      <Container>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={OPTIONS}
            onLeaveFeedback={this.handleLeaveFeedback}
          />
        </Section>
        <Section title="Statistics">
          {this.countTotalFeedback() ? (
            <Statistics
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </Container>
    );
  }
}

// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}
//     >
//       React homework template
//     </div>
//   );
// };
// exp
