import React, { FC, useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SchoolIcon from '@mui/icons-material/School'
import { TableRow, Tooltip, TableCell, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { CardPacksType } from '../../../../api/cards/packsListAPI'
import { useAppSelector } from '../../../../bll/store'
import { FormatDate } from '../../../../utils/formatDate'
import { DeletePacksModal } from '../../../modal/modalPacks/DeletePacksModal'
import { UpdatePackModal } from '../../../modal/modalPacks/UpdatePackModal'

import s from './PacksListTableRow.module.css'

type PropsType = {
  pack: CardPacksType
}

export const PacksListTableRow: FC<PropsType> = ({ pack }) => {
  const userId = useAppSelector(state => state.profile.profile._id)
  const navigate = useNavigate()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deletePacks, setDeletePacks] = useState<CardPacksType | null>(null)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [updatePacks, setUpdatePacks] = useState<CardPacksType | null>(null)

  const openPack = (packId: string) => navigate(`/pack/${packId}/`)

  const openDeletePackModal = () => {
    setIsDeleteModalOpen(true)
    setDeletePacks(pack)
  }

  const openUpdatePackModal = () => {
    setIsUpdateModalOpen(true)
    setUpdatePacks(pack)
  }

  return (
    <>
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
            <IconButton disabled={pack.cardsCount === 0}>
              <SchoolIcon />
            </IconButton>
            <IconButton onClick={openUpdatePackModal}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={openDeletePackModal}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        ) : (
          <TableCell align="center">
            <IconButton disabled={pack.cardsCount === 0}>
              <SchoolIcon />
            </IconButton>
          </TableCell>
        )}
      </TableRow>
      {deletePacks && (
        <DeletePacksModal
          isModalOpen={isDeleteModalOpen}
          setIsModalOpen={setIsDeleteModalOpen}
          packName={deletePacks && deletePacks.name}
          id={deletePacks && deletePacks._id}
        />
      )}
      {updatePacks && (
        <UpdatePackModal
          isModalOpen={isUpdateModalOpen}
          setIsModalOpen={setIsUpdateModalOpen}
          pack={updatePacks}
          packName={updatePacks && updatePacks.name}
          id={updatePacks && updatePacks._id}
        />
      )}
    </>
  )
}
