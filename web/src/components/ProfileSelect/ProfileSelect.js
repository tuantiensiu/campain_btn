import { useState } from 'react'
import { Multiselect } from 'multiselect-react-dropdown'

const ProfileSelect = ({ profiles, value, onSelectionChange }) => {
  const [selected, setSelected] = useState(value)

  const changeOptions = (selectedList, _) => {
    setSelected(selectedList)
    onSelectionChange(selectedList)
  }

  return (
    <Multiselect
      options={profiles}
      selectedValues={selected}
      placeholder="Nhập tên để chọn"
      displayValue="label"
      onSelect={changeOptions}
      onRemove={changeOptions}
    />
  )
}

export default ProfileSelect
