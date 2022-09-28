import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchTicket,
  selectDisplayTickets,
  selectIsLoadingTickets,
  selectStop,
} from '../../store/slices/ticketSlice';
import Ticket from './components/Ticket';
import TicketLoading from './components/TicketLoading';

const Tickets = () => {
  const dispatch = useAppDispatch();
  const tickets = useAppSelector(selectDisplayTickets);
  const stopItems = useAppSelector(selectStop);
  const isLoading = useAppSelector(selectIsLoadingTickets);
  React.useEffect(() => {
    dispatch(fetchTicket());
  }, [dispatch]);

  return (
    <div>
      {isLoading
        && Array(5)
          .fill(null)
          .map(() => <TicketLoading key={Math.random()} />)}
      {!isLoading
        && tickets.map((ticket) => (
          <Ticket
            key={ticket.price + ticket.segments[0].duration + ticket.segments[1].duration}
            segments={ticket.segments}
            carrier={ticket.carrier}
            price={ticket.price}
            stopSkeleton={stopItems}
          />
        ))}
    </div>
  );
};

export default Tickets;
