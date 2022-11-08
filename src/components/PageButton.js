import { ButtonGroup, Button, IconButton } from "@mui/material"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from "react";
function PageButton(props) {

    // const [pageList, setPageList] = useState(props.pageList);
    // const [pageNum, setPageNum] = useState(props.pageNum);

    return(
        <>
            <IconButton>
                <ChevronLeftIcon />
            </IconButton>
            {/* {pageList.map((a, index) => (
                <Button key={index} variant='inherit' onClick={()=>{
                    setPageNum(a)
                }}>{a}</Button>
            ))} */}
            <Button variant="inherit">1</Button>
            <Button variant="inherit">2</Button>
            <IconButton>
                <ChevronRightIcon />
            </IconButton>
        </>
    )
}

export default PageButton