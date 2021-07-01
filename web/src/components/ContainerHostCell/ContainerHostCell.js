import ContainerHost from 'src/components/ContainerHost'

export const QUERY = gql`
  query FIND_CONTAINER_HOST_BY_ID($id: String!) {
    containerHost: containerHost(id: $id) {
      id
      name
      contact
      note
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>ContainerHost not found</div>

export const Success = ({ containerHost }) => {
  return <ContainerHost containerHost={containerHost} />
}
