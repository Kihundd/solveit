import { gql } from "@apollo/client";

export const CATEGORIES = gql`
    query Categories {
        categories {
            id
            name
        }
    }
`;

export const CREATE_QUESTION = gql`
    mutation CreateQuestion($input: CreateQuestionInput) {
        createQuestion(input: $input) {
            code
            success
            message
            questionId
        }
    }
`;

export const CREATE_CODING_TEST_QUESTION = gql`
    mutation createCodingTestQuestion($input: CreateCodingTestQuestionInput) {
        createCodingTestQuestion(input: $input) {
            code
            success
            message
            questionId
        }
    }
`;