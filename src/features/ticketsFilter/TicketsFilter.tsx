import styled from 'styled-components';
import FilterCurrency from './components/filterCurrency/FilterCurrency';
import FilterTransplants from './components/filterTransplants/FilterTransplants';
import FilterStartDate from './components/filterStartDate/filterStartDate';
import React from 'react';

const TicketsFilterStyled = styled.div`
  background-color: var(--color-white);
  min-height: auto;
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

export const FilterTitleStyled = styled.h5`
  color: var(--color-black);
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: 500;
  line-height: 34px;
  text-transform: uppercase;
`;

export function TicketsFilter() {
  return (
    <TicketsFilterStyled>
      <FilterCurrency />
      <FilterTransplants />
      <FilterStartDate />
    </TicketsFilterStyled>
  );
}

export default React.memo(TicketsFilter);
