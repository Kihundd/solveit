import { gql } from "@apollo/client";

export const SET_TIER_POINT = gql`
    mutation SetTierPoint($input: [TierPoint!]!){
        setTierPoint(input: $input){
            code
            success
            message
        }
    }
`
export const SET_TIER_EXPERIENCE = gql`
    mutation SetTierExperience($input: [TierExperience!]!){
        setTierExperience(input: $input){
            code
            success
            message
        }
    }
`
export const CREATE_COUPON = gql`
    mutation CreateCoupon($name: String!, $explanation: String!, $price: Int!){
        addCoupon(name: $name, explanation: $explanation, price: $price){
            code
            success
            message
        }
    }
`
export const DELETE_COUPON = gql`
    mutation DeleteCoupon($couponID: ID!){
        deleteCoupon(couponID: $couponID){
            code
            success
            message
        }
    }
`
export const DELETE_TEST = gql`
    mutation DeleteTest($id: ID!){
        deleteTest(id: $id){
            code
            success
            message
        }
    }
`