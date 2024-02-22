import styled from 'styled-components';

import { FilterTitleStyled } from '../../TicketsFilter';
import useTransplantsFilter from '../../../../shared/hooks/useTransplantsFilter.hook';

const CheckboxContainer = styled.div`
  margin-bottom: 8px;

  label {
    cursor: pointer;
  }
`;

const CheckboxInput = styled.input`
  margin-right: 8px;
  appearance: none;
  outline: none;
  cursor: pointer;
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-light-grey);
  border-radius: 4px;
  position: relative;

  &:checked::after {
    content: '✓';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 14px;
    font-weight: bold;
    color: var(--color-dark-blue);
  }

  &:checked {
    background-color: var(--color-light-blue);
    border: 2px solid var(--color-dark-blue);
  }
`;

const labels = {
  '-1': 'Все',
  '0': 'Без пересадок',
  '1': '1 пересадка',
  '2': '2 пересадки',
  '3': '3 пересадки',
};

function FilterTransplants() {
  const { selected, handleChange } = useTransplantsFilter();

  return (
    <div>
      <FilterTitleStyled>Количество пересадок</FilterTitleStyled>
      {Object.entries(labels)
        .reverse()
        .map(([key, label]) => (
          <CheckboxContainer key={key}>
            <CheckboxInput
              type="checkbox"
              id={label}
              value={key}
              onChange={handleChange}
              checked={selected.includes(parseInt(key))}
            />
            <label htmlFor={label}>{label}</label>
          </CheckboxContainer>
        ))}
    </div>
  );
}

export default FilterTransplants;
