import TicketButton from "../ticketButton/TicketButton";
import styled from "styled-components";
import TurkeyLogo from '../../assets/Turkish_Airlines_logo.png';
import AirPlane from '../../assets/airplane-icon.svg'
import {ITicketProps} from "../../types/ITicketProps";


export const TicketStyled = styled.li`
  background-color: var(--color-white);
  min-height: auto;
  height: 180px;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`

const TicketPriceStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: center;
  align-items: center;
  border-right: 1px solid var(--color-light-grey);
`

const TicketLogoStyled = styled.img`
  width: 150px;
  height: auto;
`

const TicketInfoStyled = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  gap: 20px; 
  align-items: baseline;
`

export const TicketGridStyled = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: minmax(200px, 1fr) 3fr; 
`;

const TicketDateStyled = styled.div`
  font-weight: 300;
  font-size: 36px;
`

const TicketPlaceStyled = styled.div`
  font-weight: 400;
  font-size: 16px;
  white-space: nowrap;
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  gap: 8px;
`

const TicketFullDateStyled = styled.div`
  font-size: 14px;
  font-weight: 300;
`

export const TicketInfoWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
`

export const TicketLineStyled = styled.div`
  position: relative;
  height: 1px; 
  background-color: var(--color-light-grey); 
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  text-align: center;
  font-size: 12px;
  text-transform: uppercase;
  line-height: 24px;
  color: var(--color-light-grey);
  margin: 10px 0; 

  &::after {
    content: "";
    position: absolute;
    right: 0;
    color: var(--color-light-grey);
    top: 50%;
    transform: translateY(-50%);  
    width: 16px; 
    height: 16px;
    background-image: url(${AirPlane});
    background-size: contain;
    background-repeat: no-repeat;
  }
`

const Ticket: React.FC<ITicketProps> = ({ data }) => {

    return (
        <TicketStyled>
            <TicketGridStyled>
                <TicketPriceStyled>
                    <TicketLogoStyled src={TurkeyLogo} alt="TURKISH AIRLINES"/>
                    <TicketButton price={data?.price}/>
                </TicketPriceStyled>
                <TicketInfoStyled>
                    <TicketInfoWrapperStyled>
                        <TicketDateStyled>
                            {data?.departure_time}
                        </TicketDateStyled>
                        <TicketPlaceStyled>
                            {data?.destination}, {data?.origin_name}
                            <TicketFullDateStyled>
                                {data?.departure_date}
                            </TicketFullDateStyled>
                        </TicketPlaceStyled>
                    </TicketInfoWrapperStyled>
                    <TicketLineStyled>
                        {data?.stops} пересадка
                    </TicketLineStyled>
                    <TicketInfoWrapperStyled>
                        <TicketDateStyled>
                            {data?.arrival_time}
                        </TicketDateStyled>
                        <TicketPlaceStyled>
                            {data?.destination_name}, {data?.carrier}
                            <TicketFullDateStyled>
                                {data?.arrival_date}
                            </TicketFullDateStyled>
                        </TicketPlaceStyled>
                    </TicketInfoWrapperStyled>
                </TicketInfoStyled>
            </TicketGridStyled>
        </TicketStyled>
    );
}

export default Ticket;
