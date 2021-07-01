import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

const DELETE_CONTAINER_ROLE_MUTATION = gql`
  mutation DeleteContainerRoleMutation($id: String!) {
    deleteContainerRole(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const ContainerRolesList = ({ containerRoles }) => {
  const { addMessage } = useFlash()
  const [deleteContainerRole] = useMutation(DELETE_CONTAINER_ROLE_MUTATION, {
    onCompleted: () => {
      addMessage('ContainerRole deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete containerRole ' + id + '?')) {
      deleteContainerRole({
        variables: { id },
        refetchQueries: ['CONTAINER_ROLES'],
      })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Slug</th>
            <th>Name</th>
            <th>Container id</th>
            <th>Profile id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {containerRoles.map((containerRole) => (
            <tr key={containerRole.id}>
              <td>{truncate(containerRole.id)}</td>
              <td>{truncate(containerRole.slug)}</td>
              <td>{truncate(containerRole.name)}</td>
              <td>{truncate(containerRole.containerId)}</td>
              <td>{truncate(containerRole.profileId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.containerRole({ id: containerRole.id })}
                    title={'Show containerRole ' + containerRole.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editContainerRole({ id: containerRole.id })}
                    title={'Edit containerRole ' + containerRole.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete containerRole ' + containerRole.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(containerRole.id)}
                  >
                    Delete
                  </a>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ContainerRolesList
