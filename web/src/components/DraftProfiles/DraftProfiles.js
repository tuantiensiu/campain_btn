import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/vi'

import _ from 'lodash'

dayjs.extend(utc)
dayjs.extend(relativeTime)

const FORM_MODELS = {
  clothesSize: [
    { value: 'S', title: 'S|< 50 kg' },
    { value: 'M', title: 'M|50-60 kg' },
    { value: 'L', title: 'L|60-70 kg' },
    { value: 'XL', title: 'XL|< 80 kg' },
    { value: 'XXL', title: 'XXL|> 80 kg' },
    { value: 'Other', title: 'Khác' },
  ],
  // eslint-disable-next-line prefer-spread
  groups: Array.apply(null, { length: 15 })
    .map(Number.call, Number)
    .map((i) => ({ value: i + 1, title: i + 1 })),
  joinAge: [
    { value: 'gt3', title: 'Trên 3 tháng' },
    { value: 'lt3', title: 'Dưới 3 tháng' },
  ],
  classRoom: [
    { value: '1', title: 'Y-sác' },
    { value: '2', title: 'Môi-se' },
    { value: '3', title: 'Giô-suê' },
    { value: '4', title: 'Đê-bô-ra' },
    { value: '5', title: 'Ru-tơ' },
    { value: '6', title: 'Sa-mu-ên A' },
    { value: '7', title: 'Sa-mu-ên B' },
    { value: '8', title: 'Đa-vít A' },
    { value: '9', title: 'Đa-vít B' },
    { value: '10', title: 'Ê-li-sê' },
    { value: '11', title: 'Ê-xơ-tê' },
    { value: '12', title: 'Ma-ri A' },
    { value: '13', title: 'Ma-ri B' },
    { value: '14', title: 'Chưa tham gia BTN' },
  ],
  paymentLevel: {
    lt3: [{ value: '1500000', title: 'Bạn mới|1.500.000đ' }],
    gt3: [
      { value: '750000', title: 'Sinh viên, thu nhập dưới 3 triệu|750.000đ' },
      { value: '1100000', title: 'Thu nhập 3-5 triệu|1.100.000đ' },
      { value: '1300000', title: 'Thu nhập trên 5-7 triệu|1.300.000đ' },
      { value: '1500000', title: 'Thu nhập trên 7 triệu|1.500.000đ' },
    ],
  },
  paymentMethod: [
    { value: 'BANK', title: 'Chuyển khoản trực tiếp cho thủ quỹ' },
    { value: 'GROUP_LEADER', title: 'Nộp tiền mặt trực tiếp cho nhóm trưởng' },
    { value: 'MANAGER', title: 'Nộp tiền mặt trực tiếp cho thủ quỹ' },
  ],
  paymentStage: [
    { value: 'FULL', title: 'Đóng đủ một lần' },
    { value: 'PARTIAL', title: 'Đặt cọc|500.000đ' },
  ],
  gender: [
    { value: 'MALE', title: 'Nam' },
    { value: 'FEMALE', title: 'Nữ' },
  ],
}

const mapArrayAsKeys = (params) =>
  _.chain(params).keyBy('key').mapValues('value').value()

const DELETE_DRAFT_PROFILE_MUTATION = gql`
  mutation DeleteDraftProfileMutation($id: String!) {
    deleteDraftProfile(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const metaTitle = (model, metaValue) => {
  for (const meta of FORM_MODELS[model]) {
    if (meta.value === metaValue) {
      return meta.title || ''
    }
  }
  return metaValue || ''
}

const birthdayTag = (birthday) => {
  return dayjs(birthday).format('DD/MM/YYYY')
}

const createdAtTag = (time) => {
  return dayjs(time).format('HH:mm DD/MM/YYYY')
}

const timeTag = (datetime) => {
  return dayjs(datetime).locale('vi').fromNow()
}

const containerTag = (typeSlug, array) => {
  const el = array.find((x) => x.container.type.slug === typeSlug)
  if (el) {
    return (el.container.name || '').replace(/(Xe Số|Phòng)/g, '')
  }
  return ''
}

const currency = (amount) => {
  if (amount > 0) {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    })
    return formatter.format(amount)
  }
  return null
}

const DraftProfilesList = ({ draftProfiles }) => {
  const { addMessage } = useFlash()

  // Preprocess meta data
  const table = []
  for (const profile of draftProfiles) {
    const obj = mapArrayAsKeys(profile.meta)
    profile.metaKey = {}
    for (const meta of profile.meta) {
      profile.metaKey[meta.key] = meta
    }
    table.push({ ...profile, ...obj })
  }

  const [deleteDraftProfile] = useMutation(DELETE_DRAFT_PROFILE_MUTATION, {
    onCompleted: () => {
      addMessage('DraftProfile deleted.', { classes: 'rw-flash-success' })
    },
  })

  // const onDeleteClick = (id) => {
  //   if (confirm('Bạn có chắc chắn xóa hồ sơ của ' + id + '?')) {
  //     deleteDraftProfile({
  //       variables: { id },
  //       refetchQueries: ['DRAFT_PROFILES'],
  //     })
  //   }
  // }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>STT</th>
            {/* <th>CMND</th> */}
            <th>Họ và tên phụ huynh</th>
            <th>Số điện thoại</th>
            <th>Họ và tên bé</th>
            <th>Sinh nhật</th>
            <th>Lớp</th>
            <th>Size Áo</th>
            {/* <th>Thời gian nhóm lại</th> */}
            <th>Mức đóng</th>
            <th>Dâng thêm</th>
            <th>Đã nộp</th>
            <th>Hình thức đóng phí</th>
            <th>Hình thức học</th>
            <th>Note</th>
            <th>Thời gian</th>
            {/* <th>Xe</th> */}
            {/* <th>Phòng</th> */}
            <th>Hành động&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {table.map((draftProfile, index) => (
            <tr key={draftProfile.id}>
              <td>{index + 1}</td>
              {/* <td>{truncate(draftProfile.nationalId)}</td> */}
              <td>{truncate(draftProfile.fullName)}</td>
              <td>{truncate(draftProfile.phoneNumber)}</td>
              <td>{truncate(draftProfile.fullNameChild)}</td>
              <td>{birthdayTag(draftProfile.birthday)}</td>
              {/* <td>{truncate(draftProfile.class)}</td> */}
              <td>{metaTitle('classRoom', draftProfile.class)}</td>
              <td>{truncate(draftProfile.clothesSize)}</td>
              {/* <td>{metaTitle('joinAge', draftProfile.joinAge)}</td> */}
              <td>{currency(draftProfile.paymentLevel)}</td>
              <td>{currency(draftProfile.offering)}</td>
              <td>{currency(draftProfile.amount)}</td>
              <td>
                {metaTitle('paymentMethod', draftProfile.paymentMethod).replace(
                  ' trực tiếp',
                  ''
                )}
              </td>
              <td>{truncate(draftProfile.paymentStage)}</td>
              <td>
                {draftProfile.status === 'NO_PAYMENT'
                  ? ''
                  : draftProfile.status}
              </td>
              <td>
                <Link to="#" title={timeTag(draftProfile.createdAt)}>
                  {createdAtTag(draftProfile.createdAt)}
                </Link>
              </td>
              {/* <td>{containerTag('BUS', draftProfile.containers)}</td> */}
              {/* <td>{containerTag('ROOM', draftProfile.containers)}</td> */}
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.draftProfile({ id: draftProfile.id })}
                    title={'Xem chi tiết thông tin ' + draftProfile.fullName}
                    className="rw-button rw-button-large"
                  >
                    Xem
                  </Link>
                  {draftProfile.metaKey.amount ? (
                    <Link
                      to={routes.editMeta({
                        id: draftProfile.metaKey.amount.id,
                      })}
                      title={'Cập nhật lệ phí cho ' + draftProfile.fullName}
                      className="rw-button rw-button-large"
                    >
                      Nộp
                    </Link>
                  ) : null}
                  {/* <Link
                    to={routes.editDraftProfile({ id: draftProfile.id })}
                    title={'Sửa hồ sơ gốc của ' + draftProfile.fullName}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    SMS
                  </Link> */}
                  {/* <a
                    href="#"
                    title={'Delete draftProfile ' + draftProfile.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(draftProfile.id)}
                  >
                    Xóa
                  </a> */}
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DraftProfilesList
