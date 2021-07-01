import { useState } from 'react'
import Select from 'react-select'

export const QUERY = gql`
  query VIEW_SELECT_LIST(
    $type: String!
    $excludeIds: [String!]
    $valueProp: String
    $labelProp: String
  ) {
    viewSelectList(
      type: $type
      excludeIds: $excludeIds
      labelProp: $labelProp
      valueProp: $valueProp
    ) {
      value
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

export const Success = ({ viewSelectList, value, onChange }) => {
  const [selected, setSelected] = useState(value)
  const changeOption = (opt) => {
    setSelected(opt)
    onChange(opt.value)
  }
  return (
    <Select onChange={changeOption} options={viewSelectList} value={selected} />
  )
}
