import {Link, Container, Grid} from "@mui/material";
import Logo from "./Logo";

function MenuList() {
    return (
            <Container maxwidth="xl">
                <Grid container>
                    <Grid item xs={3}>
                        <Link href="/"><Logo/></Link>
                    </Grid>
                    <Grid item xs={8} sx={{display:'flex', alignItems: 'center'}}>
                        <Link href="/TestList" underline="none" color="inherit" sx={{marginLeft: 5}}>문제목록</Link>
                        <Link href="/CreateTest" underline="none" color="inherit" sx={{marginLeft: 5}}>문제생성</Link>
                        <Link href="/MyTestList" underline="none" color="inherit" sx={{marginLeft: 5}}>문제관리</Link>
                        <Link href="/Forum" underline="none" color="inherit" sx={{marginLeft: 5}}>게시판</Link>
                        <Link href="/Ranking" underline="none" color="inherit" sx={{marginLeft: 5}}>랭킹</Link>
                        <Link href="/Shop" underline="none" color="inherit" sx={{marginLeft: 5}}>상점</Link>
                    </Grid>
                 </Grid>
            </Container>
    )
}
export default MenuList