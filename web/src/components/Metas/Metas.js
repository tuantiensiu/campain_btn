import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

const DELETE_META_MUTATION = gql`
  mutation DeleteMetaMutation($id: String!) {
    deleteMeta(id: $id) {
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

const MetasList = ({ metas }) => {
  const { addMessage } = useFlash()
  const [deleteMeta] = useMutation(DELETE_META_MUTATION, {
    onCompleted: () => {
      addMessage('Meta deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete meta ' + id + '?')) {
      deleteMeta({ variables: { id }, refetchQueries: ['METAS'] })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Key</th>
            <th>Value</th>
            <th>Type</th>
            <th>Draft profile id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {metas.map((meta) => (
            <tr key={meta.id}>
              <td>{truncate(meta.id)}</td>
              <td>{truncate(meta.key)}</td>
              <td>{truncate(meta.value)}</td>
              <td>{truncate(meta.type)}</td>
              <td>{truncate(meta.draftProfileId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.meta({ id: meta.id })}
                    title={'Show meta ' + meta.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editMeta({ id: meta.id })}
                    title={'Edit meta ' + meta.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete meta ' + meta.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(meta.id)}
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

export default MetasList
