import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

const DELETE_CONTAINER_HOST_MUTATION = gql`
  mutation DeleteContainerHostMutation($id: String!) {
    deleteContainerHost(id: $id) {
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

const ContainerHostsList = ({ containerHosts }) => {
  const { addMessage } = useFlash()
  const [deleteContainerHost] = useMutation(DELETE_CONTAINER_HOST_MUTATION, {
    onCompleted: () => {
      addMessage('ContainerHost deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete containerHost ' + id + '?')) {
      deleteContainerHost({
        variables: { id },
        refetchQueries: ['CONTAINER_HOSTS'],
      })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Note</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {containerHosts.map((containerHost) => (
            <tr key={containerHost.id}>
              <td>{truncate(containerHost.id)}</td>
              <td>{truncate(containerHost.name)}</td>
              <td>{truncate(containerHost.contact)}</td>
              <td>{truncate(containerHost.note)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.containerHost({ id: containerHost.id })}
                    title={'Show containerHost ' + containerHost.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editContainerHost({ id: containerHost.id })}
                    title={'Edit containerHost ' + containerHost.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete containerHost ' + containerHost.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(containerHost.id)}
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

export default ContainerHostsList
