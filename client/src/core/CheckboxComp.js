import React, { useState } from "react";
import "./CheckboxComp.css";

const CheckboxComp = ({ categories }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (c) => () => {
    // return the first index or -1
    const currentCategoryId = checked.indexOf(c);
    const newCheckedCategoryId = [...checked];
    // if currently checked was not already in checked state > push
    // else pull/take off
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    console.log(newCheckedCategoryId);
    setChecked(newCheckedCategoryId);
    // handleFilters(newCheckedCategoryId);
  };
  const noCategories = !categories || (categories && categories.length === 0);
  return (
    <>
      {" "}
      {!noCategories &&
        categories.map((c, i) => (
          <li key={c._id} className="list-unstyled">
            <div className="container mb-2 mt-2 form-check">
              <input
                onChange={handleToggle(c._id)}
                value={checked.indexOf(c._id === -1)}
                type="checkbox"
                className="form-check-input"
              />
              <label className="form-check-label">{c.name}</label>
            </div>
          </li>
        ))}
      ;
    </>
  );
};

export default CheckboxComp;
