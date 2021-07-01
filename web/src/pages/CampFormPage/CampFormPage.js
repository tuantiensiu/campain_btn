import { useState } from 'react'
import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import {
  Form,
  TextField,
  Submit,
  FieldError,
  Label,
  NumberField,
} from '@redwoodjs/forms'

import Lottie from 'lottie-react-web'
import animation from './form-submitting.json'

import GridRadio from 'src/components/GridRadio'
import gql from 'graphql-tag'

const CAMP_REGISTER = gql`
  mutation campRegister($input: CreateCampRegisterInput!) {
    campRegister(input: $input) {
      id
    }
  }
`
const FORM_MODELS = {
  clothesSize: [
    { value: '2', title: '2|12-15 kg' },
    { value: '4', title: '4|16-20 kg' },
    { value: '6', title: '6|21-25 kg' },
    { value: '8', title: '8|26-30 kg' },
    { value: '10', title: '10|31-34 kg' },
    { value: '12', title: '12|35-38 kg' },
    { value: '14', title: '14|39-42 kg' },
    { value: 'S', title: 'S|43-46 kg' },
    { value: 'M', title: 'M|47-50 kg' },
    { value: 'L', title: 'L|50-54 kg' },
    { value: 'XL', title: 'XL|55-62 kg' },
    { value: 'XXL', title: '2XL|63-70 kg' },
    { value: 'XXXL', title: '3XL|71-90 kg' },
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
  groups: Array.apply(null, { length: 16 })
    .map(Number.call, Number)
    .map((i) => ({ value: i + 1, title: i + 1 })),
  joinAge: [
    { value: 'gt3', title: 'Trên 3 tháng' },
    { value: 'lt3', title: 'Dưới 3 tháng' },
  ],
  paymentLevel: {
    lt3: [{ value: '150000', title: 'Chi phí trại viên|150.000đ' }],
    gt3: [
      { value: '150000', title: 'Chi phí trại viên|150.000đ' },
      // { value: '1100000', title: 'Thu nhập 3-5 triệu|1.100.000đ' },
      // { value: '1300000', title: 'Thu nhập trên 5-7 triệu|1.300.000đ' },
      // { value: '1500000', title: 'Thu nhập trên 7 triệu|1.500.000đ' },
    ],
  },
  paymentMethod: [
    { value: 'BANK', title: 'Chuyển khoản trực tiếp cho thủ quỹ' },
    { value: 'GROUP_LEADER', title: 'Nộp tiền mặt trực tiếp cho giáo viên' },
    // { value: 'MANAGER', title: 'Nộp tiền mặt trực tiếp cho thủ quỹ' },
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

export default function FormPage() {
  const [done, setDone] = useState(false)
  const [register, { loading }] = useMutation(CAMP_REGISTER, {
    onCompleted: (data) => {
      setTimeout(() => {
        navigate(routes.campPostSubmit({ id: data.campRegister.id }))
      }, 2000)
    },
  })

  const [meta, setMeta] = useState({
    clothesSize: 'M',
    group: 1,
    class: 1,
    joinAge: 'gt3',
    gender: 'MALE',
    paymentLevel: '150000',
    offering: 0,
    fullNameChild: '',
    specialCare: '',
    paymentMethod: 'BANK',
    paymentStage: 'FULL',
    season: new Date().getFullYear() + '',
    sms: false, // Is sms sent?
    active: true, // Is the form active?
    completed: false, // Is the form completed payment
    status: 'NO_PAYMENT',
    amount: 0,
  })

  const onSubmit = (data) => {
    // Switch to custom value
    if (meta.clothesSize === 'Other') {
      meta.clothesSize = data.clothesSize
    }
    // Map meta input
    meta.offering = data.offering
    meta.fullNameChild = data.fullNameChild
    meta.specialCare = data.specialCare
    register({
      variables: {
        input: {
          fullName: String(data.fullName),
          // nationalId: String(data.nationalId),
          phoneNumber: data.phoneNumber,
          birthday: new Date(
            data.yearOfBirth,
            data.monthOfBirth - 1,
            data.dayOfBirth
          ),
          meta: JSON.stringify(meta),
        },
      },
    })
    setDone(true)
  }

  const onChangeRadio = (key) => (value) => {
    // Reset paymentlevel when switch joinAge
    let resetPaymentLevel = {}
    if (key === 'joinAge') {
      resetPaymentLevel = {
        paymentLevel: FORM_MODELS.paymentLevel[value.value][0].value,
      }
    }
    setMeta({ ...meta, [key]: value.value, ...resetPaymentLevel })
  }

  return loading || done ? (
    <div className="flex justify-center">
      <Lottie
        style={{
          position: 'absolute',
          width: '100%',
        }}
        options={{
          loop: true,
          animationData: animation,
        }}
      />
      <p className="self-center p-8">Đang nộp đơn...</p>
    </div>
  ) : (
    <Form onSubmit={onSubmit}>
      <div className="gap-4 h-auto p-4 md:p-8 min-w-full max-w-md mx-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl lg font-bold uppercase">
            FORM ĐĂNG KÍ THÁNH KINH HÈ THIẾU NHI 2021
          </h1>
          <div>
            <div className="bg-gray-700 mt-8 p-4 text-white rounded">
              <h2 className="text-lg font-semibold">
                <em>Quy Định</em>
              </h2>
              <ul className="mt-4 text-lg">
                <li className="mt-2">* Nhận đăng ký và hoàn tất lệ phí:</li>
              </ul>
              <h2 className="mt-4 text-lg font-semibold">
                <em>Thời gian & Địa điểm</em>
              </h2>
              <ul className="mt-4 text-lg">
                <li className="mt-2">* 00h00 - 00h00</li>
                <li className="mt-2">* Nhà thờ Tin Lành Gia Định</li>
              </ul>
            </div>
            <div className="mt-8">
              <span className="text-red-500 text-lg">
                Để thuận tiện cho công tác tổ chức, vui lòng điền đầy đủ các
                thông tin sau
              </span>
              <hr className="mt-8 bg-gray-700" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="text-lg font-semibold">Thông tin cá nhân</h3>
              <span className="text-gray-500 text-opacity-75">
                Bao gồm các thông tin cơ bản về bé để ban tổ chức nắm
              </span>
            </div>
            <div className="">
              <div className="flex flex-col">
                <Label
                  name="fullName"
                  className="label text-lg"
                  errorClassName="label text-lg error"
                >
                  Họ và tên phụ huynh
                </Label>
                <TextField
                  name="fullName"
                  className="input h-14 rounded text-2xl p-4 mt-2 bg-gray-300"
                  errorClassName="input error h-14 rounded text-2xl p-4 mt-2 bg-gray-300"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  validation={{ required: true }}
                />
                <FieldError name="fullName" className="error-message " />
              </div>
              {/* <div className="flex flex-col mt-8">
                <Label
                  name="nationalId"
                  className="text-lg"
                  errorClassName="label text-lg error"
                >
                  Số CMND
                </Label>
                <TextField
                  className="h-14 rounded text-2xl p-4 mt-2 bg-gray-300"
                  name="nationalId"
                  placeholder="261506123"
                  validation={{
                    required: true,
                    pattern: {
                      value: /^[0-9]{9,12}$/,
                    },
                  }}
                />
                <FieldError name="nationalId" className="error-message" />
              </div> */}

              <div className="flex flex-col mt-8">
                <Label name="phoneNumber" className="text-lg">
                  Số điện thoại phụ huynh
                </Label>
                <TextField
                  className="h-14 rounded text-2xl p-4 mt-2 bg-gray-300"
                  name="phoneNumber"
                  placeholder="0913173626"
                  validation={{
                    required: true,
                    pattern: {
                      value: /^\+?[0-9]{9,14}$/,
                    },
                  }}
                />
                <FieldError name="phoneNumber" className="error-message" />
              </div>
              <div className="flex flex-col mt-8">
                <label className="text-lg">Đăng kí cho em</label>
                <TextField
                  className="h-14 rounded text-2xl p-4 mt-2 bg-gray-300"
                  name="fullNameChild"
                  placeholder="Nguyễn Văn B"
                  validation={{ required: true }}
                />
                <FieldError name="fullNameChild" className="error-message" />
              </div>
              <div className="flex flex-col mt-8">
                <Label className="text-lg">Ngày sinh</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <NumberField
                    className="h-14 rounded text-2xl p-4 mt-2 bg-gray-300"
                    name="dayOfBirth"
                    placeholder="ngày"
                    max={31}
                    min={1}
                    validation={{ required: true }}
                  />
                  <NumberField
                    className="h-14 rounded text-2xl p-4 mt-2 bg-gray-300"
                    name="monthOfBirth"
                    placeholder="tháng"
                    max={12}
                    min={1}
                    validation={{ required: true }}
                  />
                  <NumberField
                    className="h-14 rounded text-2xl p-4 mt-2 bg-gray-300"
                    name="yearOfBirth"
                    placeholder="năm"
                    max={2019}
                    min={2009}
                    validation={{ required: true }}
                  />
                </div>
              </div>
              <div className="flex flex-col mt-8">
                <label className="text-lg">Giới tính</label>
                <GridRadio
                  list={FORM_MODELS.gender}
                  onSelect={(value) => onChangeRadio('gender')(value)}
                  cols={2}
                />
              </div>
              <div className="flex flex-col mt-8">
                <label className="text-lg">
                  Tình trạng sức khoẻ đặc biệt của em (các trường hợp cần quan
                  tâm đặc biệt)
                </label>
                <TextField
                  className="h-14 rounded text-2xl p-4 mt-2 bg-gray-300"
                  name="specialCare"
                  placeholder=""
                />
              </div>
              <div className="flex flex-col mt-8">
                <label className="text-lg">Size áo</label>
                <GridRadio
                  list={FORM_MODELS.clothesSize}
                  onSelect={(value) => onChangeRadio('clothesSize')(value)}
                  cols={2}
                />
                {meta.clothesSize === 'Other' && (
                  <TextField
                    name="clothesSize"
                    className="input h-14 bg-gray-300 rounded text-2xl p-4 mt-2"
                    errorClassName="input error"
                    type="text"
                    placeholder="Nhập size áo khác"
                    validation={{ required: true }}
                  />
                )}
              </div>
            </div>
          </div>
          <hr className="mt-8 bg-gray-700" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="text-lg font-semibold">
                Thông tin lớp Trường Chúa Nhật
              </h3>
              {/* <span className="text-gray-500 text-opacity-75">
                Chọn nhóm nhỏ bạn đang sinh hoạt, thời gian bạn nhóm lại tại Ban
                thanh niên Gia Định
              </span> */}
            </div>
            <div className="">
              <div className="flex flex-col">
                <label className="text-lg">Bé học lớp</label>
                <GridRadio
                  // eslint-disable-next-line prefer-spread
                  list={FORM_MODELS.classRoom}
                  cols={3}
                  onSelect={(value) => onChangeRadio('class')(value)}
                />
              </div>
              {/* <div className="flex flex-col mt-8">
                <label className="text-lg">Thời gian nhóm lại</label>
                <GridRadio
                  list={FORM_MODELS.joinAge}
                  cols={2}
                  onSelect={(value) => onChangeRadio('joinAge')(value)}
                />
              </div> */}
            </div>
          </div>
          <hr className="mt-8 bg-gray-700" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="text-lg font-semibold">Lệ Phí & Dâng Hiến</h3>
              <span className="text-gray-500 text-opacity-75">
                Chọn các mức đóng lệ phí, và dâng hiến cho kì trại.
              </span>
              <br />
              {/* <span className="text-pink-500 text-opacity-75">
                Lưu ý: Nếu bạn nhóm lại cùng thanh niên chưa đủ tối thiểu 3
                tháng, bạn cần đóng đủ lệ phí của một trại viên.
              </span> */}
            </div>
            <div className="">
              <div className="flex flex-col">
                <label className="text-lg">Mức lệ phí</label>
                <GridRadio
                  list={FORM_MODELS.paymentLevel[meta.joinAge]}
                  cols={1}
                  onSelect={(value) => onChangeRadio('paymentLevel')(value)}
                />
              </div>
              <div className="flex flex-col mt-8">
                <label className="text-lg">Quy cách</label>
                <GridRadio
                  list={FORM_MODELS.paymentStage}
                  cols={1}
                  onSelect={(value) => onChangeRadio('paymentStage')(value)}
                />
              </div>
              <div className="flex flex-col mt-8">
                <label className="text-lg">Dâng hiến:</label>
                <NumberField
                  className="h-14 rounded text-2xl p-4 mt-2 bg-gray-300"
                  name="offering"
                  placeholder="Nhập số tiền dâng..."
                />
              </div>
              <div className="flex flex-col mt-8">
                <label className="text-lg">Hình thức nộp lệ phí</label>
                <GridRadio
                  list={FORM_MODELS.paymentMethod}
                  cols={1}
                  onSelect={(value) => onChangeRadio('paymentMethod')(value)}
                />

                <strong className="mt-4">
                  Chi tiết về việc đăng ký liên hệ Thủ quỹ Ban Thiếu Nhi:
                  <span className="text-green-500">
                    ĐOÀN THỊ MỸ THỌ 0936 135 310
                  </span>
                </strong>
              </div>
            </div>
          </div>
          <hr className="mt-8 bg-gray-700" />
          <div className="flex flex-row mt-8">
            <span className="flex-1" />
            <Submit className="button p-2 pr-8 pl-8 bg-green-500 text-white">
              Nộp Đơn Đăng Ký
            </Submit>
          </div>
        </div>
      </div>
    </Form>
  )
}
