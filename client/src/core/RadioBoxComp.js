


import React, { useState } from "react";

const RadioBoxComp = ({ prices, handleFiltersArr }) => {
    const [value, setValue] = useState(0);

    const handleChange = event => {
        handleFiltersArr(event.target.value);
        setValue(event.target.value);
    };

    return prices.map((p, i) => (
        <div key={i}>
            <div className="container mb-2 mt-2">
            <input
                onChange={handleChange}
                value={`${p._id}`}
                name={p}
                type="radio"
                // className="mr-2 ml-4"
            />
            <span >{" "}</span>

            <label className="form-check-label">{p.name}</label>
        </div>
        </div>

    ));
};

export default RadioBoxComp
