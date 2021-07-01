import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/vi'
dayjs.extend(relativeTime)

function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date())
  const seconds = Math.floor((total / 1000) % 60)
  const minutes = Math.floor((total / 1000 / 60) % 60)
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
  const days = Math.floor(total / (1000 * 60 * 60 * 24))

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  }
}
const CountDownPage = () => {
  const deadline = 'September 29 2020 18:59:59 GMT+0700'
  const [countdown, setCountdown] = useState(getTimeRemaining(deadline))
  useEffect(() => {
    setInterval(() => {
      setCountdown(getTimeRemaining(deadline))
    }, 1000)
  }, [])

  return (
    <>
      <div className="gap-4 h-auto p-4 md:p-8 min-w-full max-w-md mx-auto">
        <h1 className="text-2xl md:text-3xl lg font-bold text-gray-500">
          Còn {countdown.days} ngày <br />
          {countdown.hours} giờ <br />
          {countdown.minutes} phút <br />
          và {countdown.seconds} giây nữa...
        </h1>
        <span className="text-2xl md:text-3xl lg font-bold text-green-500">
          chúng ta sẽ
          <br /> khai mạc kì trại <br />
          <strong>Thánh Kinh Mùa Thu 2020</strong>
        </span>
      </div>
    </>
  )
}

export default CountDownPage
