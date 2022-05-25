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
    mutation CreateQuestion($input: createQuestionInput) {
        createQuestion(input: $input) {
            code
            success
            message
            questionId
        }
    }
`;