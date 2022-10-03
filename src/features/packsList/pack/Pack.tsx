import React, { ChangeEvent, useEffect } from 'react'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { IconButton, Link, SelectChangeEvent } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../bll/store'
import { PaginationBlock } from '../../../common/components/paginationBlock/PaginationBlock'
import SuperButton from '../../../common/components/superButton/SuperButton'
import { SuperInput } from '../../../common/components/superInput/SuperInput'

import s from './Pack.module.css'
import {
  createCardTC,
  deleteCardTC,
  getPackTC,
  setPageAC,
  setPageCountAC,
  updateCardTC,
} from './packReducer'
import { PackTable } from './packTable/PackTable'

type PackPropsType = {}

export const Pack: React.FC<PackPropsType> = props => {
  const dispatch = useAppDispatch()

  const userId = useAppSelector(state => state.profile.profile._id)
  const cardsState = useAppSelector(state => state.pack)

  const navigate = useNavigate()
  const openPackList = () => navigate(`/packs_list/`)
  const { packId } = useParams<{ packId: string }>()

  useEffect(() => {
    dispatch(getPackTC(packId ? packId : ''))
  }, [cardsState.searchData.pageCount, cardsState.searchData.page])

  // pagination functions
  const arrCardPerPage = [5, 10, 20, 50, 100]
  const handlePageCountChange = (event: SelectChangeEvent) => {
    dispatch(setPageCountAC(+event.target.value))
  }
  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    dispatch(setPageAC(page))
  }

  const handleAddNewCard = () => {
    const data = {
      cardsPack_id: packId ? packId : '',
      question: 'example question',
      answer: 'example answer',
      grade: 4,
    }

    dispatch(createCardTC(data))
  }

  const handleUpdateCard = (_id: string) => {
    const data = {
      _id: _id,
      question: 'updated question',
      answer: 'updated answer',
    }

    dispatch(updateCardTC(packId ? packId : '', data))
  }

  const handleDeleteCard = (_id: string) => {
    dispatch(deleteCardTC(packId ? packId : '', _id))
  }

  return (
    <div>
      <Link onClick={openPackList} className={s.backLink}>
        <ArrowBackIcon sx={{ color: '#ffffff' }} />
        Back to Packs List
      </Link>

      <div className={s.nameButtonBlock}>
        <div className={s.nameMoreBlock}>
          {cardsState.packUserId === userId ? 'My Pack' : "Friend's Pack"}

          {cardsState.packUserId === userId ? (
            <IconButton onClick={() => alert('Пока не работает')} className={s.moreButton}>
              <MoreVertOutlinedIcon sx={{ color: '#ffffff' }} />
            </IconButton>
          ) : null}
        </div>

        {cardsState.packUserId === userId ? (
          <SuperButton onClick={handleAddNewCard} className={s.button}>
            Add new card
          </SuperButton>
        ) : (
          <SuperButton onClick={() => alert('Пока не работает')} className={s.button}>
            Learn to Pack
          </SuperButton>
        )}
      </div>

      <div className={s.searchBlock}>
        <div className={s.searchBlockText}>Search</div>

        <div className={s.inputBlock}>
          <SuperInput placeholder={'Provide your text'} />
          <SearchOutlinedIcon className={s.searchIcon} sx={{ color: '#ffffff' }} />
        </div>
      </div>

      <PackTable
        cardsState={cardsState}
        userId={userId}
        updateCardCallback={handleUpdateCard}
        // deleteCardCallback={handleDeleteCard}
      />

      <PaginationBlock
        page={cardsState.searchData.page}
        totalItemsCount={cardsState.cardsTotalCount}
        pageItemsCount={cardsState.searchData.pageCount}
        onChangePage={handlePageChange}
        selectItems={arrCardPerPage}
        defaultSelectValue={cardsState.searchData.pageCount}
        onChangeSelect={handlePageCountChange}
      />
    </div>
  )
}
