import _ from 'lodash'

const mapArrayAsKeys = (params) =>
  _.chain(params).keyBy('key').mapValues('value').value()

const CampResult = ({ profile }) => {
  profile.meta = mapArrayAsKeys(profile.meta)

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Đăng ký thành công
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Họ tên</th>
              <td>{profile.fullName}</td>
            </tr>
            {profile.meta.paymentMethod === 'BANK' && (
              <tr>
                <th>Nội dung chuyển khoản</th>
                <td>{profile.meta.transactionCode}</td>
              </tr>
            )}
            <tr>
              <th>Thông báo</th>
              <td>{profile.meta.message}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default CampResult
