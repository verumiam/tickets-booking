import React, {useState} from 'react';
import styled from 'styled-components';
import { FilterTitleStyled } from "../../TicketsFilter";
import {useAppDispatch} from "../../../../shared/hooks/hooks";
import {setStartDate} from "../../../../entities/ticketList/model/slices/filterSlices";
import {formatDateToShort} from "../../../../shared";

const DateInput = styled.input`
  padding: 8px 16px;
  font-size: 16px;
  border: 1px solid var(--color-light-grey);
  border-radius: 4px;
  cursor: text;
`;

const DateDisplay = styled.div`
  margin-top: 8px;
  font-size: 16px;
`;

const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const months = ['янв', 'фев', 'март', 'апр', 'мая', 'июн', 'июл', 'авг', 'сент', 'окт', 'нояб', 'дек'];

export function FilterStartDate() {
    const dispatch = useAppDispatch();

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const dateValue = event.target.value;
        const dateObj = new Date(dateValue);

        if (isNaN(dateObj.getTime())) {
            setSelectedDate(null);
            dispatch(setStartDate(null));
        } else {
            setSelectedDate(dateObj);
            let date = formatDateToShort(dateObj);
            dispatch(setStartDate(date));
        }
    };

    return (
        <div>
            <FilterTitleStyled>Дата отправления</FilterTitleStyled>
            <DateInput type="date" onChange={handleChange} value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''} />
            {selectedDate && (
                <DateDisplay>
                    Выбрано: {selectedDate.getDate()} {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}, {daysOfWeek[selectedDate.getDay()]}
                </DateDisplay>
            )}
        </div>
    );
}

export default FilterStartDate;
