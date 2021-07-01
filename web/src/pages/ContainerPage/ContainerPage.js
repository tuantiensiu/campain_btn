import ContainersLayout from 'src/layouts/ContainersLayout'
import ContainerCell from 'src/components/ContainerCell'

const ContainerPage = ({ id }) => {
  return (
    <ContainersLayout>
      <ContainerCell id={id} />
    </ContainersLayout>
  )
}

export default ContainerPage
