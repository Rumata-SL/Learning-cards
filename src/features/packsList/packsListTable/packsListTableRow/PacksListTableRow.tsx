import React, { FC } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SchoolIcon from '@mui/icons-material/School'
import { TableRow, Tooltip, TableCell, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { CardPacksType } from '../../../../api/cards/packsListAPI'
import { useAppDispatch, useAppSelector } from '../../../../bll/store'
import { FormatDate } from '../../../../utils/formatDate'
import { deletePackTC, updatePackTC } from '../../packsListReducer'

import s from './PacksListTableRow.module.css'

type PropsType = {
  pack: CardPacksType
}

export const PacksListTableRow: FC<PropsType> = ({ pack }) => {
  const dispatch = useAppDispatch()
  const userId = useAppSelector(state => state.profile.profile._id)
  const navigate = useNavigate()

  const openPack = (packId: string) => navigate(`/pack/${packId}/`)

  const deletePackHandler = (id: string) => {
    dispatch(deletePackTC(id))
  }

  const updatePackHandler = (id: string, name: string) => {
    dispatch(updatePackTC(id, name))
  }

  return (
    <TableRow>
      <Tooltip title="Open pack">
        <TableCell onClick={() => openPack(pack._id)} className={s.tableLink}>
          {pack.name}
        </TableCell>
      </Tooltip>
      <TableCell>{pack.cardsCount}</TableCell>
      <TableCell>{FormatDate(pack.updated)}</TableCell>
      <TableCell>{pack.user_name}</TableCell>
      {userId === pack.user_id ? (
        <TableCell align="center">
          <IconButton>
            <SchoolIcon />
          </IconButton>
          <IconButton onClick={() => updatePackHandler(pack._id, 'updated pack')}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => deletePackHandler(pack._id)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      ) : (
        <TableCell align="center">
          <IconButton>
            <SchoolIcon />
          </IconButton>
        </TableCell>
      )}
    </TableRow>
  )
}
