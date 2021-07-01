import ContainerRole from 'src/components/ContainerRole'

export const QUERY = gql`
  query FIND_CONTAINER_ROLE_BY_ID($id: String!) {
    containerRole: containerRole(id: $id) {
      id
      slug
      name
      containerId
      profileId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>ContainerRole not found</div>

export const Success = ({ containerRole }) => {
  return <ContainerRole containerRole={containerRole} />
}
