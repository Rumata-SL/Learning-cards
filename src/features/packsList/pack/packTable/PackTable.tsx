import React, { useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material'

import { useAppDispatch } from '../../../../bll/store'
import { FormatDate } from '../../../../utils/formatDate'
import { DeleteCardModal } from '../../../modal/modalCards/DeleteCardModal'
import { UpdateCardModal } from '../../../modal/modalCards/UpdateCardModal'
import { changeFiltersAC } from '../../packsListReducer'
import { Grade } from '../Grade'
import { CardType, changeCardsFiltersAC, PackType } from '../packReducer'

import s from './packTable.module.css'

type packTablePropsType = {
  cardsState: PackType
  userId: string
  // updateCardCallback: (_id: string) => void
  // deleteCardCallback: (_id: string) => void
}
export const PackTable = (props: packTablePropsType) => {
  const dispatch = useAppDispatch()

  const [updateCard, setUpdateCard] = useState<CardType | null>(null)
  const [isOpenCardUpdateModal, setIsOpenCardUpdateModal] = useState(false)
  const [deleteCard, setDeleteCard] = useState<CardType | null>(null)
  const [isOpenCardDeleteModal, setIsOpenCardDeleteModal] = useState(false)

  // sort functions
  const [sortCardsLastUpdated, setSortCardsLastUpdated] = useState<'asc' | 'desc'>('desc')
  const [sortCardsGrade, setSortCardsGrade] = useState<'asc' | 'desc'>('desc')

  const onClickSortLastUpdated = () => {
    if (sortCardsLastUpdated === 'asc') {
      dispatch(changeCardsFiltersAC({ sortCards: '0updated' }))
      setSortCardsLastUpdated('desc')
    }
    if (sortCardsLastUpdated === 'desc') {
      dispatch(changeCardsFiltersAC({ sortCards: '1updated' }))
      setSortCardsLastUpdated('asc')
    }
  }

  const onClickSortGrade = () => {
    if (sortCardsLastUpdated === 'asc') {
      dispatch(changeCardsFiltersAC({ sortCards: '0grade' }))
      setSortCardsGrade('desc')
    }
    if (sortCardsLastUpdated === 'desc') {
      dispatch(changeCardsFiltersAC({ sortCards: '1grade' }))
      setSortCardsGrade('asc')
    }
  }

  const openDeleteCardModal = (card: CardType) => {
    setIsOpenCardDeleteModal(true)
    setDeleteCard(card)
  }

  const openModalUpdateCard = (card: CardType) => {
    setIsOpenCardUpdateModal(true)
    setUpdateCard(card)
  }

  return (
    <>
      <TableContainer className={s.tableBlock} component={Paper}>
        <Table size={'small'}>
          <TableHead className={s.tableHeader}>
            <TableRow style={{ height: '48px' }}>
              <TableCell>Question</TableCell>
              <TableCell align="left">Answer</TableCell>
              <TableCell align="left">
                Last Updated
                <TableSortLabel
                  active={true}
                  direction={sortCardsLastUpdated}
                  onClick={onClickSortLastUpdated}
                />
              </TableCell>
              <TableCell align="left">
                Grade
                <TableSortLabel
                  active={false}
                  direction={sortCardsGrade}
                  onClick={onClickSortGrade}
                />
              </TableCell>
              {props.cardsState.packUserId === props.userId ? (
                <TableCell width={80} align="left"></TableCell>
              ) : null}
            </TableRow>
          </TableHead>

          <TableBody>
            {props.cardsState.cards.map(row => {
              return (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    {row.question}
                  </TableCell>
                  <TableCell align="left">{row.answer}</TableCell>
                  <TableCell align="left">{FormatDate(row.updated)}</TableCell>
                  <TableCell align="left">
                    <Grade grade={row.grade} />
                  </TableCell>

                  {props.cardsState.packUserId === props.userId ? (
                    <TableCell align="left">
                      {/*<IconButton onClick={() => props.updateCardCallback(row._id)}>*/}
                      <IconButton onClick={() => openModalUpdateCard(row)}>
                        <EditIcon />
                      </IconButton>
                      {/*<IconButton onClick={() => props.deleteCardCallback(row._id)}>*/}
                      <IconButton onClick={() => openDeleteCardModal(row)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  ) : null}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {updateCard && (
        <UpdateCardModal
          isOpenModal={isOpenCardUpdateModal}
          setIsOpenModal={setIsOpenCardUpdateModal}
          id={updateCard._id}
          cardsPack_id={updateCard.cardsPack_id}
          question={updateCard.question}
          answer={updateCard.answer}
        />
      )}
      {deleteCard && (
        <DeleteCardModal
          isOpenModal={isOpenCardDeleteModal}
          setIsModalOpen={setIsOpenCardDeleteModal}
          id={deleteCard._id}
          cardsPack_id={deleteCard.cardsPack_id}
          question={deleteCard.question}
          cardName={props.cardsState.packName}
        />
      )}
    </>
  )
}
