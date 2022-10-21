import React, { FC, useEffect, useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SchoolIcon from '@mui/icons-material/School'
import { TableRow, Tooltip, TableCell, IconButton, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { CardPacksType } from '../../../../api/cards/packsListAPI'
import defaultCover from '../../../../assets/image/noImage.png'
import { useAppSelector } from '../../../../bll/store'
import { DeletePacksModal } from '../../../../common/components/modal/modalPacks/DeletePacksModal'
import { UpdatePackModal } from '../../../../common/components/modal/modalPacks/UpdatePackModal'
import { FormatDate } from '../../../../utils/formatDate'
import { selectProfileUserId } from '../../../../utils/selectors/selectors'

import s from './PacksListTableRow.module.css'

type PropsType = {
  pack: CardPacksType
}

export const PacksListTableRow: FC<PropsType> = ({ pack }) => {
  const userId = useAppSelector(selectProfileUserId)
  const navigate = useNavigate()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deletePacks, setDeletePacks] = useState<CardPacksType | null>(null)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [updatePacks, setUpdatePacks] = useState<CardPacksType | null>(null)
  const [deckCover, setDeckCover] = useState(pack.deckCover || defaultCover)
  const [isDeckBroken, setIsDeckBroken] = useState(false)

  const openPack = (packId: string) => navigate(`/pack/${packId}/`)
  const learnPack = (packId: string) => navigate(`/learn/${packId}/`)

  useEffect(() => {
    setDeckCover(pack.deckCover || defaultCover)
  }, [pack])

  const openDeletePackModal = () => {
    setIsDeleteModalOpen(true)
    setDeletePacks(pack)
  }

  const openUpdatePackModal = () => {
    setIsUpdateModalOpen(true)
    setUpdatePacks(pack)
  }

  const errorHandler = () => {
    setIsDeckBroken(true)
  }

  return (
    <>
      <TableRow>
        <TableCell className={s.deckCover} style={{ width: 50 }}>
          <img src={isDeckBroken ? defaultCover : deckCover} alt="cover" onError={errorHandler} />
        </TableCell>
        <Tooltip title="Open pack">
          <TableCell onClick={() => openPack(pack._id)} className={s.tableLink}>
            <div>{pack.name}</div>
          </TableCell>
        </Tooltip>
        <TableCell>{pack.cardsCount}</TableCell>
        <TableCell>{FormatDate(pack.updated)}</TableCell>
        <TableCell>{pack.user_name}</TableCell>
        {userId === pack.user_id ? (
          <TableCell align="center">
            <IconButton disabled={pack.cardsCount === 0} onClick={() => learnPack(pack._id)}>
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
          <TableCell align="center" onClick={() => learnPack(pack._id)}>
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
