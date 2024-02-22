import styled from 'styled-components';
import { ButtonTypes } from './buttonTypes/buttonTypes';
import { formatPrice } from '../../../../shared';
import { useAppSelector } from '../../../../shared/hooks/hooks';
import React from 'react';

const TicketButtonStyled = styled.button`
  color: var(--color-white);
  background: var(--color-orange);
  font-weight: 500;
  font-size: 16px;
  border: none;
  height: auto;
  padding: 10px 15px;
  min-width: 100%;
  border-radius: 8px;
`;

export function TicketButton({ price }: ButtonTypes) {
  const currentCurrency = useAppSelector((state) => state.filters.currency);
  const currencyRates = useAppSelector((state) => state.filters.currencyRates);

  const convertedPrice = price / currencyRates[currentCurrency];

  return (
    <TicketButtonStyled>
      Купить <br /> за {formatPrice(convertedPrice)} {currentCurrency}
    </TicketButtonStyled>
  );
}

export default React.memo(TicketButton);
