import React, { ChangeEvent, useEffect } from 'react'

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
import { getPackTC, setPageAC, setPageCountAC } from './packReducer'

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
  const pagesCount = Math.ceil(cardsState.cardsTotalCount / cardsState.searchData.pageCount)
  const handlePageCountChange = (event: SelectChangeEvent) => {
    dispatch(setPageCountAC(+event.target.value))
  }
  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    dispatch(setPageAC(page))
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
        <Pagination
          onChange={handlePageChange}
          className={s.pagination}
          count={pagesCount}
          shape="rounded"
        />

        <FormControl className={s.selectBlock}>
          <div>Show</div>
          <Select
            value={cardsState.searchData.pageCount.toString()}
            onChange={handlePageCountChange}
            autoWidth
            className={s.select}
          >
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
