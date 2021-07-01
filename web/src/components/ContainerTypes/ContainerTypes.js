import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

const DELETE_CONTAINER_TYPE_MUTATION = gql`
  mutation DeleteContainerTypeMutation($id: String!) {
    deleteContainerType(id: $id) {
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

const ContainerTypesList = ({ containerTypes }) => {
  const { addMessage } = useFlash()
  const [deleteContainerType] = useMutation(DELETE_CONTAINER_TYPE_MUTATION, {
    onCompleted: () => {
      addMessage('ContainerType deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete containerType ' + id + '?')) {
      deleteContainerType({
        variables: { id },
        refetchQueries: ['CONTAINER_TYPES'],
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
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {containerTypes.map((containerType) => (
            <tr key={containerType.id}>
              <td>{truncate(containerType.id)}</td>
              <td>{truncate(containerType.slug)}</td>
              <td>{truncate(containerType.name)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.containerType({ id: containerType.id })}
                    title={'Show containerType ' + containerType.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editContainerType({ id: containerType.id })}
                    title={'Edit containerType ' + containerType.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete containerType ' + containerType.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(containerType.id)}
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

export default ContainerTypesList
