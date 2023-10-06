import React from 'react';

import Streamer from '../Stream_box/Streambox';
import RecordBox from '../Record_box/Record_box';

import './grid.css';

function GridLayout() {

    return (

        <div id= "gridbox">
            <div className= "item1"><RecordBox /></div>
            <div className= "item2"> <Streamer/></div>
            
        </div>

    );

}

export default GridLayout;