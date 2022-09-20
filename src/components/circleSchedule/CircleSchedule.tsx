import { StyledCircle } from './CircleSchedule.style';

type CircleScheduleProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
  key: number;
};

const CircleSchedule = ({
  label, selected, onClick, key,
}: CircleScheduleProps) => (
  <StyledCircle selected={selected} onClick={onClick} key={key}>
    {label}
  </StyledCircle>
);

export { CircleSchedule };
