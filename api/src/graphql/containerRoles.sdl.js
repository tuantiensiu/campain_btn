export const schema = gql`
  type ContainerRole {
    id: String!
    slug: String!
    name: String!
    container: Container
    containerId: String
    profileId: String
  }

  type Query {
    containerRoles: [ContainerRole!]!
    containerRole(id: String!): ContainerRole
  }

  input CreateContainerRoleInput {
    slug: String!
    name: String!
    containerId: String
    profileId: String
  }

  input UpdateContainerRoleInput {
    slug: String
    name: String
    containerId: String
    profileId: String
  }

  type Mutation {
    createContainerRole(input: CreateContainerRoleInput!): ContainerRole!
    updateContainerRole(
      id: String!
      input: UpdateContainerRoleInput!
    ): ContainerRole!
    deleteContainerRole(id: String!): ContainerRole!
  }
`
