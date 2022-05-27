import {Link, Container, Grid} from "@mui/material";

function MenuList() {
    return (
            <Container maxwidth="xl">
                <Grid container spacing={3}>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={2}>
                        <Link href="/TestList" underline="none" color="inherit">문제 목록</Link>
                    </Grid>
                    <Grid item xs={2}>
                        <Link href="/CreateTest" underline="none" color="inherit" >문제 생성</Link>
                    </Grid>
                    <Grid item xs={2}>
                        <Link underline="none" color="inherit">문제 관리</Link>
                    </Grid>
                    <Grid item xs={2}>
                        <Link underline="none" color="inherit">게시판</Link>
                    </Grid>
                    <Grid item xs={2}>
                        <Link underline="none" color="inherit">랭킹</Link>
                    </Grid>
                    <Grid item xs={2}>
                        <Link underline="none" color="inherit">상점</Link>
                    </Grid>
                </Grid>
            </Container>
    )
}
export default MenuList