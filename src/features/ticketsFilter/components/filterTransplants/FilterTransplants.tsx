import {FilterTitleStyled} from "../../TicketsFilter";
import styled from "styled-components";
import {ChangeEvent, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../shared/hooks/hooks";
import {setTransplants} from "../../../../entities/ticketList/model/slices/filterSlices";

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

export function FilterTransplants() {
    const filterStore = useAppSelector(state => state.filters.transplants)
    const [selected, setSelected] = useState<number[]>(filterStore || []);
    const dispatch = useAppDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const intValue = parseInt(value);

        let newSelection: number[];

        if (intValue === -1) {
            if (checked) {
                newSelection = [-1];
            } else {
                newSelection = selected.filter(item => item !== -1);
            }
        } else {
            if (checked) {
                newSelection = [...selected, intValue];
            } else {
                newSelection = selected.filter(item => item !== intValue);
            }
        }

        setSelected(newSelection);
        dispatch(setTransplants(newSelection));
    };


    const labels = {
        '-1': 'Все',
        '0': 'Без пересадок',
        '1': '1 пересадка',
        '2': '2 пересадки',
        '3': '3 пересадки'
    }

    return (
        <div>
            <FilterTitleStyled>
                Количество пересадок
            </FilterTitleStyled>

            {Object.entries(labels).map(([key, label]) => (
                <CheckboxContainer key={label}>
                    <CheckboxInput
                        type="checkbox"
                        id={label}
                        value={key}
                        onChange={handleChange}
                        checked={selected.includes(parseInt(key))}
                    />
                    <label htmlFor={label}>
                        {label}
                    </label>
                </CheckboxContainer>
            )).reverse()}
        </div>
    );
}

export default FilterTransplants;