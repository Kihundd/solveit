import Appbar from '../components/home/Appbar.js';
import HomeList from '../components/home/HomeList'
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { Typography, Box, Link } from '@mui/material';
import FileUpload from '../components/FileUpload';
import jsCookies from 'js-cookies';
import { useQuery } from '@apollo/client';
import { ALLTESTLIST, ALLASKING, TESTLIST_CATEGORY, USERCATETORY, RANKINGLIST } from '../queries/queries';
import { useEffect } from 'react';
import Login from './isLogin';

function Home() {

    const [isLogin, setIsLogin] = useState(false);
    const [categoryId, setCategoryId] = useState('');
    const [newTest, setNewTest] = useState('');
    const [popular, setPopular] = useState('');
    const [recomend, setRecoend] = useState();
    const [newAsking, setAsking] = useState('');
    const [ranking, setRanking] = useState('');

    // 신규문제
    const {loading:newTestLoading, error:newTestError, data:newTestData} = useQuery(ALLTESTLIST, {
        variables: {page: 1}}
    );
    // 인기문제(제출수)
    const {loading:popularTestLaoding, error:popularTesError, data:popularTesData} = useQuery(ALLTESTLIST, {
        variables: {page: 1, order: 'SOLVING_COUNT_DESC'}}
    );
    // 신규 질문
    const {loading:newAskingLoading, error:newAskingError, data:newAskingData} = useQuery(ALLASKING, {
        variables: {page: 1}}
    );
    // 유저 랭킹
    const {loading:rankLoading, eorr:rankError, data:rankData} = useQuery(RANKINGLIST, {
        variables: {page: 1, includeAdmin: false}
    })
    console.log(rankData)
    
    const {loading, error, data} = useQuery(USERCATETORY, {
        variables: {ID: null}
    });
    // console.log(data)

    // 추천문제
    const {loading:categoryLoading, error:categoryError, data:categoryData} = useQuery(TESTLIST_CATEGORY, {
        variables: {id: categoryId}
    });
    // console.log(categoryData)

    useEffect(() => {
        setIsLogin(Login())
    }, [Login()])
    
    useEffect(() => {
        if(data !== undefined && data.profile.favorites.length !== 0){
            setCategoryId(Number(data.profile.favorites[0].id))
        }
    }, [data])

    useEffect(() => {
        if(newTestData !== undefined && newTestData.allTests !== undefined) {
            setNewTest(newTestData.allTests.slice(0,5));
        }
    }, [newTestData])

    useEffect(() => {
        if(popularTesData !== undefined && popularTesData.allTests !== undefined) {
            setPopular(popularTesData.allTests.slice(0,5));
        }
    }, [popularTesData])

    useEffect(() => {
        if(newAskingData !== undefined && newAskingData.allAsking !== undefined) {
            setAsking(newAskingData.allAsking.slice(0,5));
        }
    }, [newAskingData])

    useEffect(() => {
        if(rankData !== undefined && rankData.profilesByExp !== undefined) {
            setRanking(rankData.profilesByExp.slice(0,5));
        }
    
    }, [rankData])
    


    useEffect(() => {
        if(categoryData !== undefined && categoryData.testsByCategory !== undefined) {
            setRecoend(categoryData.testsByCategory.slice(0,5));
        }
    }, [categoryData])

    // console.log(document.cookie.split(';'))
    // console.log(!!jsCookies.getItem('token'))
    return (
        <div>
            <Appbar/>
            <div className='main-bg'>
                <h3 className='main-content'>Solve it</h3>
                <p className='main-content'>여러가지 문제를 만들고 풀어볼수 있는 사이트입니다.</p>
            </div>
            <Grid container spacing={2} sx={{margin: '0 auto'}}>
                <Grid item xs={2}></Grid>
                <Grid item xs={2} >
                    <Box sx={{bgcolor: 'royalblue', color: 'cornsilk', borderRadius: '5px', padding: '10px'}}>
                        <Link href={`/TestList`} underline='none' color='inherit'>
                            새로운문제
                        </Link>
                    </Box>
                </Grid> 
                {isLogin ? 
                    <Grid item xs={2} >
                        <Box sx={{bgcolor: 'royalblue', color: 'cornsilk', borderRadius: '5px', padding: '10px'}}>
                            <Link href={`/TestList`} underline='none' color='inherit'>
                                추천문제
                            </Link>
                        </Box>
                    </Grid> :
                    <Grid item xs={2} >
                        <Box sx={{bgcolor: 'royalblue', color: 'cornsilk', borderRadius: '5px', padding: '10px'}}>
                            <Link href={`/TestList`} underline='none' color='inherit'>
                                인기문제
                            </Link>
                        </Box>
                    </Grid>
                }
                <Grid item xs={2} >
                    <Box sx={{bgcolor: 'royalblue', color: 'cornsilk', borderRadius: '5px', padding: '10px'}}>
                        <Link href={`/Forum`} underline='none' color='inherit'>
                            새로운 글
                        </Link>
                    </Box>
                </Grid> 
                <Grid item xs={2}>
                    <Box sx={{bgcolor: 'royalblue', color: 'cornsilk', borderRadius: '5px', padding: '10px'}}>
                        <Link href={`/Ranking`} underline='none' color='inherit'>
                            사용자 랭킹
                        </Link>
                    </Box>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
            <Grid container spacing={2} sx={{margin: '0 auto'}}>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}>
                    <HomeList data={newTest} url='TestInfo' />
                </Grid> 
                {isLogin ? 
                    <Grid item xs={2}>
                        <HomeList data={recomend} url='TestInfo' />
                    </Grid> :
                    <Grid item xs={2}>
                        <HomeList data={popular} url='TestInfo' />
                    </Grid>
                }
                
                <Grid item xs={2}>
                    <HomeList data={newAsking} url='Ask' />
                </Grid> 
                <Grid item xs={2}>
                    <HomeList data={ranking} url='Ranking' />
                </Grid> 
                <Grid item xs={2}></Grid>
            </Grid>
            <FileUpload />
        </div>
        
    )
}
export default Home