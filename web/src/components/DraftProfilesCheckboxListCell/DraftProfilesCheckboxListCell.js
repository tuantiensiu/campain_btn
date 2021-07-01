import { useRef, useEffect, useState } from 'react'
import { Checkbox } from 'pretty-checkbox-react'
import ProfileListItem from '../ProfileListItem/ProfileListItem'

export const QUERY = gql`
  query DraftProfilesCheckboxListQuery {
    draftProfilesCheckboxList: draftProfiles(orderBy: "fullName") {
      id
      fullName
      phoneNumber
      metaByKeys(keys: "status, group")
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

const ProfileCheckbox = ({ profile, onChange = () => null }) => {
  profile.metaByKeys = profile.metaByKeys
    ? JSON.parse(profile.metaByKeys)
    : { status: '' }
  const [checked, setChecked] = useState(false)

  const change = () => {
    setChecked(!checked)
    onChange(profile, checked)
  }

  return (
    <div className="p-4 mt-2 flex flex-row justify-between w-48">
      <input type="checkbox" checked={checked} onChange={change} />
      <div className="flex flex-col">
        <span>{profile.fullName}</span>
        <span className="text-xs text-gray-500">
          {profile.metaByKeys['status'] === 'NO_PAYMENT'
            ? ''
            : profile.metaByKeys['status']}
        </span>
      </div>
    </div>
  )
}

export const Success = ({ draftProfilesCheckboxList }) => {
  const checkedProfiles = useRef({})
  const onChange = (profile, checked) => {
    checkedProfiles.current[profile.id] = checked
  }
  return (
    <div className="h-64 overflow-scroll">
      {draftProfilesCheckboxList.map((profile) => (
        <ProfileCheckbox
          key={profile.id}
          profile={profile}
          onChange={onChange}
        />
      ))}
    </div>
  )
}
