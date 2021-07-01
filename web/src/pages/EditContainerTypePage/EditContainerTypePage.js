import ContainerTypesLayout from 'src/layouts/ContainerTypesLayout'
import EditContainerTypeCell from 'src/components/EditContainerTypeCell'

const EditContainerTypePage = ({ id }) => {
  return (
    <ContainerTypesLayout>
      <EditContainerTypeCell id={id} />
    </ContainerTypesLayout>
  )
}

export default EditContainerTypePage
