const {ApolloServer, gql} = require('apollo-server');

// type checking
// String! => type string not null
// query vs mutation
// objects
// array
// arguments

// crud

const typeDefs = gql`

type Query{
    hello: String!
}

type User{
    id: ID!
    username: String!
}

type Error {
    field: String!
    message: String!
}

type RegisterResponse{
    errors: [Error]
    # errors: [Error!]! jika ga mau nge return null pada type error dan field errors
    user: User
}

input UserInfo {
    username: String!
    password: String!
    age: Int
}

type Mutation{
    register(userInfo: UserInfo): RegisterResponse!
    login(userInfo: UserInfo): Boolean!
}

`;

const resolvers = {
    Query: {
        hello: () => 'hello world!'
    },
    Mutation: {
        login: () => true,
        register: () =>({
            errors: [{
                field: 'username',
                message: 'bad'
            }],
            user: {
            id: 1,
            username: "bob"
            }
            
        })
    }
}

const server = new ApolloServer({ typeDefs, resolvers});

server.listen().then(({url}) => console.log(`server started at ${url}`));