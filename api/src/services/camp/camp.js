import url from 'url'
import _ from 'lodash'

import axios from 'axios'
import khongdau from 'khong-dau'
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber'

import { db } from 'src/lib/db'

export const formatPhoneNumber = (phoneNumber) => {
  const phoneUtil = PhoneNumberUtil.getInstance()
  const number = phoneUtil.parseAndKeepRawInput(phoneNumber, 'VN')
  const formattedNumber = phoneUtil.format(number, PhoneNumberFormat.E164)
  return formattedNumber
}

const formatCurrency = (amount) => {
  if (amount > 0) {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    })
    return formatter.format(amount)
  }
  return null
}

export const template = (s, placeholders) => (payload, ...rest) => {
  let result = s
  for (const place in placeholders) {
    if (place in placeholders) {
      const replacer = placeholders[place]
      result = result.replace(
        new RegExp(`{${place}}`, 'g'),
        typeof replacer === 'function' ? replacer(payload, ...rest) : replacer
      )
    }
  }
  return result
}

export const sendSMS = async (phoneNumber, message) => {
  const baseURL =
    'http://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_get'
  const params = new url.URLSearchParams({
    Phone: phoneNumber,
    Content: khongdau(message),
    ApiKey: process.env.SMS_APIKEY || `3CA9D28C3975CDD621E54083012B54`,
    SecretKey: process.env.SMS_SECRETKEY || `192A989308B9820146A17F07164A94`,
    SmsType: `8`,
  })
  const result = await axios(baseURL + '?' + params.toString())
  console.log(params.toString(), result.data)
  return result.data
}

export const getMessage = (formPayload) => {
  // const url = `https://tkmt.btngiadinh.com/ho-so?id=${draftProfile.id}`
  const lastNationDigit = formPayload.data.phoneNumber.slice(
    formPayload.data.phoneNumber.length - 2,
    formPayload.data.phoneNumber.length
  )
  // Get last name and toggle upper case
  const fullName = formPayload.data.fullName
  const lastName = fullName.split(' ')
  const lastNameSlug = khongdau(
    lastName[lastName.length - 1] + ''
  ).toUpperCase()
  // Left pad the group name as XX string
  const group =
    formPayload.group < 10 ? `0${formPayload.group}` : formPayload.group

  const { offering, paymentLevel, paymentStage, paymentMethod } = formPayload

  const messageKey = paymentMethod === 'BANK' ? 'BANK' : 'PEOPLE' // Switch case logic here
  // console.log('messageKey', paymentMethod, paymentMethod === 'BANK')

  // Template variables
  const depositeAmount = process.env.DEPOSITE || 500000
  const contact = '0902457367'
  const camp = 'TKH'
  const action = paymentStage === 'FULL' ? 'nộp lệ phí' : 'nộp cọc'
  const bankProvider = 'Agribank'
  const bankID = `6100205502723`
  const bankName = `DOAN THI MY THO`
  const who =
    paymentMethod !== 'BANK'
      ? paymentMethod === 'GROUP_LEADER'
        ? 'nhóm trưởng'
        : 'thủ quỹ'
      : ''
  let amount = 0
  try {
    if (paymentStage === 'FULL') {
      amount = parseInt(paymentLevel) + parseInt(offering > 0 ? offering : 0)
      amount = formatCurrency(amount)
    } else {
      let fullAmount =
        parseInt(paymentLevel) + parseInt(offering > 0 ? offering : 0)
      fullAmount = formatCurrency(fullAmount)
      amount = `${formatCurrency(depositeAmount)}/${fullAmount}`
    }
  } catch (err) {
    amount = paymentLevel
  }
  const remainDay = paymentMethod === 'BANK' ? 3 : 7
  const deadlineDay = '18/08'

  // Temp statement
  const bankStatement =
    paymentMethod === 'BANK' ? `${bankID}/${bankProvider}/${bankName}` : ''
  const transactionCode = `${camp}${group}${lastNationDigit}${lastNameSlug}`
  // const s = `${bankStatement}/${transactionCode}`

  const messageTemplates = {
    BANK: `Bạn đã đăng ký trại Thánh Kinh Hè thành công. Vui lòng {action} {amount} qua STK: {bankStatement},nội dung CK: {transactionCode} trong vòng {remainDay} ngày kể từ ngày đăng ký và hoàn tất lệ phí trước ngày {deadlineDay}. Sau {remainDay} ngày hệ thống sẽ tự hủy đơn đăng ký nếu bạn chưa {action}. Chi tiết liên hệ {contact}.`,
    PEOPLE: `Bạn đã đăng ký trại Thánh Kinh Hè thành công. Vui lòng nộp tiền cho giáo viên trong vòng {remainDay} ngày kể từ ngày đăng ký và hoàn tất lệ phí trước ngày {deadlineDay}. Sau {remainDay} ngày hệ thống sẽ tự hủy đơn đăng ký nếu bạn chưa {action}. Chi tiết liên hệ {contact}.`,
  }

  const variables = {
    contact,
    fullName,
    camp,
    action,
    who,
    amount,
    bankStatement,
    transactionCode,
    remainDay,
    deadlineDay,
  }
  const messageContent = template(messageTemplates[messageKey], variables)({})

  return [messageContent, variables]
}

export const campRegister = async ({ input }) => {
  if (input.meta) {
    const meta = JSON.parse(input.meta)
    const createMap = []
    for (const key in meta) {
      if (key in meta) {
        const payload = {
          key,
          value: String(meta[key]),
          type: 'string',
        }
        createMap.push(payload)
      }
    }

    const payload = {
      data: {
        fullName: input.fullName,
        nationalId: input.nationalId,
        phoneNumber: formatPhoneNumber(input.phoneNumber),
        birthday: input.birthday,
        meta: {
          create: createMap,
        },
      },
    }

    // This payload will not interact with database
    // Support for message response
    const patchedPayload = {
      ...payload,
      group: meta['group'],
      paymentLevel: meta['paymentLevel'],
      paymentStage: meta['paymentStage'],
      paymentMethod: meta['paymentMethod'],
      offering: meta['offering'],
    }
    const [message, { transactionCode }] = await getMessage(patchedPayload)

    // Push message into meta storage
    payload.data.meta.create.push({
      key: 'message',
      value: message,
      type: 'string',
    })
    payload.data.meta.create.push({
      key: 'transactionCode',
      value: transactionCode,
      type: 'string',
    })

    console.log(JSON.stringify(patchedPayload, null, 2))

    // console.log(JSON.stringify(payload, null, 2))

    const draftProfile = await db.draftProfile.create(payload)
    // await sendSMS(payload.data.phoneNumber, message) // Formatted phone number
    await sendSMS(input.phoneNumber, message)
    return draftProfile
  }
  return null
}

export const smsBalance = async () => {
  const API_URL = 'http://rest.esms.vn/MainService.svc/'
  const SMS_KEY = process.env.SMS_KEY || '3CA9D28C3975CDD621E54083012B54'
  const SMS_SECRET = process.env.SMS_SECRET || '192A989308B9820146A17F07164A94'

  const url = `${API_URL}/xml/GetBalance/${SMS_KEY}/${SMS_SECRET}`
  const balanceResponse = await axios(url)
  const balance = balanceResponse.data
  return balance.Balance
}

export const smsSend = async ({ profileId, message }) => {
  const draftProfile = await db.draftProfile.findOne({
    where: { id: profileId },
    select: {
      phoneNumber: true,
      meta: true,
    },
  })

  console.log(JSON.stringify(draftProfile, null, 2))

  if (draftProfile) {
    const SMSMeta = _.find(draftProfile.meta, { key: 'sms' })
    let lastSMSList = { ...SMSMeta }
    console.log('lastSMSList: ', lastSMSList)
    const phoneNumber =
      process.env.NODE_ENV === 'production'
        ? draftProfile.phoneNumber
        : '0979164197'
    // const phoneNumber = '0772010496'
    const result = await sendSMS(phoneNumber, message)
    // const result = { SMSID: '12345' }
    // check lastSMSList is boolean or array json?
    // if boolean then init new array
    // if array then append below smsData
    if (lastSMSList.value === 'false') {
      const initialMessage = _.find(draftProfile.meta, { key: 'message' })
      lastSMSList = [{ id: null, message: khongdau(initialMessage.value) }]
    } else {
      lastSMSList = JSON.parse(lastSMSList.value)
    }
    const smsData = {
      id: result.SMSID,
      message,
    }
    lastSMSList.push(smsData)
    const updateData = {
      where: { id: SMSMeta.id },
      data: {
        value: JSON.stringify(lastSMSList),
      },
    }
    console.log(updateData)
    await db.meta.update(updateData)
    return result
    // return null
  }
  return null
}
