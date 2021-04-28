import React from 'react';

const Search = ({searchInput, setSearchInput}) => {
  const handleSearchInput = (event) => setSearchInput(event.target.value)

  return (
    <div>
      find countries
      <input
      value = {searchInput}
      onChange = {handleSearchInput}
      />
    </div>
   );
}

export default Search;
