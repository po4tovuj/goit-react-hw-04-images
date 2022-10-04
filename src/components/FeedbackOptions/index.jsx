import { Button } from './FeedbackOptions.styled';

export const FeedbackOptions = ({ options, onLeaveFeedback }) => {
  return (
    <>
      {options.map(option => (
        <Button key={option} name={option} onClick={onLeaveFeedback}>
          {option}
        </Button>
      ))}
    </>
  );
};
