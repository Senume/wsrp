import React, { useEffect, useState } from 'react';

import Media from '../../../utils/MediaClass';
import './CountBox.css'

const CountBox = () => {

    const [SongCount, setSongCount] = useState(0);
    const [MediaCount, setMediaCount] = useState(1);

    useEffect(() => {
        console.log('setSongCount');
        const fetchData = async () => {
            const MediaObject = new Media();
            const SongsList = await  MediaObject.GetAllSonglist();
            const UserList = await MediaObject.GetAllUser();

            console.log("CountBox Userdetails: ", UserList);
            console.log("CountBox Songsdetails: ", SongsList);


            if (UserList !== undefined && SongsList !== undefined) {
                setSongCount(SongsList.length);
                setMediaCount(UserList.length);
            }

        }

        fetchData();
    }, [SongCount, MediaCount]);

    return (
        <div className='countbox'>
            <div className='counter'>
                <span>{SongCount}</span>
                <p>Songs Recognised</p>
            </div>
            <div className='vertical'></div>
            <div className='counter'>
                <span>{MediaCount}</span>
                <p>User Count</p>
            </div>

        </div>
    );
}

export default CountBox;