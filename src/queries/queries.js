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
    query Profile($ID: String) {
        profile(ID: $ID) {
            ownerId
            nickname
            image
            point
            tier
        }
    }
`;
export const UPDATE_USER_INFO =gql`
    mutation UpdateUserInfo($name: String, $favorite: String) {
        updateProfile(name: $name, favorite: $favorite){
            success
            code
            message
        }
    }
`
export const STATISTICS = gql`
    query Statistics($ID: String) {
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
export const NICKNAME = gql`
    query GetMyname($ID: String) {
        profile(ID: $ID) {
            nickname
            ownerId
        }
    }
`;
export const ALLTESTLIST = gql`
    query GetAllTestList {
        allTests{
            id
            name
            ownerId
            tryCnt
        }
    }
`
export const CREATE_TEST = gql`
    mutation CreateTest ($input: createTestInput) {
        createTest(input: $input) {
            code
            message
            success
        }
    }
`
// export const TESTLIST_CATEGORY = gql`
//     query GetByCategory{
//         testByCategory{
//             id
//             name
//             ownerID
//             tryCnt
//             testCategory
//         }
//     }
// `
export const TEST_INFO = gql`
    query getTestInfo($id: ID!) {
        test(id: $id) {
            id
            name
            content
            ownerId
            tryCnt
        }
    }
`
export const TAKE_TEST = gql`
    query takeTest($id: ID!) {
        test(id: $id) { 
            name
            questionIds {
                questionId
                number
            }
        }
    }
`
export const GET_QUESTION = gql`
    query getQuestion($id: ID!){
        question(id: $id){
            id
            name
            paragraph
            type
            
        }
    }
`


