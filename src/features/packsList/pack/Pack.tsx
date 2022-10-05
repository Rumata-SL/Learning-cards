import React, { ChangeEvent, useEffect, useState } from 'react'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import SchoolIcon from '@mui/icons-material/School'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import {
  IconButton,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../bll/store'
import { PaginationBlock } from '../../../common/components/paginationBlock/PaginationBlock'
import SuperButton from '../../../common/components/superButton/SuperButton'
import { SuperInput } from '../../../common/components/superInput/SuperInput'
import { PATH } from '../../../common/enum/path'
import { AddCardModal } from '../../modal/modalCards/AddCardModal'
import { DeletePacksModal } from '../../modal/modalPacks/DeletePacksModal'
import { UpdatePackModal } from '../../modal/modalPacks/UpdatePackModal'

import s from './Pack.module.css'
import {
  createCardTC,
  deleteCardTC,
  getPackTC,
  PackType,
  setPageAC,
  setPageCountAC,
  updateCardTC,
} from './packReducer'
import { PackTable } from './packTable/PackTable'

type PackPropsType = {}

export const Pack: React.FC<PackPropsType> = props => {
  const dispatch = useAppDispatch()
  const isDeleted = useAppSelector(state => state.packsList.isDeleted)
  const userId = useAppSelector(state => state.profile.profile._id)
  const cardsState = useAppSelector(state => state.pack)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deletePacks, setDeletePacks] = useState<PackType | null>(null)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  // const [updatePacks, setUpdatePacks] = useState<PackType | null>(null)

  const navigate = useNavigate()
  const openPackList = () => navigate(`/packs_list/`)
  const { packId } = useParams<{ packId: string }>()

  // popper functions
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handlePopperMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handlePopperMenuClose = () => {
    setAnchorEl(null)
  }

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

  // handle action functions

  const addCardModalOpenHandler = () => {
    setIsAddModalOpen(true)
  }

  const openDeletePackModal = () => {
    setIsDeleteModalOpen(true)
    setDeletePacks(cardsState)
    handlePopperMenuClose()
  }

  const openUpdatePackModal = () => {
    setIsUpdateModalOpen(true)
    // setUpdatePacks(cardsState)
    handlePopperMenuClose()
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

  if (isDeleted) {
    openPackList()
  }

  return (
    <>
      <div>
        <Link onClick={openPackList} className={s.backLink}>
          <ArrowBackIcon sx={{ color: '#ffffff' }} />
          Back to Packs List
        </Link>

        <div className={s.nameButtonBlock}>
          <div className={s.packNameMenuBlock}>
            <div className={s.packName}>{cardsState.packName}</div>

            {cardsState.packUserId === userId ? (
              <IconButton onClick={handlePopperMenuOpen} className={s.moreButton}>
                <MoreVertOutlinedIcon sx={{ color: '#ffffff' }} />
              </IconButton>
            ) : null}

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handlePopperMenuClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={openUpdatePackModal}>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
              </MenuItem>
              <MenuItem onClick={openDeletePackModal}>
                {/*<MenuItem onClick={handlePopperMenuClose}>*/}
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
              </MenuItem>
              <MenuItem onClick={handlePopperMenuClose}>
                <ListItemIcon>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText>Learn</ListItemText>
              </MenuItem>
            </Menu>
          </div>

          {cardsState.packUserId === userId ? (
            // <SuperButton onClick={handleAddNewCard} className={s.button}>
            <SuperButton onClick={addCardModalOpenHandler} className={s.button}>
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
          // updateCardCallback={handleUpdateCard}
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
        <AddCardModal isOpenModal={isAddModalOpen} setIsModalOpen={setIsAddModalOpen} />
      </div>

      {deletePacks && (
        <DeletePacksModal
          isModalOpen={isDeleteModalOpen}
          setIsModalOpen={setIsDeleteModalOpen}
          packName={deletePacks && deletePacks.packName}
          id={packId as string}
          // id={deletePacks && deletePacks.packUserId}
        />
      )}
      {/*{updatePacks && (
        <UpdatePackModal
          isModalOpen={isUpdateModalOpen}
          setIsModalOpen={setIsUpdateModalOpen}
          pack={updatePacks}
          packName={updatePacks && updatePacks.packName}
          id={updatePacks && updatePacks.packUserId}
        />
      )}*/}
    </>
  )
}
