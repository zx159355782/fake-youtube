import React from "react";

const PhoneSearch = ({ handleSearch, setInput, setToggleSearch }) => {
  return (
    <form className="header-phone" onSubmit={(e) => handleSearch(e)}>
      <button
        type="button"
        className="search-back"
        onClick={() => setToggleSearch(false)}
      >
        <i className="fas fa-arrow-left"></i>
      </button>
      <input
        className="searchbar-phone"
        type="text"
        placeholder="搜尋"
        onChange={(e) => setInput(e.target.value)}
      ></input>
      <button type="submit" className="btn-phone">
        <i className="fas fa-search"></i>
      </button>
    </form>
  );
};

export default PhoneSearch;
