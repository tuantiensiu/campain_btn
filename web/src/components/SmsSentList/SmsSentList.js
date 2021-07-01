const SmsSentList = ({ smsList = [] }) => {
  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Danh sách tin nhắn
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            {smsList.map((smsContent, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{smsContent.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default SmsSentList
