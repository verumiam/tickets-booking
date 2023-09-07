import styled from "styled-components";
import Ticket from "./components/ticket/Ticket";
import {useGetTicketsQuery} from "./model/api/ticketsApi";
import {useAppSelector} from "../../shared/hooks/hooks";
import React, {useMemo} from "react";
import TicketSkeleton from "./components/ticket/TicketSkeleton";
import {TicketProps} from "./types/TicketsResponse";

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
`

export function TicketList() {
    const {data, isLoading, isError} = useGetTicketsQuery();
    const startDate = useAppSelector(state => state.filters.startDate);
    const transplants = useAppSelector(state => state.filters.transplants);

    const getTransplantLabel = (stops: number) => {
        switch (stops) {
            case 0:
                return 'Без пересадок';
            case 1:
                return '1 пересадка';
            case 2:
                return '2 пересадки';
            case 3:
                return '3 пересадки';
            default:
                return `${stops} пересадок`;
        }
    }

    const filteredTickets = data?.tickets.filter((ticket: TicketProps) => {
        let validDate = startDate ? ticket.departure_date === startDate : true;
        let validTransplants = transplants.includes(-1) || transplants.includes(ticket.stops);

        return validDate && validTransplants;
    });

    if (isLoading) {
        return (
            <TicketListStyled>
                {Array.from({length: 3}).map((_, idx) => <TicketSkeleton key={idx}/>)}
            </TicketListStyled>
        )
    }

    if (isError) {
        return <TicketListStyled>
            Произошли технические ошибки на сервере. Попробуйте перезагрузить страницу.
        </TicketListStyled>
    }

    if (filteredTickets?.length === 0) {
        return (
            <TicketListStyled>
                К сожалению, но на данный момент билеты с такими параметрами - отсутствуют.
            </TicketListStyled>
        )
    }

    return (
        <TicketListStyled>
            {filteredTickets?.map((ticket) => (
                <Ticket key={ticket.origin + ticket.destination} data={ticket}/>
            ))}
        </TicketListStyled>
    );
}

export default TicketList;