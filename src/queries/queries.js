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
            experience
            point
            tier
            favorites{
                id
                name
            }
            solveCount
            correctCount
        }
    }
`;
export const ROLE = gql`
    query Profile($ID: String) {
        profile(ID: $ID){
            role
        }
    }
`
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
            category_log{
                category
                try_count
                correct_count
            }
        }
    }
`;
export const NICKNAME = gql`
    query GetMyname($ID: String) {
        profile(ID: $ID) {
            nickname
            ownerId
            role
            favorites{
                id
                name
            }
        }
    }
`;
export const USERCATETORY = gql`
    query GetMyCategory($ID: String) {
        profile(ID: $ID) {
            nickname
            ownerId
            role
            favorites{
                id
                name
            }
        }
    }
`;
export const ALLTESTLIST = gql`
    query GetAllTestList($page: Int!, $order: OrderBy) {
        allTests(page: $page, order: $order){
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
export const MY_LIKE_LIST = gql`
    query MyLikeList{
        myLikeTests{
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

export const TESTLIST_CATEGORY = gql`
    query GetByCategory($id: ID!){
        testsByCategory(id: $id){
            id
            name
            ownerId
            tryCnt
            testCategory{
                id
                name
            }
            like
        }
    }
`

export const TEST_INFO = gql`
    query getTestInfo($id: ID!) {
        test(id: $id) {
            id
            name
            content
            ownerId
            tryCnt
            testCategory{
                id
                name
            }
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
            difficulty{
                id
                name
            }
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
            difficulty {
                id
                name
            }
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

export const GET_REVIEWNOTE = gql`
    query ReviewNote($questionId: ID!){
        reviewNote(questionId: $questionId){
            id
            ownerId
            questionId
            explanation
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
export const ALLASKING = gql`
    query GetAllAsking($page: Int!){
        allAsking(page: $page){
            id
            title
            content
            ownerId
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
export const GET_ASKING = gql`
    query AskingByQuestion($id: ID!){
        askingByQuestion(id: $id){
            id
            title
            content
            ownerId
            creationDate
            questionId
        }
    }
`
export const ASKINGINFO = gql`
    query GetAsking($askingId: ID!){
        asking(askingId: $askingId){
            id
            title
            content
            ownerId
            creationDate
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

export const CREATE_REPLY = gql`
    mutation CreateReply($input: CreateReplyInput!){
        createReply(input: $input){
            code
            success
            message
        }
    }
`
export const GET_REPLY = gql`
    query GetReply($id: ID!){
        repliesByAsking(id: $id){
            id
            content
            ownerId
            creationDate
            askingId
        }
    }
`
export const DELETE_REPLY = gql`
    mutation CreateReply($id: ID!){
        deleteReply(id: $id){
            code
            success
            message
        }
    }
`
export const CODING_TEST_RESULT = gql`
    query CodingTestResult($testId: ID!, $questionId: ID!, $testCaseIdx: Int!) {
        codingTestResult(testId: $testId, questionId: $questionId, testCaseIdx: $testCaseIdx) {
            code
            result
            message
            success
        }
    }
`
export const GET_TAG = gql`
    query GetTag($testId: ID!) {
        tagsOfTest(testId: $testId) {
            id
            name
            ownerId
            creationDate
            testId
        }
    }
`
export const CREATE_TAG = gql`
    mutation CreateTag($name: String!, $testId: ID!){
        createTag(name: $name, testId: $testId){
            code
            success
            message
        }
    }
`
export const CREATE_REPORT = gql`
    mutation CreateReport($input: CreateReportInput!){
        createReport(input: $input){
            code
            success
            message
        }
    }
`
export const ALLTESTSCOUNT = gql`
    query AllTestsCount {
        allTestsCount
    }
`
export const LIKESCOUNT = gql`
    query LikseCount($id: ID!){
        testLikesCount(id: $id)
    }
`
export const GETLIKE = gql`
    query Like($testId: ID!, $userId: ID){
        like(testId: $testId, userId: $userId)
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

export const RANKINGLIST = gql`
    query GetRankingList($page: Int!, $includeAdmin: Boolean){
        profilesByExp(page: $page, includeAdmin: $includeAdmin){
            ownerId
            nickname
            tier
            experience
        }
    }
`
export const PROFILE_COUNT = gql`
    query ProfilesCount($includeAdmin: Boolean){
        profilesCount(includeAdmin: $includeAdmin)
    }
`
export const GET_COUPON = gql`
    query GetCoupon{
        coupons{
            id
            name
            explanation
            price
        }
    }
`
export const BUY_COUPON = gql`
    mutation BuyCoupon($couponID: ID!, $count: Int!){
        issueCoupon(couponID: $couponID, count: $count){
            code
            success
            message
        }
    }
`
export const MY_COUPON = gql`
    query MyCoupons{
        myCoupons{
            coupon{
                name
                explanation
                price
            }
            count
        }
    }
`

export const MY_CREATE_LIST = gql`
    query TestByCreator($id: ID!){
        testsByCreator(id: $id){
            id
            name
            ownerId
            tryCnt
            like
        }
    }
`

export const ALL_ASKING_COUNT = gql`
    query AllAskingCount{
        allAskingCount
    }
`