import Header from '../components/home/Header';
import Slide from '../components/home/Slide'
import HomeList from '../components/home/HomeList'
import Grid from '@mui/material/Grid';
import AnswerListInput from '../components/AnwerListInput';
function Home() {
    return (
        <div>
            <Header></Header>
            <Slide></Slide>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <HomeList></HomeList>
                </Grid>
                <Grid item xs={6}>
                    <HomeList></HomeList>
                </Grid>
            </Grid>
        </div>
        
    )
}
export default Home