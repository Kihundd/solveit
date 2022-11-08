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
            favorites{
                id
                name
            }
        }
    }
`;
export const UPDATE_USER_INFO =gql`
    mutation UpdateUserInfo($name: String, $favorite: [String!]!) {
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
    query GetAllTestList($page: Int!) {
        allTests(page: $page){
            id
            name
            ownerId
            tryCnt
            like
        }
    }
`
export const RANKINGLIST = gql`
    query GetRankingList($page: Int!) {
        allTests(page: $page ){
            id
            name
            ownerId
            tryCnt
            like
        }
    }
`
export const MYTEST = gql`
    query MyTestList{
        mySolvingTests{
            id
            name
            ownerId
            tryCnt
            like
        }
    }
`
export const CREATE_TEST = gql`
    mutation CreateTest ($input: CreateTestInput) {
        createTest(input: $input) {
            success
        }
    }
`

export const LIKE_TEST = gql`
    mutation LikeTest($id: ID!){
        likeTest(id: $id){
            success
        }
    }
`
export const UNLIKE_TEST = gql`
    mutation unLikeTest($id: ID!){
        unlikeTest(id: $id){
            success
        }
    }
`
export const DIFFICULTY = gql`
    mutation Difficulty($questionId: ID!, $difficulty: Int!){
        contributeDifficulty(questionId: $questionId, difficulty: $difficulty){
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
            ... on MultipleChoice {
                candidates {
                    number
                    content
                }
            }
            ...on CodingTest {
                testCases {
                    input
                    outputs
                }
            }
        }
    }
`

export const GET_FULL_QUESTION = gql`
    query getQuestion($id: ID!){
        question(id: $id){
            id
            name
            paragraph
            type
            explanation
            ... on MultipleChoice {
                candidates {
                    number
                    content
                }
            }
        }
    }
`

export const SUBMIT_QUESTION = gql`
    mutation submitQuestionAnswer($testId: ID!, $questionId: ID!, $answers: String!) {
        submitAnswer(testId: $testId, questionId: $questionId, answers: $answers) {
            code
            success
            message
        }
    }
`;

export const JUDGE_ANSWERS = gql`
    mutation judgeAnswers($testId: ID!) {
        judgeAnswers(testId: $testId) {
            code
            success
            message
        }
    }

`
export const TEST_RESULT = gql`
    query testJudgeResult($testId: ID!) {
        testAnswers(testId: $testId) {
            correctAnswer
            myAnswer
            is_correct
            questionId
        }
    }

`
export const ASKING = gql`
    mutation CreateAsking($input: CreateAskingInput!){
        createAsking(input: $input){
            code
            success
            message
        }
    }
`
export const REVIEWNOTE = gql`
    mutation CreateReviewNote($input: createReviewNoteInput!){
        createReviewNote(input: $input){
            code
            success
            message
        }
    }
`

export const GET_ASKING = gql`
    query AskingByQuestion($id: ID!){
        askingByQuestion(id: $ID){
            id
            title
            content
            ownerID
            creationDate
            questionId
        }
    }
`

export const SUBMIT_CODING_TEST_ANSWER = gql`
    mutation SubmitCodingTestAnswer($input: CodingTestAnswerInput!) {
        submitCodingTestAnswer(input: $input) {
            code
            success
            message
        }
    }
`
export const GRADE_TEST_CASE = gql`
    mutation GradeTestCase($testId: ID!, $questionId: ID!, $testCaseIdx: Int!) {
        gradeTestCase(testId: $testId, questionId: $questionId, testCaseIdx: $testCaseIdx) {
            code
            success
            message
        }
    }
`
export const CODING_TEST_RESULT = gql`
    mutation CodingTestResult($testId: ID!, $questionId: ID!, $testCaseIdx: Int!) {
        getCodingTestResult(testId: $testId, questionId: $questionId, testCaseIdx: $testCaseIdx) {
            code
            success
            message
            result
        }
    }
`
