export const QUERY = gql`
  query SMSBalanceQuery {
    smsBalance
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ smsBalance }) => {
  return (
    <div className="bg-green-800 rounded p-2 text-white">
      <span>SMS còn lại: {Math.round(smsBalance / 450)}</span>
    </div>
  )
}
