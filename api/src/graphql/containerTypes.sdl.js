export const schema = gql`
  type ContainerType {
    id: String!
    slug: String!
    name: String!
    containers: [Container]!
  }

  type Query {
    containerTypes: [ContainerType!]!
    containerType(id: String!): ContainerType
  }

  input CreateContainerTypeInput {
    slug: String!
    name: String!
  }

  input UpdateContainerTypeInput {
    slug: String
    name: String
  }

  type Mutation {
    createContainerType(input: CreateContainerTypeInput!): ContainerType!
    updateContainerType(
      id: String!
      input: UpdateContainerTypeInput!
    ): ContainerType!
    deleteContainerType(id: String!): ContainerType!
  }
`
