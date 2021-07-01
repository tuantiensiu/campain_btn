import ContainersLayout from 'src/layouts/ContainersLayout'
import EditContainerCell from 'src/components/EditContainerCell'

const EditContainerPage = ({ id }) => {
  return (
    <ContainersLayout>
      <EditContainerCell id={id} />
    </ContainersLayout>
  )
}

export default EditContainerPage
