import Header from '../components/Header'
import { Grid } from '@mui/material'
import { useState } from 'react'
import { TextField } from '@mui/material';
function CreateTest() {
    
    const [QuestionNum, setQuestionNum] = useState(1);
    
    return (
        <>
            <Header />
            <Grid container>
                <Grid item xs={3}>
                    <div className=''>
                        <h5>테스트 이름</h5>
                        <button>문제 추가</button>
                        <p>{QuestionNum}</p>
                    </div>
                </Grid>
                <Grid item xs={9}>
                    <div>새로운 문제 생성</div>
                </Grid>
                <Grid item xs={9}>
                    <div>
                        <h6>문제정보</h6>
                    </div>
                    <div>
                        <span>주관식</span>
                        <span>문제분야</span>
                        <span>태그추가</span>
                        <button>사진</button>
                        <button>음성파일</button>
                        <button>난이도</button>
                        <TextField defaultvalue="문제내용" />
                        

                    </div>

                    


                </Grid>
            </Grid>

        </>
    )
}

export default CreateTest