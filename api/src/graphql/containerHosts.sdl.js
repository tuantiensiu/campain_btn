export const schema = gql`
  type ContainerHost {
    id: String!
    name: String!
    contact: String
    note: String
    containers: [Container]!
  }

  type Query {
    containerHosts: [ContainerHost!]!
    containerHost(id: String!): ContainerHost
  }

  input CreateContainerHostInput {
    name: String!
    contact: String
    note: String
  }

  input UpdateContainerHostInput {
    name: String
    contact: String
    note: String
  }

  type Mutation {
    createContainerHost(input: CreateContainerHostInput!): ContainerHost!
    updateContainerHost(
      id: String!
      input: UpdateContainerHostInput!
    ): ContainerHost!
    deleteContainerHost(id: String!): ContainerHost!
  }
`
