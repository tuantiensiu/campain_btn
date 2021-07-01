import DraftProfilesLayout from 'src/layouts/DraftProfilesLayout'
import EditDraftProfileCell from 'src/components/EditDraftProfileCell'

const EditDraftProfilePage = ({ id }) => {
  return (
    <DraftProfilesLayout>
      <EditDraftProfileCell id={id} />
    </DraftProfilesLayout>
  )
}

export default EditDraftProfilePage
