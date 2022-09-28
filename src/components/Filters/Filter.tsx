import React from 'react';

interface FilterProps {
  name: string;
  onClickFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  displayName: string;
}

const Filter: React.FC<FilterProps> = ({
  displayName, checked, name, onClickFilter,
}) => (
  <label htmlFor={name} className="filter">
    <input onChange={onClickFilter} checked={checked} id={name} type="checkbox" />
    <div>
      {displayName}
    </div>
  </label>
);

export default Filter;
