import React from 'react';

const Filter = ({searchInput, setSearchInput}) => {
  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  }

  return (
    <div>
    filter shown with <input
      value = {searchInput}
      onChange = {handleSearchChange}
      />
  </div>
   );
}

export default Filter;
