import ContainerTypesLayout from 'src/layouts/ContainerTypesLayout'
import ContainerTypeCell from 'src/components/ContainerTypeCell'

const ContainerTypePage = ({ id }) => {
  return (
    <ContainerTypesLayout>
      <ContainerTypeCell id={id} />
    </ContainerTypesLayout>
  )
}

export default ContainerTypePage
