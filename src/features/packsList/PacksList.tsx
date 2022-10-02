import React, { useEffect, useState } from 'react'

import { SelectChangeEvent } from '@mui/material'
import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../bll/store'
import { PaginationBlock } from '../../common/components/paginationBlock/PaginationBlock'
import SuperButton from '../../common/components/superButton/SuperButton'
import t from '../../common/styles/Title.module.css'
import { AddModalPacks } from '../modal/modalPacks/AddModalPacks'

import s from './PacksList.module.css'
import { PacksListFilters } from './packsListFilters/PacksListFilters'
import { addPackTC, packsListTC, setCardsPageCountAC, setPackPageAC } from './packsListReducer'
import { PacksListTable } from './packsListTable/PacksListTable'

type PacksListPropsType = {}

export const PacksList: React.FC<PacksListPropsType> = props => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
  const isMy = useAppSelector(state => state.packsList.isMyDeck)
  const cardPacksTotalCount = useAppSelector(state => state.packsList.cardPacksTotalCount)
  const pagePacksCount = useAppSelector(state => state.packsList.deckData.pageCount)
  const page = useAppSelector(state => state.packsList.deckData.page)
  const arrCardPerPage = [5, 10, 20, 50, 100]

  const [isAddOpenModal, setIsAddOpenModal] = useState(false)

  useEffect(() => {
    dispatch(packsListTC())
  }, [page, pagePacksCount, isMy])

  const openPackModal = () => {
    setIsAddOpenModal(true)
  }

  const onChangePagination = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setPackPageAC(page))
  }

  const onChangeSelect = (event: SelectChangeEvent) => {
    dispatch(setCardsPageCountAC(+event.target.value))
  }

  const addPackHandler = () => {
    dispatch(addPackTC('test pack'))
  }

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <div>
      <div className={s.header}>
        <h2 className={t.title}>Packs list</h2>
        <div>
          <SuperButton onClick={addPackHandler} className={s.button}>
            Add new pack
          </SuperButton>

          {/* <SuperButton onClick={() => openPackModal()} className={s.button}>
            Add new pack
          </SuperButton> */}
        </div>
      </div>
      <PacksListFilters />
      <PacksListTable />
      <PaginationBlock
        page={page}
        onChangePage={onChangePagination}
        selectItems={arrCardPerPage}
        defaultSelectValue={pagePacksCount}
        onChangeSelect={onChangeSelect}
        totalItemsCount={cardPacksTotalCount}
        pageItemsCount={pagePacksCount}
      />
      <AddModalPacks isOpenModal={isAddOpenModal} setIsModalOpen={setIsAddOpenModal} />
    </div>
  )
}
