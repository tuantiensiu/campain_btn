import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import ContainerTypeForm from 'src/components/ContainerTypeForm'

export const QUERY = gql`
  query FIND_CONTAINER_TYPE_BY_ID($id: String!) {
    containerType: containerType(id: $id) {
      id
      slug
      name
    }
  }
`
const UPDATE_CONTAINER_TYPE_MUTATION = gql`
  mutation UpdateContainerTypeMutation(
    $id: String!
    $input: UpdateContainerTypeInput!
  ) {
    updateContainerType(id: $id, input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ containerType }) => {
  const { addMessage } = useFlash()
  const [updateContainerType, { loading, error }] = useMutation(
    UPDATE_CONTAINER_TYPE_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.containerTypes())
        addMessage('ContainerType updated.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input, id) => {
    updateContainerType({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit ContainerType {containerType.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ContainerTypeForm
          containerType={containerType}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
