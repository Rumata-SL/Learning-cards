import React, { useState } from 'react'

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
  Slider,
  styled,
  tableCellClasses,
} from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import filterRemoveIcon from '../../assets/image/icons/filter-remove.svg'
import SuperButton from '../../common/components/superButton/SuperButton'
import { SuperInput } from '../../common/components/superInput/SuperInput'
import t from '../../common/styles/Title.module.css'

import s from './PacksList.module.css'

const packs = {
  cardPacks: [
    {
      _id: '63219bd4b2ed601258b19109',
      user_id: '62d013204d4a530a949a8238',
      user_name: 'fff',
      private: false,
      name: 'super pack ff',
      path: '/def',
      grade: 0,
      shots: 0,
      cardsCount: 6,
      type: 'pack',
      rating: 0,
      created: '2022-09-14T09:16:04.154Z',
      updated: '2022-09-27T18:44:58.483Z',
      more_id: '62d013204d4a530a949a8238',
      __v: 0,
      deckCover: '',
    },
    {
      _id: '631ce93ca1cdee256461050b',
      user_id: '62d013204d4a530a949a8238',
      user_name: 'fff',
      private: false,
      name: 'rrr',
      path: '/def',
      grade: 0,
      shots: 0,
      cardsCount: 2,
      type: 'pack',
      rating: 0,
      created: '2022-09-10T19:45:00.117Z',
      updated: '2022-09-27T18:18:44.541Z',
      more_id: '62d013204d4a530a949a8238',
      __v: 0,
      deckCover: 'custom url',
    },
    {
      _id: '6331d906d834d1097c4757be',
      user_id: '62d013204d4a530a949a8238',
      user_name: 'fff',
      private: false,
      name: 'bfed',
      path: '/def',
      grade: 0,
      shots: 0,
      cardsCount: 0,
      type: 'pack',
      rating: 0,
      created: '2022-09-26T16:53:26.117Z',
      updated: '2022-09-27T18:11:06.404Z',
      more_id: '62d013204d4a530a949a8238',
      __v: 0,
      deckCover: 'ffffff',
    },
    {
      _id: '630b326708095407487d7a74',
      user_id: '62d013204d4a530a949a8238',
      user_name: 'fff',
      private: false,
      name: '01234',
      path: '/def',
      grade: 0,
      shots: 0,
      deckCover: 'url',
      cardsCount: 2,
      type: 'pack',
      rating: 0,
      created: '2022-08-28T09:16:23.951Z',
      updated: '2022-09-27T18:05:53.832Z',
      more_id: '62d013204d4a530a949a8238',
      __v: 0,
    },
  ],
  page: 1,
  pageCount: 4,
  cardPacksTotalCount: 3430,
  minCardsCount: 0,
  maxCardsCount: 110,
  token: '14124cb0-3e9b-11ed-ae23-179e876f2699',
  tokenDeathTime: 1664317929595,
}

type PacksListPropsType = {}

export const PacksList: React.FC<PacksListPropsType> = props => {
  const [numberCards, setNumberCards] = useState([2, 10])

  const handleChangeNumberCards = (event: Event, newValue: number | number[]) => {
    setNumberCards(newValue as number[])
  }

  return (
    <div>
      <div className={s.header}>
        <h2 className={t.title}>Packs list</h2>
        <div>
          <SuperButton className={s.button}>Add new pack</SuperButton>
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
            {packs.cardPacks.map(pack => (
              <TableRow key={pack._id}>
                <TableCell>{pack.name}</TableCell>
                <TableCell>{pack.cardsCount}</TableCell>
                <TableCell>{FormatDate(pack.updated)}</TableCell>
                <TableCell>{pack.user_name}</TableCell>
                <TableCell>
                  <IconButton>
                    <SchoolIcon />
                  </IconButton>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className={s.paginationBlock}>
        <Pagination className={s.pagination} count={10} shape="rounded" />
        <FormControl className={s.selectBlock}>
          <div>Show</div>
          <Select value={'5'} onChange={() => alert('yo')} autoWidth className={s.select}>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
          <div>Cards per Page</div>
        </FormControl>
      </div>
    </div>
  )
}

const FormatDate = (date: string) => {
  const DateISOFormat = new Date(date)
  const day = DateISOFormat.getDate()
  const month =
    Number(DateISOFormat.getMonth()) < 9
      ? '0' + (Number(DateISOFormat.getMonth()) + 1)
      : Number(DateISOFormat.getMonth()) + 1
  const year = DateISOFormat.getFullYear()

  return day + '.' + month + '.' + year
}
