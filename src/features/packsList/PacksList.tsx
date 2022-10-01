import React, { useEffect, useState } from 'react'

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { Button, ButtonGroup, SelectChangeEvent, Slider } from '@mui/material'

import filterRemoveIcon from '../../assets/image/icons/filter-remove.svg'
import { useAppDispatch, useAppSelector } from '../../bll/store'
import { PaginationBlock } from '../../common/components/paginationBlock/PaginationBlock'
import SuperButton from '../../common/components/superButton/SuperButton'
import { SuperInput } from '../../common/components/superInput/SuperInput'
import t from '../../common/styles/Title.module.css'
import { AddModalPacks } from '../modal/modalPacks/AddModalPacks'

import s from './PacksList.module.css'
import { addPackTC, packsListTC, setCardsPageCountAC, setPackPageAC } from './packsListReducer'
import { PacksListTable } from './packsListTable/PacksListTable'

type PacksListPropsType = {}

export const PacksList: React.FC<PacksListPropsType> = props => {
  const dispatch = useAppDispatch()
  const cardPacksTotalCount = useAppSelector(state => state.packsList.cardPacksTotalCount)
  const pagePacksCount = useAppSelector(state => state.packsList.deckData.pageCount)
  const page = useAppSelector(state => state.packsList.deckData.page)
  const arrCardPerPage = [5, 10, 20, 50, 100]

  const [numberCards, setNumberCards] = useState([2, 10])

  const [isAddOpenModal, setIsAddOpenModal] = useState(false)

  useEffect(() => {
    dispatch(packsListTC())
  }, [page, pagePacksCount])

  const openPackModal = () => {
    setIsAddOpenModal(true)
  }

  const onChangePagination = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setPackPageAC(page))
  }

  const onChangeSelect = (event: SelectChangeEvent) => {
    dispatch(setCardsPageCountAC(+event.target.value))
  }

  const handleChangeNumberCards = (event: Event, newValue: number | number[]) => {
    setNumberCards(newValue as number[])
  }

  const addPackHandler = () => {
    dispatch(addPackTC('test pack'))
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

      <div className={s.settings}>
        <div className={s.searchBlock}>
          <h3 className={s.settingsTitle}>Search</h3>
          <div className={s.inputBlock}>
            <SuperInput placeholder={'Provide your text'} />
            <SearchOutlinedIcon className={s.searchIcon} sx={{ color: '#ffffff' }} />
          </div>
        </div>
        <div className={s.filterByBlock}>
          <h3 className={s.settingsTitle}>Show packs cards</h3>
          <div className={s.buttonBlock}>
            <ButtonGroup className={s.buttonGroup}>
              <Button variant={'outlined'}>My</Button>
              <Button variant={'contained'}>All</Button>
            </ButtonGroup>
          </div>
        </div>
        <div className={s.filterNumberCardsBlock}>
          <h3 className={s.settingsTitle}>Number of cards</h3>
          <div className={s.slider}>
            <div className={s.sliderValue}>{numberCards[0]}</div>
            <Slider
              value={numberCards}
              onChange={handleChangeNumberCards}
              valueLabelDisplay="auto"
            />
            <div className={s.sliderValue}>{numberCards[1]}</div>
          </div>
        </div>
        <div className={s.resetFilterBlock}>
          <button className={s.filterRemoveButton}>
            <img src={filterRemoveIcon} alt="filter-remove" />
          </button>
        </div>
      </div>

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
