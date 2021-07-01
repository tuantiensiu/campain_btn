import MetasLayout from 'src/layouts/MetasLayout'
import EditMetaCell from 'src/components/EditMetaCell'

const EditMetaPage = ({ id }) => {
  return (
    <MetasLayout>
      <EditMetaCell id={id} />
    </MetasLayout>
  )
}

export default EditMetaPage
