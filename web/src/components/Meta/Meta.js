import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_META_MUTATION = gql`
  mutation DeleteMetaMutation($id: String!) {
    deleteMeta(id: $id) {
      id
    }
  }
`

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

const Meta = ({ meta }) => {
  const { addMessage } = useFlash()
  const [deleteMeta] = useMutation(DELETE_META_MUTATION, {
    onCompleted: () => {
      navigate(routes.metas())
      addMessage('Meta deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete meta ' + id + '?')) {
      deleteMeta({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Meta {meta.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{meta.id}</td>
            </tr>
            <tr>
              <th>Key</th>
              <td>{meta.key}</td>
            </tr>
            <tr>
              <th>Value</th>
              <td>{meta.value}</td>
            </tr>
            <tr>
              <th>Type</th>
              <td>{meta.type}</td>
            </tr>
            <tr>
              <th>Draft profile id</th>
              <td>{meta.draftProfileId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editMeta({ id: meta.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(meta.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Meta
