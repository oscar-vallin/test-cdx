import { StyledCircle } from './CircleSchedule.style';

type CircleScheduleProps = {
  id: string;
  label: string;
  selected: boolean;
  onClick: () => void;
};

const CircleSchedule = ({
  id, label, selected, onClick,
}: CircleScheduleProps) => (
  <StyledCircle id={id} selected={selected} onClick={onClick}>
    {label}
  </StyledCircle>
);

export { CircleSchedule };
