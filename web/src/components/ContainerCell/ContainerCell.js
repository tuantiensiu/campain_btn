import Container from 'src/components/Container'

export const QUERY = gql`
  query FIND_CONTAINER_BY_ID($id: String!) {
    container: container(id: $id) {
      id
      name
      note
      capacity
      updatedAt
      createdAt
      containerTypeId
      containerHostId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Container not found</div>

export const Success = ({ container }) => {
  return <Container container={container} />
}
