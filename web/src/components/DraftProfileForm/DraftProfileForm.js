import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/web'

const DraftProfileForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.draftProfile?.id)
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
          name="fullName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Full name
        </Label>
        <TextField
          name="fullName"
          defaultValue={props.draftProfile?.fullName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="fullName" className="rw-field-error" />

        <Label
          name="nationalId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          National id
        </Label>
        <TextField
          name="nationalId"
          defaultValue={props.draftProfile?.nationalId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="nationalId" className="rw-field-error" />

        <Label
          name="phoneNumber"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Phone number
        </Label>
        <TextField
          name="phoneNumber"
          defaultValue={props.draftProfile?.phoneNumber}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="phoneNumber" className="rw-field-error" />

        <Label
          name="birthday"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Birthday
        </Label>
        <TextField
          name="birthday"
          defaultValue={props.draftProfile?.birthday}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="birthday" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default DraftProfileForm
