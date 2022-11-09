// import { useQuery } from '@apollo/client';
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
// import { GET_REPLY } from "../queries/queries";
// import { TextField } from '@mui/material';

// function Reply(props) {

//     const [reply, setReply] = useState('');

//     const {data: replyData, loading: replyLoading, error: replyError} = useQuery(GET_REPLY, {
//         variables:{id: parseInt(params.askingId)}
//     });
//     const [getReply, {data: newReplyData, loading: newReplyLoading, error: newReplyError}] = useLazyQuery(GET_REPLY, {
//         variables:{id: parseInt(params.askingId)}
//     });
//     const [addReply, {data, loading, error}] = useMutation(CREATE_REPLY);
    
//     useEffect(() => {
//       if(data !== undefined) {
//         setReply(data.repliesByAsking)
//       }
    
//     }, [data])
//     console.log(reply)
    


//     return (
//         <>
//             {reply ? reply.map((a, index) => (
//                 <TextField rows="5"
//                 multiline
//                 fullWidth={true}
//                 value={a.content}
//                 key={index}
//                 >
//                 </TextField>
//             )): null}
//         </>
//     )
// }

// export default Reply
