import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import ContainerRoleForm from 'src/components/ContainerRoleForm'

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
const UPDATE_CONTAINER_ROLE_MUTATION = gql`
  mutation UpdateContainerRoleMutation(
    $id: String!
    $input: UpdateContainerRoleInput!
  ) {
    updateContainerRole(id: $id, input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ containerRole }) => {
  const { addMessage } = useFlash()
  const [updateContainerRole, { loading, error }] = useMutation(
    UPDATE_CONTAINER_ROLE_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.containerRoles())
        addMessage('ContainerRole updated.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input, id) => {
    updateContainerRole({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit ContainerRole {containerRole.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ContainerRoleForm
          containerRole={containerRole}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
