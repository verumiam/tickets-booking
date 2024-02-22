import styled from 'styled-components';
import {
  TicketGridStyled,
  TicketInfoWrapperStyled,
  TicketLineStyled,
  TicketStyled,
} from './Ticket';
import { SkeletonBoxProps } from '../../types/SkeletonBoxProps';

const SkeletonWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  border-right: 1px solid var(--color-light-grey);
`;

const SkeletonBox = styled.div<SkeletonBoxProps>`
  background: linear-gradient(-90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 400% 100%;
  min-width: 100%;
  height: 60px;
  animation: loading 1.5s infinite;

  ${(props) =>
    props.big &&
    `
        min-width: 140px;
        height: 90px;
  `};

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const TicketInfoSkeletonStyled = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: flex-start;
`;

export function TicketSkeleton() {
  return (
    <TicketStyled>
      <TicketGridStyled>
        <SkeletonWrapper>
          <SkeletonBox />
          <SkeletonBox />
        </SkeletonWrapper>
        <TicketInfoSkeletonStyled>
          <TicketInfoWrapperStyled>
            <SkeletonBox big />
          </TicketInfoWrapperStyled>
          <TicketLineStyled />
          <TicketInfoWrapperStyled>
            <SkeletonBox big />
          </TicketInfoWrapperStyled>
        </TicketInfoSkeletonStyled>
      </TicketGridStyled>
    </TicketStyled>
  );
}

export default TicketSkeleton;
