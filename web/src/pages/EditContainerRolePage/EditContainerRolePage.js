import ContainerRolesLayout from 'src/layouts/ContainerRolesLayout'
import EditContainerRoleCell from 'src/components/EditContainerRoleCell'

const EditContainerRolePage = ({ id }) => {
  return (
    <ContainerRolesLayout>
      <EditContainerRoleCell id={id} />
    </ContainerRolesLayout>
  )
}

export default EditContainerRolePage
