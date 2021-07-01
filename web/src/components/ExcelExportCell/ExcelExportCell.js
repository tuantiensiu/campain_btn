import exportFromJSON from 'export-from-json'
import _ from 'lodash'
import dayjs from 'dayjs'
// import utc from 'dayjs/plugin/utc'
// import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/vi'

const mapArrayAsKeys = (params) =>
  _.chain(params).keyBy('key').mapValues('value').value()

export const QUERY = gql`
  query DRAFT_PROFILES {
    draftProfiles {
      id
      fullName
      nationalId
      phoneNumber
      birthday
      createdAt
      meta {
        id
        key
        value
      }
      containers {
        container {
          type {
            slug
          }
          name
        }
      }
    }
  }
`

const FORM_MODELS = {
  clothesSize: [
    { value: 'S', title: 'S|< 50 kg' },
    { value: 'M', title: 'M|50-60 kg' },
    { value: 'L', title: 'L|60-70 kg' },
    { value: 'XL', title: 'XL|< 80 kg' },
    { value: 'XXL', title: 'XXL|> 80 kg' },
    { value: 'Other', title: 'Khác' },
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
  // eslint-disable-next-line prefer-spread
  groups: Array.apply(null, { length: 15 })
    .map(Number.call, Number)
    .map((i) => ({ value: i + 1, title: i + 1 })),
  joinAge: [
    { value: 'gt3', title: 'Trên 3 tháng' },
    { value: 'lt3', title: 'Dưới 3 tháng' },
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
    { value: 'full', title: 'Tham dự trọn khóa học Thánh Kinh Hè' },
    {
      value: 'not_full',
      title: 'Tham dự môn học ngoại khóa cho bé từ 9-12 tuổi',
    },
    // { value: 'PARTIAL', title: 'Đặt cọc|500.000đ' },
  ],
  gender: [
    { value: 'MALE', title: 'Nam' },
    { value: 'FEMALE', title: 'Nữ' },
  ],
}

const metaTitle = (model, metaValue) => {
  for (const meta of FORM_MODELS[model]) {
    if (meta.value === metaValue) {
      return meta.title
    }
  }
  return metaValue
}

const birthdayTag = (birthday) => {
  return dayjs(birthday).format('DD/MM/YYYY')
}

const containerTag = (typeSlug, array) => {
  const el = array.find((x) => x.container.type.slug === typeSlug)
  if (el) {
    return (el.container.name || '').replace(/(Xe Số|Phòng)/g, '')
  }
  return ''
}

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ draftProfiles }) => {
  const ex = () => {
    let table = []
    let i = 1
    for (const profile of draftProfiles) {
      const meta = mapArrayAsKeys(profile.meta)
      const paymentStage = meta.paymentStage
      const paymentLevel = parseInt(meta.paymentLevel)
      const offering = parseInt(meta.offering) || 0
      const totalDeposit = paymentLevel + offering
      const balance = parseInt(meta.amount) || 0
      const status =
        balance >= totalDeposit
          ? 'Đã hoàn tất lệ phí'
          : balance > 0 && balance < totalDeposit && paymentStage === 'PARTIAL'
          ? 'Đã đóng cọc'
          : 'Chưa hoàn tất'
      const note = meta.status === 'NO_PAYMENT' ? '' : meta.status
      const nameSplit = profile.fullName.trim().split(' ')
      const firstName = nameSplit.pop()
      const lastName = nameSplit.join(' ')
      table.push({
        STT: i++,
        Họ: lastName,
        Tên: firstName,
        'Họ và tên bé': meta.fullNameChild,
        'Giới tính': metaTitle('gender', meta.gender),
        // CMND: "'" + profile.nationalId,
        'Số điện thoại': profile.phoneNumber.replace('+84', "'0"),
        'Ngày sinh': birthdayTag(profile.birthday),
        'Chăm sóc đặc biệt': meta.specialCare,
        'Size áo': meta.clothesSize,
        Lớp: metaTitle('classRoom', meta.class),
        'Hình thức học': meta.paymentStage,
        'Mức đóng lệ phí': paymentLevel,
        'Dâng hiến': offering,
        'Tổng cần thu': totalDeposit,
        'Đã nộp': balance,
        'Trạng thái': status,
        'Ngày nộp': birthdayTag(profile.createdAt),
        // Xe: containerTag('BUS', profile.containers),
        // Phòng: containerTag('ROOM', profile.containers),
        'Ghi chú': note,
      })
      table = _.orderBy(table, ['Tên'], ['asc'])
    }
    exportFromJSON({
      data: table,
      fileName: 'trai' + dayjs().format('YYYYMMDD-HHmm'),
      exportType: 'xls',
      // exportType: 'csv',
    })
  }
  return (
    <button onClick={ex} className="rw-button rw-button-large">
      Xuất Excel
    </button>
  )
}
