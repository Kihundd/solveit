import { gql } from '@apollo/client';

export const ALLREPORTS = gql`
    query allReports($page: Int!){
        allReports(page: $page){
            id
            isProcess
            type
            content
            creationDate
            ownerId
            testId
        }
    }
`
export const DELETE_REPORT = gql`
    mutation deleteReport($id: ID!){
        deleteReport(id: $id){
            code
            success
            message
        }
    }
`