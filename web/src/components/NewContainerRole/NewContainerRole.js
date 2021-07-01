import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import ContainerRoleForm from 'src/components/ContainerRoleForm'

const CREATE_CONTAINER_ROLE_MUTATION = gql`
  mutation CreateContainerRoleMutation($input: CreateContainerRoleInput!) {
    createContainerRole(input: $input) {
      id
    }
  }
`

const NewContainerRole = () => {
  const { addMessage } = useFlash()
  const [createContainerRole, { loading, error }] = useMutation(
    CREATE_CONTAINER_ROLE_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.containerRoles())
        addMessage('ContainerRole created.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input) => {
    createContainerRole({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New ContainerRole</h2>
      </header>
      <div className="rw-segment-main">
        <ContainerRoleForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewContainerRole
