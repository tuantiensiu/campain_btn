import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
  useMutation,
} from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import gql from 'graphql-tag'

const UPDATE_META = gql`
  mutation UpdateMetaMutation($id: String!, $input: UpdateMetaInput!) {
    updateMeta(id: $id, input: $input) {
      id
    }
  }
`

const MetaForm = (props) => {
  const [update, { loading }] = useMutation(UPDATE_META, {
    onCompleted: () => {
      navigate(routes.draftProfile({ id: props.meta?.draftProfileId }))
    },
  })
  const onSubmit = (data) => {
    console.log('form', data)
    update({ variables: { id: props?.meta?.id, input: data } })
    // props.onSave(data, props?.meta?.id)
  }

  if (loading) return 'Loading...'

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="value"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Giá trị
        </Label>
        <TextField
          name="value"
          defaultValue={props.meta?.value}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="value" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Lưu
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default MetaForm
