import React, { FC, useEffect, useState } from 'react'

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableSortLabel,
} from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../../bll/store'
import {
  selectPackListSortPacks,
  selectPacksListCardPacks,
} from '../../../utils/selectors/selectors'
import { changeFiltersAC } from '../packsListReducer'

import s from './PacksListTable.module.css'
import { PacksListTableRow } from './packsListTableRow/PacksListTableRow'

type PropsType = {}

export const PacksListTable: FC<PropsType> = () => {
  const dispatch = useAppDispatch()
  const sortPacks = useAppSelector(selectPackListSortPacks)
  const cardPacks = useAppSelector(selectPacksListCardPacks)
  const [sortLastUpdated, setSortLastUpdated] = useState<'asc' | 'desc'>('desc')

  const onClickSortLastUpdated = () => {
    if (sortLastUpdated === 'asc') {
      dispatch(changeFiltersAC({ sortPacks: '0updated' }))
      setSortLastUpdated('desc')
    }
    if (sortLastUpdated === 'desc') {
      dispatch(changeFiltersAC({ sortPacks: '1updated' }))
      setSortLastUpdated('asc')
    }
  }

  useEffect(() => {
    if (!sortPacks) {
      setSortLastUpdated('desc')
    }
  }, [sortPacks])

  return (
    <>
      {cardPacks.length !== 0 ? (
        <TableContainer component={Paper}>
          <Table size={'small'}>
            <TableHead className={s.tableHeader}>
              <TableRow>
                <TableCell>Cover</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Cards</TableCell>
                <TableCell className={s.tableCell}>
                  Last Updated
                  <TableSortLabel
                    active={true}
                    direction={sortLastUpdated}
                    onClick={onClickSortLastUpdated}
                  />
                </TableCell>
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
