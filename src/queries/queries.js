import { gql } from '@apollo/client';

export const SIGN_UP = gql`
    mutation Signup($name: String!, $ID: String!, $hashedPW: String!) {
        signup(name: $name, ID: $ID, hashedPW: $hashedPW) {
            code
            success
            message
        }
    }
`;
export const LOGIN = gql`
    query Login($ID: String!, $hashedPW: String!) {
        login(ID: $ID, hashedPW: $hashedPW)
    }
`;
export const USER_INFO = gql`
    query Profile($ID: String!) {
        profile(ID: $ID) {
            ownerId
            nickname
            image
            point
            favorites
        }
    }
`;
export const STATISTICS = gql`
    query Statistics($ID: String!) {
        statistics(ID: $ID) {
            try_count
            correct_count
        }
    }
`;
export const My_Coupon = gql`
    query myCoupons {
        myCoupons {
            coupon {
                id
                name
                explanation
            }
            count
        }
    }
`;
export const Log = gql`
    query Log{
        category
        correct
        wrong
    }
`;
export const NICKNAME = gql`
    query GetMyname($ID: String) {
        profile(ID: $ID) {
            nickname
        }
    }
`;

