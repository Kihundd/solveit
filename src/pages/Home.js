import Header from '../components/Header';
import Slide from '../components/Slide'
import HomeList from '../components/HomeList'
import Grid from '@mui/material/Grid';
import AnswerListInput from '../components/AnwerListInput';
function Home() {
    return (
        <div>
            <Header></Header>
            <Slide></Slide>
            <Grid container spacing={2}>
                <Grid item xs>
                    <HomeList></HomeList>
                </Grid>
                <Grid item xs>
                    <HomeList></HomeList>
                </Grid>
            </Grid>
        </div>
        
    )
}
export default Home