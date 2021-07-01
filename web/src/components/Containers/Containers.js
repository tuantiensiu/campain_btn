import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import ContainerCard from 'src/components/ContainerCard'
import classNames from 'classnames'

const DELETE_CONTAINER_MUTATION = gql`
  mutation DeleteContainerMutation($id: String!) {
    deleteContainer(id: $id) {
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

const ContainersList = ({ containers }) => {
  const { addMessage } = useFlash()
  const [deleteContainer] = useMutation(DELETE_CONTAINER_MUTATION, {
    onCompleted: () => {
      addMessage('Container deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete container ' + id + '?')) {
      deleteContainer({ variables: { id }, refetchQueries: ['CONTAINERS'] })
    }
  }

  return (
    <div
      className={classNames(
        'grid',
        'gap-4',
        'grid-cols-1',
        'sm:grid-cols-2',
        'md:grid-cols-2',
        'lg:grid-cols-3',
        'xl:grid-cols-4'
      )}
    >
      {containers.map((container, key) => (
        <ContainerCard key={key} data={container} />
      ))}
    </div>
  )
}

export default ContainersList
