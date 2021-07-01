import MetasLayout from 'src/layouts/MetasLayout'
import MetaCell from 'src/components/MetaCell'

const MetaPage = ({ id }) => {
  return (
    <MetasLayout>
      <MetaCell id={id} />
    </MetasLayout>
  )
}

export default MetaPage
