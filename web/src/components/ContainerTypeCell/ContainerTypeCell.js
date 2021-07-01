import ContainerType from 'src/components/ContainerType'

export const QUERY = gql`
  query FIND_CONTAINER_TYPE_BY_ID($id: String!) {
    containerType: containerType(id: $id) {
      id
      slug
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>ContainerType not found</div>

export const Success = ({ containerType }) => {
  return <ContainerType containerType={containerType} />
}
