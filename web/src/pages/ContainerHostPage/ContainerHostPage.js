import ContainerHostsLayout from 'src/layouts/ContainerHostsLayout'
import ContainerHostCell from 'src/components/ContainerHostCell'

const ContainerHostPage = ({ id }) => {
  return (
    <ContainerHostsLayout>
      <ContainerHostCell id={id} />
    </ContainerHostsLayout>
  )
}

export default ContainerHostPage
