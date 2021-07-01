import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_CONTAINER_MUTATION = gql`
  mutation DeleteContainerMutation($id: String!) {
    deleteContainer(id: $id) {
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

const Container = ({ container }) => {
  const { addMessage } = useFlash()
  const [deleteContainer] = useMutation(DELETE_CONTAINER_MUTATION, {
    onCompleted: () => {
      navigate(routes.containers())
      addMessage('Container deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete container ' + id + '?')) {
      deleteContainer({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Container {container.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{container.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{container.name}</td>
            </tr>
            <tr>
              <th>Note</th>
              <td>{container.note}</td>
            </tr>
            <tr>
              <th>Capacity</th>
              <td>{container.capacity}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(container.updatedAt)}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(container.createdAt)}</td>
            </tr>
            <tr>
              <th>Container type id</th>
              <td>{container.containerTypeId}</td>
            </tr>
            <tr>
              <th>Container host id</th>
              <td>{container.containerHostId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editContainer({ id: container.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(container.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Container
