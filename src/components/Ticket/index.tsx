import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchTicket, moreItems,
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

  const moreLoadClick = () => {
    dispatch(moreItems());
  };
  return (
    <div className="tickets">
      {isLoading
        && Array(5)
          .fill(null)
          .map(() => <TicketLoading key={Math.random()} />)}
      {!isLoading && !stopItems && <div className="loader-line" />}
      {!isLoading
        && tickets.map((ticket) => (
          <Ticket
            key={ticket.id}
            segments={ticket.segments}
            carrier={ticket.carrier}
            price={ticket.price}
            stop={stopItems}
          />
        ))}
      {!isLoading && tickets.length === 0 && (
      <div className="not-found">Ничего не было найденно :(</div>
      )}
      {tickets.length >= 5 && (
      <button className="button" onClick={moreLoadClick} type="button">
        Показать еще 5 билетов!
      </button>
      )}

    </div>
  );
};

export default Tickets;
