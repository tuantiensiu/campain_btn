import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const ContainerHostForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.containerHost?.id)
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
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>
        <TextField
          name="name"
          defaultValue={props.containerHost?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="name" className="rw-field-error" />

        <Label
          name="contact"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Contact
        </Label>
        <TextField
          name="contact"
          defaultValue={props.containerHost?.contact}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="contact" className="rw-field-error" />

        <Label
          name="note"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Note
        </Label>
        <TextField
          name="note"
          defaultValue={props.containerHost?.note}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="note" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ContainerHostForm
