import React from 'react'
import PersonalSubTest from './PersonalSubTest'

const MBTIPage = ({
  setPageCount,
}: {
  setPageCount: React.Dispatch<React.SetStateAction<string>>
}) => {
  return <PersonalSubTest setPageCount={setPageCount} />
}

export default MBTIPage
