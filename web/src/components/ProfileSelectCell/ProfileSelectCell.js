import ProfileSelect from 'src/components/ProfileSelect'

export const QUERY = gql`
  query VIEW_SELECT_LIST(
    $type: String!
    $excludeIds: [String!]
    $labelProp: String
    $valueProp: String
  ) {
    viewSelectList(
      type: $type
      excludeIds: $excludeIds
      labelProp: $labelProp
      valueProp: $valueProp
    ) {
      id: value
      label
    }
  }
`

export const beforeQuery = (props) => {
  return { variables: props, fetchPolicy: 'network-only' }
}

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ viewSelectList, onSelectionChange }) => {
  return (
    <ProfileSelect
      profiles={viewSelectList}
      onSelectionChange={onSelectionChange}
    />
  )
}
