import React, { FC } from 'react'

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material'

import { useAppSelector } from '../../../bll/store'

import s from './PacksListTable.module.css'
import { PacksListTableRow } from './packsListTableRow/PacksListTableRow'

type PropsType = {}

export const PacksListTable: FC<PropsType> = () => {
  const cardPacks = useAppSelector(state => state.packsList.cardPacks)

  return (
    <>
      {cardPacks.length !== 0 ? (
        <TableContainer component={Paper}>
          <Table size={'small'}>
            <TableHead className={s.tableHeader}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Cards</TableCell>
                <TableCell>Last Updated</TableCell>
                <TableCell>Created by</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={s.tableBody}>
              {cardPacks.map(pack => (
                <PacksListTableRow key={pack._id} pack={pack} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className={s.notFound}>Packs not found...</div>
      )}
    </>
  )
}
