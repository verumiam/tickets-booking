import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FilterTitleStyled } from '../../TicketsFilter';
import { useAppDispatch } from '../../../../shared/hooks/hooks';
import { setStartDate } from '../../../../entities/ticketList/model/slices/filterSlices';
import { formatDateToShort } from '../../../../shared';
import { getUrlParams } from '../../../../shared/helpers/getUrlParams';

const DateInput = styled.input`
  padding: 8px 16px;
  font-size: 16px;
  border: 1px solid var(--color-light-grey);
  border-radius: 4px;
  cursor: text;
  width: 178px;
`;

const DateDisplay = styled.div`
  margin-top: 8px;
  font-size: 16px;
`;

const ButtonClear = styled.button`
  outline: none;
  padding: 10px 30px;
  width: 178px;
  margin-top: 20px;
  background-color: var(--color-dark-blue);
  color: #ffff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const months = [
  'янв',
  'фев',
  'март',
  'апр',
  'мая',
  'июн',
  'июл',
  'авг',
  'сент',
  'окт',
  'нояб',
  'дек',
];

export function FilterStartDate() {
  const dispatch = useAppDispatch();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const clearDate = () => {
    const URLparams = getUrlParams();
    setSelectedDate(null);
    URLparams.delete('date');
    dispatch(setStartDate(null));

    const newUrl = new URL(window.location.href);
    newUrl.search = URLparams.toString();
    window.history.pushState({}, '', newUrl.toString());
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = event.target.value;
    const dateObj = new Date(dateValue);
    const URLparams = getUrlParams();

    if (isNaN(dateObj.getTime())) {
      clearDate();
    } else {
      setSelectedDate(dateObj);
      let date = formatDateToShort(dateObj);
      URLparams.set('date', date);
      dispatch(setStartDate(date));
    }

    const newUrl = new URL(window.location.href);
    newUrl.search = URLparams.toString();
    window.history.pushState({}, '', newUrl.toString());
  };

  useEffect(() => {
    const handleChangeDate = () => {
      const URLparams = getUrlParams();
      const newStartDate = URLparams.get('date');
      if (newStartDate) {
        const [day, month, year] = newStartDate.split('.');
        const dateObj = new Date(`20${year}-${month}-${day}`);
        setSelectedDate(dateObj);
        dispatch(setStartDate(newStartDate));
      } else {
        setSelectedDate(null);
        dispatch(setStartDate(null));
      }
    };

    handleChangeDate();

    window.addEventListener('popstate', handleChangeDate);

    return () => {
      window.removeEventListener('popstate', handleChangeDate);
    };
  }, []);

  return (
    <div>
      <FilterTitleStyled>Дата отправления</FilterTitleStyled>
      <DateInput
        type="date"
        onChange={handleChange}
        value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
      />
      {selectedDate && (
        <>
          <DateDisplay>
            Выбрано: {selectedDate.getDate()} {months[selectedDate.getMonth()]}{' '}
            {selectedDate.getFullYear()}, {daysOfWeek[selectedDate.getDay()]}
          </DateDisplay>
          <ButtonClear onClick={clearDate}>Очистить дату</ButtonClear>
        </>
      )}
    </div>
  );
}

export default FilterStartDate;
