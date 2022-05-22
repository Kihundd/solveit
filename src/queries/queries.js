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
`
