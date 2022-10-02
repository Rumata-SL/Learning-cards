import React from 'react'

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
} from '@mui/material'

import { FormatDate } from '../../../../utils/formatDate'
import { Grade } from '../Grade'
import { PackType } from '../packReducer'

import s from './packTable.module.css'

type packTablePropsType = {
  cardsState: PackType
  userId: string
  updateCardCallback: (_id: string) => void
  deleteCardCallback: (_id: string) => void
}
export const PackTable = (props: packTablePropsType) => {
  return (
    <TableContainer className={s.tableBlock} component={Paper}>
      <Table size={'small'}>
        <TableHead className={s.tableHeader}>
          <TableRow style={{ height: '48px' }}>
            <TableCell>Question</TableCell>
            <TableCell align="left">Answer</TableCell>
            <TableCell align="left">Last Updated</TableCell>
            <TableCell align="left">Grade</TableCell>
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
                    <IconButton onClick={() => props.updateCardCallback(row._id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => props.deleteCardCallback(row._id)}>
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
  )
}
