import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectTransferCheckboxes, setTransferCheckboxes } from '../../store/slices/transferSlice';
import Filter from './Filter';
import { rootSort, selectTicketsLength } from '../../store/slices/ticketSlice';

const Filters = () => {
  const transfers = useAppSelector(selectTransferCheckboxes);
  const ticketsLength = useAppSelector(selectTicketsLength);
  const dispatch = useAppDispatch();
  const onClickFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, id: name } = event.target;
    dispatch(setTransferCheckboxes({ checked, name }));
  };

  React.useEffect(() => {
    dispatch(rootSort());
  }, [transfers, ticketsLength]);
  return (
    <section className="filter-container">
      <h2>Количество пересадок</h2>
      <menu className="filters">
        {transfers.map((item) => (
          <Filter
            key={item.name}
            name={item.name}
            displayName={item.displayName}
            onClickFilter={onClickFilter}
            checked={item.checked}
          />
        ))}
      </menu>
    </section>
  );
};

export default Filters;
