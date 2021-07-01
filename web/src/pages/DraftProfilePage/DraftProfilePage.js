import DraftProfilesLayout from 'src/layouts/DraftProfilesLayout'
import DraftProfileCell from 'src/components/DraftProfileCell'
import SmsPortalCell from 'src/components/SmsPortalCell'

const DraftProfilePage = ({ id }) => {
  return (
    <DraftProfilesLayout>
      <DraftProfileCell id={id} />
      <SmsPortalCell id={id} />
    </DraftProfilesLayout>
  )
}

export default DraftProfilePage
