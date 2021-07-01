import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_CONTAINER_ROLE_MUTATION = gql`
  mutation DeleteContainerRoleMutation($id: String!) {
    deleteContainerRole(id: $id) {
      id
    }
  }
`

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const ContainerRole = ({ containerRole }) => {
  const { addMessage } = useFlash()
  const [deleteContainerRole] = useMutation(DELETE_CONTAINER_ROLE_MUTATION, {
    onCompleted: () => {
      navigate(routes.containerRoles())
      addMessage('ContainerRole deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete containerRole ' + id + '?')) {
      deleteContainerRole({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            ContainerRole {containerRole.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{containerRole.id}</td>
            </tr>
            <tr>
              <th>Slug</th>
              <td>{containerRole.slug}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{containerRole.name}</td>
            </tr>
            <tr>
              <th>Container id</th>
              <td>{containerRole.containerId}</td>
            </tr>
            <tr>
              <th>Profile id</th>
              <td>{containerRole.profileId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editContainerRole({ id: containerRole.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(containerRole.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default ContainerRole
