import React from 'react'
import AskingView from '../components/ask/AskingView'
import Appbar from '../components/home/Appbar';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { ASKINGINFO } from '../queries/queries';
import { useEffect } from 'react';
import { useState } from 'react';
import { Viewer } from '@toast-ui/react-editor';

function Asking() {
    
    const params = useParams();
    const [content, setContent] = useState('');
    const {data: askingData, loading: askingLoading, error: askingError} = useQuery(ASKINGINFO, {
        variables:{askingId: parseInt(params.askingId)}
    });
    const [a, setA] = useState('1');

    useEffect(() => {
      if(askingData !== undefined){
        setContent(askingData.asking.content)
      }
    }, [askingData])
    
    return (
        <div>
            <Appbar />
            <AskingView content={content} />
        </div>
    )
}

export default Asking
