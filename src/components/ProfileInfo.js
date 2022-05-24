import {useQuery} from '@apollo/client'
import {USER_INFO} from '../queries/queries'
import {useEffect, useState} from 'react'
import TextField from '@mui/material/TextField';

function ProfileInfo() {

    const [user, setUser] = useState("test@test.com");
    const {data, loading, error} = useQuery(USER_INFO, {
        variables:{ID: user}
    });
    // console.log(data);
    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error!</p>; 

    return (
        <div>
             <div style={{float:"left" }}>
                 <p>{data.profile.image}</p>
                 <button>사진추가</button>
             </div>
             <TextField defaultValue={data.profile.nickname}></TextField>
             <p>{data.profile.ownerId}</p>
             <ul>{data.profile.favorites}</ul>
             <p>{data.profile.point}</p>
             <button>상점</button>
             {/* <p>{data.profile.ownerId}</p> */}
        </div>
    )
}

export default ProfileInfo