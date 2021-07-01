import axios from 'axios'
import { parseString } from 'xml2js'

const API_URL = 'http://rest.esms.vn/MainService.svc/'
const SMS_KEY = process.env.SMS_KEY || '3CA9D28C3975CDD621E54083012B54'
const SMS_SECRET = process.env.SMS_SECRET || '192A989308B9820146A17F07164A94'

export const handler = async (event, context) => {
  const url = `${API_URL}/xml/GetBalance/${SMS_KEY}/${SMS_SECRET}`
  const balanceResponse = await axios(url)
  const balance = balanceResponse.data
  console.log(balance)
  return {
    statusCode: 200,
    body: JSON.stringify({
      balance: balance.Balance,
    }),
  }
}
