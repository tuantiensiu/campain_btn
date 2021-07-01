import { useState } from 'react'
import { Link, routes } from '@redwoodjs/router'
import Select from 'react-select'
import DraftProfilesCheckboxList from 'src/components/DraftProfilesCheckboxListCell'

const BulkSMSPage = () => {
  const [selected, setSelected] = useState(null)
  const [selectedProfiles, setSelectedProfiles] = useState([])
  const options = ['tmep1']
  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <label>Chọn mẫu tin nhắn</label>
        <Select options={options} />
      </div>
      <div>
        <DraftProfilesCheckboxList />
      </div>
    </div>
  )
}

export default BulkSMSPage
