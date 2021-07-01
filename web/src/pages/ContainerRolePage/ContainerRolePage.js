import ContainerRolesLayout from 'src/layouts/ContainerRolesLayout'
import ContainerRoleCell from 'src/components/ContainerRoleCell'

const ContainerRolePage = ({ id }) => {
  return (
    <ContainerRolesLayout>
      <ContainerRoleCell id={id} />
    </ContainerRolesLayout>
  )
}

export default ContainerRolePage
