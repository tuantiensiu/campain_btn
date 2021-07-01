export const schema = gql`
  type ProfileOnContainer {
    profile: DraftProfile
    container: Container
  }

  type Container {
    id: String!
    slug: String
    name: String!
    note: String
    profiles: [ProfileOnContainer!]
    host: ContainerHost
    type: ContainerType!
    capacity: Int
    updatedAt: DateTime!
    createdAt: DateTime!
    containerTypeId: String!
    containerHostId: String
  }

  type Query {
    containers(filterType: String): [Container]
    container(id: String!): Container
  }

  input CreateContainerInput {
    name: String!
    note: String
    capacity: Int
    containerTypeId: String!
    containerHostId: String
  }

  input UpdateContainerInput {
    name: String
    note: String
    capacity: Int
    containerTypeId: String
    containerHostId: String
  }

  type Mutation {
    createContainer(input: CreateContainerInput!): Container!
    updateContainer(id: String!, input: UpdateContainerInput!): Container!
    deleteContainer(id: String!): Container!
    attachProfileToContainer(containerId: String!, profileId: String!): Boolean!
    attachProfilesToContainer(
      containerId: String!
      profileIds: [String!]
    ): Boolean!
    detachProfileFromContainer(
      containerId: String!
      profileId: String!
    ): Boolean!
  }
`

// updateContainerProfileNote(
//   containerId: String!
//   profileId: String!
//   note: String!
// ): Boolean!
