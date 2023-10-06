import React from "react";
import { FaMicrophone } from "react-icons/fa";

import "./Record_button.css";

function RecordButton() {

    return (
        <div className="outer_circle">
            <FaMicrophone id="symbol" />
        </div>
    );
}

export default RecordButton;