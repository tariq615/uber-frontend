import React, {useEffect} from 'react'
import {UserHome as Home} from '../components'
import {UserLogoutBtn} from '../components'
import {LiveTracking} from '../components'

const UserHome = () => {

  return (
    <div>
      <Home />
      <UserLogoutBtn />
      {/* <LiveTracking /> */}

    </div>
  )
}

export default UserHome