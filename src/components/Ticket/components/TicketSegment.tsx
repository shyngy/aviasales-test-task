import React from 'react';
import { format } from 'date-fns';
import type { Segment } from '../../../store/types';
import { stopsLength } from '../../../store/utils';

const TicketSegment: React.FC<Segment> = ({
  origin,
  destination,
  date,
  stops,
  duration,
}) => {
  React.useEffect(() => {

  }, []);
  const originDate = new Date(date);

  const startDate = format(originDate, 'HH:mm');
  const endDate = format(new Date(originDate.getTime() + (duration * 60 * 1000)), 'HH:mm');

  const onWay = `${Math.floor(duration / 60)}ч ${duration % 60}м`;
  return (
    <section className="info">
      <div className="info__item">
        <h3>{`${origin} - ${destination}`}</h3>
        <time>
          {`${startDate} - ${endDate}`}
        </time>
      </div>
      <div className="info__item">
        <h3>В пути</h3>
        <time>{onWay}</time>
      </div>
      <div className="info__item">
        <h3>{stopsLength[stops.length]}</h3>
        <time>{stops.map((item, index) => (index === 0 ? item : `, ${item}`))}</time>
      </div>
    </section>
  );
};

export default TicketSegment;
