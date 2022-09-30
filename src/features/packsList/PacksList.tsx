import React, { useEffect, useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SchoolIcon from '@mui/icons-material/School'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import {
  Button,
  ButtonGroup,
  FormControl,
  IconButton,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Slider,
} from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router-dom'

import filterRemoveIcon from '../../assets/image/icons/filter-remove.svg'
import { useAppDispatch, useAppSelector } from '../../bll/store'
import SuperButton from '../../common/components/superButton/SuperButton'
import { SuperInput } from '../../common/components/superInput/SuperInput'
import t from '../../common/styles/Title.module.css'
import { FormatDate } from '../../utils/formatDate'

import s from './PacksList.module.css'
import {
  addPackTC,
  deletePackTC,
  packsListTC,
  setCardsPageCountAC,
  setPackPageAC,
  updatePackTC,
} from './packsListReducer'

type PacksListPropsType = {}

export const PacksList: React.FC<PacksListPropsType> = props => {
  const dispatch = useAppDispatch()
  const cardPacks = useAppSelector(state => state.packsList.cardPacks)
  const [numberCards, setNumberCards] = useState([2, 10])

  // pagination
  const cardPacksTotalCount = useAppSelector(state => state.packsList.cardPacksTotalCount)
  const cardPerPage = useAppSelector(state => state.packsList.deckData.pageCount)
  const page = useAppSelector(state => state.packsList.deckData.page)
  const arrCardPerPage = [5, 10, 20, 50, 100]

  const pagesCount = Math.ceil(cardPacksTotalCount / cardPerPage)

  const onChangePagination = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setPackPageAC(page))
  }

  const onChangeSelect = (event: SelectChangeEvent) => {
    dispatch(setCardsPageCountAC(+event.target.value))
  }

  useEffect(() => {
    dispatch(packsListTC())
  }, [page, cardPerPage])

  // crud
  const handleChangeNumberCards = (event: Event, newValue: number | number[]) => {
    setNumberCards(newValue as number[])
  }

  const addPackHandler = () => {
    dispatch(addPackTC('test pack'))
  }

  const deletePackHandler = (id: string) => {
    dispatch(deletePackTC(id))
  }

  const updatePackHandler = (id: string, name: string) => {
    dispatch(updatePackTC(id, name))
  }

  const navigate = useNavigate()
  const openPack = (packId: string) => navigate(`/pack/${packId}`)

  return (
    <div>
      <div className={s.header}>
        <h2 className={t.title}>Packs list</h2>
        <div>
          <SuperButton onClick={addPackHandler} className={s.button}>
            Add new pack
          </SuperButton>
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

      <TableContainer component={Paper}>
        <Table size={'small'}>
          <TableHead className={s.tableHeader}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Cards</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell>Created by</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={s.tableBody}>
            {cardPacks.map(pack => (
              <TableRow key={pack._id}>
                <TableCell className={s.packName} onClick={() => openPack(pack._id)}>
                  {pack.name}
                </TableCell>
                <TableCell>{pack.cardsCount}</TableCell>
                <TableCell>{FormatDate(pack.updated)}</TableCell>
                <TableCell>{pack.user_name}</TableCell>
                <TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className={s.paginationBlock}>
        <Pagination
          className={s.pagination}
          count={pagesCount}
          shape="rounded"
          page={page}
          onChange={onChangePagination}
        />
        <FormControl className={s.selectBlock}>
          <div>Show</div>
          <Select
            value={cardPerPage.toString()}
            onChange={onChangeSelect}
            autoWidth
            className={s.select}
          >
            {arrCardPerPage.map((el, index) => (
              <MenuItem key={index} value={el}>
                {el}
              </MenuItem>
            ))}
          </Select>
          <div>Cards per Page</div>
        </FormControl>
      </div>
    </div>
  )
}
