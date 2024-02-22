import styled from 'styled-components';

import { FilterTitleStyled } from '../../TicketsFilter';
import { FilterButtonProps } from '../../types/FilterButtonProps';
import { useAppSelector } from '../../../../shared/hooks/hooks';
import { useCurrencyFilter } from '../../../../shared/hooks/useCurrencyFilter.hook';

const FilterWrapperStyled = styled.div`
  display: flex;
  overflow: hidden;
  border-radius: 5px;
  width: fit-content;
  border: 1px solid var(--color-light-grey);
`;
const FilterButtonStyled = styled.button<FilterButtonProps>`
  background-color: var(--color-white);
  padding: 10px 15px;
  outline: none;
  border: transparent 1px solid;
  transition: 0.2s ease-in;
  cursor: pointer;
  color: var(--color-dark-blue);

  &:hover {
    background-color: ${(props) => !props.active && 'var(--color-light-blue)'};
    border: ${(props) => !props.active && '1px solid var(--color-dark-blue)'};
  }

  ${(props) =>
    props.active &&
    `
    background-color: var(--color-dark-blue);
    color: var(--color-white);
  `}
`;

export function FilterCurrency() {
  const { changeCurrency } = useCurrencyFilter();
  const currentCurrency = useAppSelector((state) => state.filters.currency);

  return (
    <div>
      <FilterTitleStyled>Валюта</FilterTitleStyled>
      <FilterWrapperStyled>
        <FilterButtonStyled
          active={currentCurrency === 'RUB'}
          onClick={() => changeCurrency('RUB')}
        >
          RUB
        </FilterButtonStyled>
        <FilterButtonStyled
          active={currentCurrency === 'USD'}
          onClick={() => changeCurrency('USD')}
        >
          USD
        </FilterButtonStyled>
        <FilterButtonStyled
          active={currentCurrency === 'EUR'}
          onClick={() => changeCurrency('EUR')}
        >
          EUR
        </FilterButtonStyled>
      </FilterWrapperStyled>
    </div>
  );
}

export default FilterCurrency;
