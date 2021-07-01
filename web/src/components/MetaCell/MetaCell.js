import Meta from 'src/components/Meta'

export const QUERY = gql`
  query FIND_META_BY_ID($id: String!) {
    meta: meta(id: $id) {
      id
      key
      value
      type
      draftProfileId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Meta not found</div>

export const Success = ({ meta }) => {
  return <Meta meta={meta} />
}
