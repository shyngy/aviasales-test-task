import React from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectActiveTab, setActiveTab } from '../../store/slices/optionSlice';
import { optionTabs } from '../../store/utils';
import Tab from './Tab';
import { selectIsLoadingTickets, rootSort } from '../../store/slices/ticketSlice';

const Tabs = () => {
  const activeTab = useAppSelector(selectActiveTab);
  const isLoading = useAppSelector(selectIsLoadingTickets);
  const [isPending, setTransition] = React.useTransition();
  const dispatch = useAppDispatch();
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (activeTab.name === event.currentTarget.name) return;
    dispatch(setActiveTab(event.currentTarget.name));
    setTransition(() => {
      dispatch(rootSort());
    });
  };

  return (
    <ul className="tabs">
      {optionTabs.map(({ name, displayName }) => (
        <Tab
          key={name}
          name={name}
          disabled={isPending && isLoading}
          displayName={displayName}
          activeTabName={activeTab.name}
          onClickTab={onClick}
        />
      ))}
    </ul>
  );
};

export default Tabs;
