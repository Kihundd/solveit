import React, { useState, useEffect } from 'react'
import { useQuery } from "@apollo/client";
import {MY_COUPON} from "../queries/queries"
import MyCouponList from "../components/profile/MyCouponList";

function MyCoupon(){

    const [myCoupons, setMyCoupons] = useState([]);
    const {loading, error, data} = useQuery(MY_COUPON);
    console.log(data)
    useEffect(() => {
      if(data !== undefined){
        setMyCoupons(data.myCoupons)
      }
    }, [data])
    

    return (
        <div>
            <MyCouponList myCoupons={myCoupons}  />
        </div>
    )

}

export default MyCoupon