import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import ContainerHostForm from 'src/components/ContainerHostForm'

export const QUERY = gql`
  query FIND_CONTAINER_HOST_BY_ID($id: String!) {
    containerHost: containerHost(id: $id) {
      id
      name
      contact
      note
    }
  }
`
const UPDATE_CONTAINER_HOST_MUTATION = gql`
  mutation UpdateContainerHostMutation(
    $id: String!
    $input: UpdateContainerHostInput!
  ) {
    updateContainerHost(id: $id, input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ containerHost }) => {
  const { addMessage } = useFlash()
  const [updateContainerHost, { loading, error }] = useMutation(
    UPDATE_CONTAINER_HOST_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.containerHosts())
        addMessage('ContainerHost updated.', { classes: 'rw-flash-success' })
      },
    }
  )

  const onSave = (input, id) => {
    updateContainerHost({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit ContainerHost {containerHost.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ContainerHostForm
          containerHost={containerHost}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
