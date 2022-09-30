import React, { useEffect, useState } from 'react'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import {
  FormControl,
  IconButton,
  Link,
  MenuItem,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../bll/store'
import SuperButton from '../../../common/components/superButton/SuperButton'
import { SuperInput } from '../../../common/components/superInput/SuperInput'
import { FormatDate } from '../../../utils/formatDate'

import { Grade } from './Grade'
import s from './Pack.module.css'
import { getPackTC } from './packReducer'

type PackPropsType = {}

/*type cardsType = Array<{
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
}>

export type cardsStateType = {
  cards: cardsType
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
}*/

/*const cardsState: cardsStateType = {
  cards: [
    {
      answer: 'no answer no answer no answer',
      question: 'no question',
      cardsPack_id: '5eb6a2f72f8g49402d46c6ac43',
      grade: 2.987525071790364,
      shots: 1,
      user_id: '142151531535151',
      created: '2020-05-13T11:05:44.867Z',
      updated: '2020-03-13T11:05:44.867Z',
      _id: '5ebbdfbf48876810f1adk0e7ece3',
    },
    {
      answer: 'no answer',
      question: 'no question',
      cardsPack_id: '5eb6a2f72f8g49402d46c6ac43',
      grade: 3.987525071790364,
      shots: 1,
      user_id: '142151531535151',
      created: '2020-05-13T11:05:44.867Z',
      updated: '2020-09-13T11:05:44.867Z',
      _id: '5ebbdf4887681f0f1adk0evf7ece3',
    },
    {
      answer: 'no answer',
      question: 'no question no question no question',
      cardsPack_id: '5eb6a2f72f8g49402d46c6ac43',
      grade: 4.457525071790364,
      shots: 1,
      user_id: '142151531535151',
      created: '2020-10-13T11:05:44.867Z',
      updated: '2020-10-13T11:05:44.867Z',
      _id: '5ebbgdf4887681g0f1adk0e7ece3',
    },
  ],
  cardsTotalCount: 3,
  maxGrade: 4.987525071790364,
  minGrade: 2.0100984354076568,
  page: 1,
  pageCount: 4,
  packUserId: '6328b5b0da5de300045fa02a',
  // packUserId: '5eecf82a3ed8f700042f1186',
}*/

export const Pack: React.FC<PackPropsType> = props => {
  const userId = useAppSelector(state => state.profile.profile._id)
  const cardsState = useAppSelector(state => state.pack)
  const dispatch = useAppDispatch()
  const { packID } = useParams<any>()

  const [pageNumber, setPageNumber] = useState('5')

  useEffect(() => {
    console.log(packID)
    if (packID) {
      dispatch(getPackTC(packID))
    }
  }, [])

  const handleChange = (event: SelectChangeEvent) => {
    setPageNumber(event.target.value)
  }

  const navigate = useNavigate()
  const openPackList = () => navigate(`/packs_list/`)

  return (
    <div>
      {/*<NavLink className={s.backLink} to={PATH.PACKS_LIST}><ArrowBackIcon sx={{ color: '#ffffff' }} />
        Back to Packs List</NavLink>*/}
      <Link onClick={openPackList} className={s.backLink}>
        <ArrowBackIcon sx={{ color: '#ffffff' }} />
        Back to Packs List
      </Link>

      <div className={s.nameButtonBlock}>
        <div className={s.nameMoreBlock}>
          {cardsState.packUserId === userId ? 'My Pack' : 'Friend`s Pack'}

          {cardsState.packUserId === userId ? (
            <IconButton onClick={() => alert('Пока не работает')} className={s.moreButton}>
              <MoreVertOutlinedIcon sx={{ color: '#ffffff' }} />
            </IconButton>
          ) : null}
        </div>

        {cardsState.packUserId === userId ? (
          <SuperButton onClick={() => alert('Пока не работает')} className={s.button}>
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

      <TableContainer className={s.tableBlock} component={Paper}>
        <Table size={'small'}>
          <TableHead className={s.tableHeader}>
            <TableRow style={{ height: '48px' }}>
              <TableCell>Question</TableCell>
              <TableCell align="left">Answer</TableCell>
              <TableCell align="left">Last Updated</TableCell>
              <TableCell align="left">Grade</TableCell>

              {cardsState.packUserId === userId ? (
                <TableCell width={80} align="left"></TableCell>
              ) : null}
            </TableRow>
          </TableHead>

          <TableBody>
            {cardsState.cards.map(row => {
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

                  {cardsState.packUserId === userId ? (
                    <TableCell align="left">
                      <IconButton onClick={() => alert('Пока не работает')}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => alert('Пока не работает')}>
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

      <div className={s.paginationBlock}>
        <Pagination className={s.pagination} count={10} shape="rounded" />

        <FormControl className={s.selectBlock}>
          <div>Show</div>
          <Select value={pageNumber} onChange={handleChange} autoWidth className={s.select}>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
          <div>cards per page</div>
        </FormControl>
      </div>
    </div>
  )
}
