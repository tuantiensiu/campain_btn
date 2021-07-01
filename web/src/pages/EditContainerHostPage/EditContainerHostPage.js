import ContainerHostsLayout from 'src/layouts/ContainerHostsLayout'
import EditContainerHostCell from 'src/components/EditContainerHostCell'

const EditContainerHostPage = ({ id }) => {
  return (
    <ContainerHostsLayout>
      <EditContainerHostCell id={id} />
    </ContainerHostsLayout>
  )
}

export default EditContainerHostPage
