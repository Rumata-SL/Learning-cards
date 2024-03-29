import React from 'react'

import { NavLink } from 'react-router-dom'

import { PATH } from '../../enum/path'

import h from './Navbar.module.css'

type IsActive = {
  isActive: boolean
}

export const Navbar = () => {
  const setActive = ({ isActive }: IsActive) => (isActive ? h.active : h.link)

  return (
    <div className={h.wrapper}>
      <div className={h.container}>
        <div>
          <NavLink className={setActive} to={PATH.PROFILE}>
            Profile
          </NavLink>
        </div>
        <div>
          <NavLink className={setActive} to={PATH.REGISTRATION}>
            Registration
          </NavLink>
        </div>
        <div>
          <NavLink className={setActive} to={PATH.LOGIN}>
            Login
          </NavLink>
        </div>
        <div>
          <NavLink className={setActive} to={PATH.RECOVERY}>
            Recovery
          </NavLink>
        </div>
        <div>
          <NavLink className={setActive} to={PATH.NEW_PASSWORD}>
            New password
          </NavLink>
        </div>
        <div>
          <NavLink className={setActive} to={PATH.PACKS_LIST}>
            Packs List
          </NavLink>
        </div>
        <div>
          <NavLink className={setActive} to={PATH.PACK}>
            Pack
          </NavLink>
        </div>
      </div>
    </div>
  )
}
