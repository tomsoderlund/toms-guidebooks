# GraphQL

https://atheros.ai/blog/graphql-best-practices-for-graphql-schema-design

## Interactive query tool

http://localhost:4000/graphql

    # Write your query or mutation here
    query {
      product (id: 123) {
        name
        brand
      }
    }

## Types/Scalars

- Int: Signed 32‐bit integer
- Float, BigFloat: Signed double-precision floating-point value
- String: UTF‐8 character sequence
- Boolean: true or false
- ID (serialized as String)

### Input types

    input CreateProjectInput {
      id: ID
      title: String
      tasks: [TaskInput]
    }

    updateProject(id: ID!, project: CreateProjectInput): Project

### implements

	interface Character {
	  id: ID!
	  name: String!
	}
	
	type Human implements Character {
	  id: ID!
	  name: String!
	  age: Int
	}

### GraphQLDateTime

https://www.npmjs.com/package/graphql-iso-date

#### typeDefs/schema

    scalar DateTime
    dateUpdated: DateTime

#### resolvers

    const { GraphQLDateTime } = require('graphql-iso-date')

    module.exports.resolvers = (pool) => mergeResolvers([
      { DateTime: GraphQLDateTime },
      require('./game/resolvers')(pool)
    ])

#### Data

    dateUpdated = new Date()


## Queries

    {
      # Queries can have comments
      articles {
        title
      }
    }

### Filters

    {
      articles(category: "news") {
        title
      }
    }

### Fragments

    fragment GameShortInfo on Game {
      id
      title
    }

    query GamesList($system: String) {
      games (system: $system) {
        ...GameShortInfo
      }
    }

_Note: GamesList($system: String!) for mandatory parameter_


## Mutations (create, update, delete)

    mutation {
      addFont (name: "Futura") {
        id
        name
      }
    }

## Nested data

### Nesting in schema

    type Category {
      id: ID
      name: String
    }

    type Font {
      id: ID
      name: String
      category: Category
    }

### Nesting in resolvers

    Query: {
      async company (parent, variables, context, info) {
        ...
      }
    },

    Company: { // same name as *parent* in schema
      async employees (parent, variables, context, info) {
        return await sqlFind(pool, 'person', { company_id: parent.id })
      }
    },

### Nested queries

    {
      articles {
        title
        author {
          name
        }
      }
    }

## Polling and Subscriptions

### Polling

https://www.apollographql.com/docs/react/data/queries/#polling

		const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
			variables: { breed },
			skip: !breed,
			pollInterval: 500,
		})

Note: use `skip` for conditional queries

### Subscriptions

https://www.apollographql.com/docs/react/data/subscriptions/

## Server

    yarn add graphql apollo-server(-express/-micro)

server.js:

    const server = require('express')()
    const { ApolloServer } = require('apollo-server-express')
    const { typeDefs, resolvers } = require('./graphql/schema')

    const apolloServer = new ApolloServer({ typeDefs, resolvers })
    apolloServer.applyMiddleware({ app: server })


## GraphQL on Next.js

- Global: https://github.com/zeit/next.js/tree/master/examples/with-apollo
- New:    https://github.com/zeit/next.js/tree/canary/examples/with-apollo
- Per page: https://github.com/adamsoffer/next-apollo-example

## GraphQL on Zeit Now

https://zeit.co/guides/deploying-apolloserver-to-now

    yarn add apollo-server-micro graphql
    mkdir -p api/graphql
    touch api/graphql/index.js

api/graphql/index.js:

    const { ApolloServer, gql } = require('apollo-server-micro')

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      introspection: true,
      playground: true
    })

    module.exports = server.createHandler({ path: '/api/graphql' })


## Combine schemas

merge-graphql-schemas

    const { mergeTypes, mergeResolvers }  = require('merge-graphql-schemas')

    const typeDefs = mergeTypes([
      require('../../graphql/gift/schema'),
      require('../../graphql/wishlist/schema')
    ])

    const resolvers = mergeResolvers([
      require('../../graphql/gift/resolvers')(pool),
      require('../../graphql/wishlist/resolvers')(pool)
    ])

## Cache

    export const useUpdateProject = () => {
      const [updateProjectMutation] = useMutation(UPDATE_PROJECT, {
        update: (cache, { data: { updateProject } }) => {
          const { variables } = cache.watches.values().next().value
          cache.writeQuery({
            query: GET_PROJECT,
            variables,
            data: { project: updateProject }
          })
          const { project } = cache.readQuery({
            query: GET_PROJECT,
            variables
          })
          console.log(`New data:`, updateProject)
          console.log(`From cache:`, project)
        }
      })
      return updateProjectMutation
    }
