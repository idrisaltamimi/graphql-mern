import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } from 'graphql'

import Client from '../model/Client.js'
import Project from '../model/Project.js'

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.id)
      }
    }
  })
})

const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    projects: {
      type: GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find()
      }
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id)
      }
    },
    clients: {
      type: GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find()
      }
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id)
      }
    }
  }
})

export default new GraphQLSchema({
  query: RootQuery
})