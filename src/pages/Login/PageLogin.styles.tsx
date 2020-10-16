import styled from 'styled-components';
import { Text } from '../../components/typography/Text';

export const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 400px;
  width: 460px;

  background: #ffffff;

  box-shadow: 0px 4.8px 14.4px rgba(0, 0, 0, 0.18), 0px 25.6px 57.6px rgba(0, 0, 0, 0.22);

  padding: 20px;
`;

export const Description = styled(Text)`
  height: 15%;
  max-height: 50px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Row = styled.div`
  height: 22%;
  max-height: 70px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RowInput = styled(Row)`
  width: 70%;
`;

export const RowButton = styled(Row)`
  flex-direction: column;
  justify-content: flex-start;
`;

export const RowUsername = styled(Row)`
  flex-direction: column;
  justify-content: space-around;
`;

export const RowForgot = styled(Row)`
  width: 70%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
`;

export const RowBack = styled(Row)`
  position: absolute;
  top: 0;
  align-items: center;
  width: 90%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-transform: uppercase;
`;

export const TextIcon = styled(Text)`
  font-size: 20px;
  font-weight: 800;
`;

export const TextBack = styled(Text)`
  font-size: 16px;
  text-transform: uppercase;
`;

export const LinkText = styled(Text)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-decoration: underline;
  color: #201f1e;
`;

export const Username = styled(Description)`
  font-size: 18px;
  font-weight: 800;
`;
