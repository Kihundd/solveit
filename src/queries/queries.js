import { gql } from '@apollo/client';

export const SIGN_UP = gql`
    mutation Signup($name: String!, $email: String!, $hashedPW: String!) {
        signup(name: $name, email: $email, hashedPW: $hashedPW) {
            code
            success
            message
        }
    }
`;

export const LOGIN = gql`
    query Login($email: String!, $hashedPW: String!) {
        login(email: $email, hashedPW: $hashedPW) {
            success
            JWT
        }
    }
`