import gql from 'graphql-tag'

export const schema = gql`
  type View {
    value: String
    label: String
  }

  type Query {
    viewSelectList(
      type: String!
      excludeIds: [String!]
      valueProp: String
      labelProp: String
    ): [View!]
  }
`
