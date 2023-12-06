import React from 'react';

// import Streamer from '../Stream_box/Streambox';
import RecordBox from '../Recognise_page/Record_box/Record_box'
import SongDetailBox from '../Recognise_page/SongDetailBox/SongDetailBox';

import './grid.css';

function GridLayout() {

    return (

        <div id= "gridbox">
            <div className= "item1"><RecordBox /></div>
            <div className= "item2"><SongDetailBox id={9822579481960} /></div>
            
        </div>

    );

}

export default GridLayout;