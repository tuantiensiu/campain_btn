import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import MetaForm from 'src/components/MetaForm'

export const QUERY = gql`
  query FIND_META_BY_ID($id: String!) {
    meta: meta(id: $id) {
      id
      key
      value
      type
      draftProfileId
      DraftProfile {
        fullName
      }
    }
  }
`
const UPDATE_META_MUTATION = gql`
  mutation UpdateMetaMutation($id: String!, $input: UpdateMetaInput!) {
    updateMeta(id: $id, input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ meta }) => {
  const { addMessage } = useFlash()
  const [updateMeta, { loading, error }] = useMutation(UPDATE_META_MUTATION, {
    onCompleted: () => {
      navigate(routes.metas())
      addMessage('Meta updated.', { classes: 'rw-flash-success' })
    },
  })

  const onSave = (input, id) => {
    updateMeta({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Cập nhật chi tiết {meta.key} của {meta.DraftProfile.fullName}
        </h2>
      </header>
      <div className="rw-segment-main">
        <MetaForm meta={meta} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
