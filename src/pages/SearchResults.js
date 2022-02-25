import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchSearch } from "../actions";

import SearchItem from "../components/SearchItem";

const SearchResults = (props) => {
  useEffect(() => {
    props.fetchSearch(props.match.params.searchResult);
  }, []);
  const renderResults = () => {
    if (props.search)
      return props.search.items.map((i) => {
        return <SearchItem video={i} key={i.id.videoId} />;
      });
  };

  return <div className="search-result">{renderResults()}</div>;
};

const mapStateToProps = (state) => {
  return {
    videoes: state.videoes,
    search: state.search,
  };
};

export default connect(mapStateToProps, { fetchSearch })(SearchResults);
