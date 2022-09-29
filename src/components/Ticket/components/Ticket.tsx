import React from 'react';

import TicketSegment from './TicketSegment';
import type { Ticket as TicketType } from '../../../store/types';

interface TicketProps extends TicketType {
  stop: boolean;
}

const Ticket: React.FC<TicketProps> = ({
  price, segments, carrier, stop,
}) => (
  <article className={`ticket ${!stop && 'stopItem'}`}>
    <header className="ticket__header">
      <strong>{`${price} Р`}</strong>
      <img alt="logo" src={`https://pics.avs.io/99/36/${carrier}.png`} />
    </header>
    {segments.map((segment) => (
      <TicketSegment
        key={segment.duration + segment.date}
        destination={segment.destination}
        date={segment.date}
        duration={segment.duration}
        origin={segment.origin}
        stops={segment.stops}
      />
    ))}
  </article>
);

export default Ticket;
