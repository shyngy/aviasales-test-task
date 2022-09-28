import React from 'react';

interface TabProps {
  name: string;
  displayName: string;
  activeTabName: string;
  disabled: boolean;
  onClickTab: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Tab: React.FC<TabProps> = ({
  name, displayName, activeTabName, onClickTab, disabled,
}) => (
  <li data-name={name} className={name === activeTabName ? 'active' : ''}>
    <button
      name={name}
      disabled={disabled || name === 'optimal'}
      onClick={onClickTab}
      type="button"
    >
      {displayName}
    </button>
  </li>
);

export default Tab;
