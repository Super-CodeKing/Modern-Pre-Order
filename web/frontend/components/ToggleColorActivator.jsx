import React from 'react';

const ToggleColorActivator = ({ toggleColorFunction, color }) => {
    return (
        <div
            onClick={toggleColorFunction}
            style={{
                backgroundColor: color ?? "#F8F2F2",
                width: "22px",
                height: "22px",
                cursor: "pointer",
                border: "1px solid #ccc",
                borderRadius: "5px",
            }}
        ></div>
    );
};

export default ToggleColorActivator;
