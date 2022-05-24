import { useQuery } from "@apollo/client";
import {My_Coupon} from "../queries/queries"

function MyCoupon(){

    const {loading, error, data} = useQuery(My_Coupon);
    if(loading) return <p>Loading...</p>;
    if(error) return <p>error..</p>;
    console.log(data);

    return (
        <div>
            <p>d</p>
        </div>
    )

}

export default MyCoupon