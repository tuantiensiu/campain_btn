import gql from 'graphql-tag'

export const schema = gql`
  type ESMSResponse {
    CodeResult: String!
    CountRegenerate: String
    SMSID: String
  }

  input CreateCampRegisterInput {
    fullName: String!
    nationalId: String
    phoneNumber: String
    birthday: DateTime
    meta: String
    createdAt: DateTime
  }

  type Query {
    smsBalance: Int!
  }

  type Mutation {
    campRegister(input: CreateCampRegisterInput!): DraftProfile
    smsSend(profileId: String!, message: String!): ESMSResponse
  }
`
