import { Link, routes } from '@redwoodjs/router'
import { Flash } from '@redwoodjs/web'

const DraftProfilesLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <Flash timeout={1000} />
      <header className="rw-header max-w-full">
        <div className="flex flex-row justify-between max-w-full rw-heading rw-heading-primary">
          <Link to={routes.draftProfiles()} className="rw-button">
            Danh sách trại viên
          </Link>
          <Link to={routes.containers()} className="rw-button">
            Danh sách phòng & xe
          </Link>
          {/* <Link to={routes.bulkSms()} className="rw-button">
            Gửi tin nhắn hàng loạt
          </Link> */}
        </div>
        {/* <Link
          to={routes.newDraftProfile()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New DraftProfile
        </Link> */}
      </header>
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default DraftProfilesLayout
