import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectActiveTab, setActiveTab } from '../../store/slices/optionSlice';
import { optionTabs } from '../../store/utils';
import Tab from './Tab';
import { selectIsLoadingTickets, sortItemsByOption, setLoading } from '../../store/slices/ticketSlice';

const Tabs = () => {
  const activeTab = useAppSelector(selectActiveTab);
  const isLoading = useAppSelector(selectIsLoadingTickets);

  const [isTransition, setTransition] = React.useTransition();
  const dispatch = useAppDispatch();
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (activeTab.name === event.currentTarget.name) return;
    dispatch(setLoading(true));

    setTransition(() => {
      dispatch(setActiveTab(event.currentTarget.name));
      dispatch(sortItemsByOption(event.currentTarget.name));
    });
  };

  console.log(isTransition, 'trs');
  return (
    <ul className="tabs">
      {optionTabs.map(({ name, displayName }) => (
        <Tab
          key={name}
          name={name}
          disabled={isTransition || isLoading}
          displayName={displayName}
          activeTabName={activeTab.name}
          onClickTab={onClick}
        />
      ))}
    </ul>
  );
};

export default Tabs;
