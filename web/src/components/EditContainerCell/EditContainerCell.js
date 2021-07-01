import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import ContainerForm from 'src/components/ContainerForm'

export const QUERY = gql`
  query FIND_CONTAINER_BY_ID($id: String!) {
    container: container(id: $id) {
      id
      name
      note
      capacity
      updatedAt
      createdAt
      containerTypeId
      containerHostId
    }
  }
`
const UPDATE_CONTAINER_MUTATION = gql`
  mutation UpdateContainerMutation(
    $id: String!
    $input: UpdateContainerInput!
  ) {
    updateContainer(id: $id, input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ container }) => {
  const { addMessage } = useFlash()
  const [updateContainer, { loading, error }] = useMutation(
    UPDATE_CONTAINER_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.containers())
        addMessage('Container updated.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input, id) => {
    updateContainer({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Container {container.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ContainerForm
          container={container}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
