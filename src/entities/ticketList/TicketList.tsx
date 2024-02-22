import styled from 'styled-components';
import Ticket from './components/ticket/Ticket';
import React from 'react';
import TicketSkeleton from './components/ticket/TicketSkeleton';
import { useAppSelector } from '../../shared/hooks/hooks';
import { useGetTicketsQuery } from './model/api/ticketsApi';
import { TicketProps } from './types/TicketsResponse';

const TicketListStyled = styled.ul`
  height: 700px;
  width: 70%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 25px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
`;

export function TicketList() {
  const { data, isLoading, isError } = useGetTicketsQuery();
  const transplantsFilter = useAppSelector((state) => state.filters.transplants);
  const startDateFilter = useAppSelector((state) => state.filters.startDate);

  if (isLoading) {
    return (
      <TicketListStyled>
        {Array.from({ length: 3 }).map((_, idx) => (
          <TicketSkeleton key={idx} />
        ))}
      </TicketListStyled>
    );
  }

  if (isError) {
    return (
      <TicketListStyled>
        Произошли технические ошибки на сервере. Попробуйте перезагрузить страницу.
      </TicketListStyled>
    );
  }

  const filterTickets = (ticket: TicketProps) => {
    if (!startDateFilter || startDateFilter === '') {
      if (!transplantsFilter || transplantsFilter.includes(-1)) {
        return true;
      }

      const stops = ticket.stops;
      if (transplantsFilter.includes(stops)) {
        return true;
      }
      return false;
    }

    const [day, month, year] = ticket.departure_date.split('.').map(Number);
    const ticketDepartureDate = new Date(2000 + year, month - 1, day);

    const [filterDay, filterMonth, filterYear] = startDateFilter.split('.').map(Number);
    const startDateFilterDate = new Date(2000 + filterYear, filterMonth - 1, filterDay);

    if (ticketDepartureDate.getTime() !== startDateFilterDate.getTime()) {
      return false;
    }

    if (!transplantsFilter || transplantsFilter.includes(-1)) {
      return true;
    }

    const stops = ticket.stops;
    if (transplantsFilter.includes(stops)) {
      return true;
    }
    return false;
  };

  return (
    <TicketListStyled>
      {data?.tickets
        ?.filter(filterTickets)
        .map((ticket) => <Ticket key={ticket.origin + ticket.destination} data={ticket} />)}
    </TicketListStyled>
  );
}

export default TicketList;
