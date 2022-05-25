import { ButtonGroup, Button, IconButton } from "@mui/material"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
function PageButton() {
    return(
        <>
            <IconButton>
                <ChevronLeftIcon />
            </IconButton>
            <Button variant="inherit">1</Button>
            <IconButton>
                <ChevronRightIcon />
            </IconButton>
        </>
    )
}

export default PageButton