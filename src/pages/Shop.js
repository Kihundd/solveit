import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import Album from "../components/shop/Album"
import Appbar from '../components/home/Appbar'
import { GET_COUPON, USER_INFO } from "../queries/queries"

function Shop(){
    const [point, setPoint] = useState(0);
    const {loading, error, data} = useQuery(GET_COUPON);
    const {loading: userLoading, error: userError, data: userData} = useQuery(USER_INFO,{
        variables: {ID: null}
    })
    useEffect(() => {
      if(userData !== undefined && userData.profile !== undefined)
        setPoint(userData.profile.point)
    }, [userData])
    // console.log(userData)
    return(
        <>
            <Appbar />
            <Album coupon={data} point={point} />
        </>
    )
}
export default Shop