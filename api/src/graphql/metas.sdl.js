import gql from 'graphql-tag'

export const schema = gql`
  type Meta {
    id: String!
    key: String!
    value: String!
    type: String!
    DraftProfile: DraftProfile
    draftProfileId: String
  }

  type Query {
    metas: [Meta!]!
    meta(id: String!): Meta!
    metaByKey(key: String!, profileId: String!): Meta
  }

  input CreateMetaInput {
    key: String!
    value: String!
    type: String!
    draftProfileId: String
  }

  input UpdateMetaInput {
    key: String
    value: String
    type: String
    draftProfileId: String
  }

  type Mutation {
    createMeta(input: CreateMetaInput!): Meta!
    updateMeta(id: String!, input: UpdateMetaInput!): Meta!
    deleteMeta(id: String!): Meta!
  }
`
