import React, { useState } from "react";
import PropTypes from "prop-types";
import "./SearchProject.scss";

export default function SearchProject({ onSubmit }) {
  const [searchField, setSearchField] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!onSubmit) return;

    onSubmit(searchField);
  };
  return (
    <div className="search-product">
      <div className="col-xl-5 form">
        <form onSubmit={handleSubmit}>
          <input
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            placeholder="Project title, skill"
          />
        </form>
      </div>

      <div className="col-xl-2">
        <button onClick={handleSubmit}>Search</button>
      </div>
    </div>
  );
}

SearchProject.prototype = {
  onSubmit: PropTypes.func
};
