import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const ContainerRoleForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.containerRole?.id)
  }

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
          name="slug"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Slug
        </Label>
        <TextField
          name="slug"
          defaultValue={props.containerRole?.slug}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="slug" className="rw-field-error" />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>
        <TextField
          name="name"
          defaultValue={props.containerRole?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="name" className="rw-field-error" />

        <Label
          name="containerId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Container id
        </Label>
        <TextField
          name="containerId"
          defaultValue={props.containerRole?.containerId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="containerId" className="rw-field-error" />

        <Label
          name="profileId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Profile id
        </Label>
        <TextField
          name="profileId"
          defaultValue={props.containerRole?.profileId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="profileId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ContainerRoleForm
