import React, { ChangeEvent, useEffect, useState } from 'react'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import SchoolIcon from '@mui/icons-material/School'
import {
  IconButton,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

import { CardPacksType } from '../../../api/cards/packsListAPI'
import defaultCover from '../../../assets/image/noImage.png'
import { useAppDispatch, useAppSelector } from '../../../bll/store'
import { BackToPackList } from '../../../common/components/backToPackList/BackToPackList'
import { AddCardModal } from '../../../common/components/modal/modalCards/AddCardModal'
import { DeletePacksModal } from '../../../common/components/modal/modalPacks/DeletePacksModal'
import { UpdatePackModal } from '../../../common/components/modal/modalPacks/UpdatePackModal'
import { PaginationBlock } from '../../../common/components/paginationBlock/PaginationBlock'
import SuperButton from '../../../common/components/superButton/SuperButton'

import s from './Pack.module.css'
import {
  getPackTC,
  PackType,
  resetCardsFiltersAC,
  setIsDeletedAC,
  setPageAC,
  setPageCountAC,
} from './packReducer'
import { PackTable } from './packTable/PackTable'
import { SearchCard } from './searchCard/SearchCard'

type PackPropsType = {}

const Pack: React.FC<PackPropsType> = props => {
  const dispatch = useAppDispatch()
  const isDeleted = useAppSelector(state => state.pack.isDeleted)
  const userId = useAppSelector(state => state.profile.profile._id)
  const cardsState = useAppSelector(state => state.pack)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deletePacks, setDeletePacks] = useState<PackType | null>(null)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [updatePacks, setUpdatePacks] = useState<CardPacksType | null | undefined>(null)

  const navigate = useNavigate()
  const openPackList = () => navigate(`/packs_list/`)
  const learnPack = (packId: string) => navigate(`/learn/${packId}/`)
  const { packId = '' } = useParams<{ packId: string }>()

  // find current pack state
  const allPacks = useAppSelector(state => state.packsList.cardPacks)
  const currentPack = allPacks.find(pack => pack._id === packId)

  // popper functions
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handlePopperMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handlePopperMenuClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    dispatch(getPackTC(packId))
  }, [
    cardsState.searchData.pageCount,
    cardsState.searchData.page,
    cardsState.searchData.cardQuestion,
    cardsState.searchData.sortCards,
    cardsState.packDeckCover,
  ])

  useEffect(() => {
    return () => {
      dispatch(resetCardsFiltersAC())
    }
  }, [])

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
    setUpdatePacks(currentPack)
    handlePopperMenuClose()
  }

  if (isDeleted) {
    openPackList()
    dispatch(setIsDeletedAC(false))
  }

  return (
    <>
      <div>
        <BackToPackList />

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
              <MenuItem
                disabled={cardsState.cardsTotalCount === 0}
                onClick={() => learnPack(packId)}
              >
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
            <SuperButton
              disabled={cardsState.cardsTotalCount === 0}
              onClick={() => learnPack(packId)}
              className={s.button}
            >
              Learn to Pack
            </SuperButton>
          )}
        </div>

        <div className={s.deckCover}>
          <img
            src={cardsState.packDeckCover ? cardsState.packDeckCover : defaultCover}
            alt="cover"
          />
        </div>

        {(!!cardsState.cards.length || !!cardsState.searchData.cardQuestion) && <SearchCard />}

        {!!cardsState.cards.length && (
          <div>
            <PackTable cardsState={cardsState} userId={userId} />

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
        )}

        {!cardsState.cards.length && !!cardsState.searchData.cardQuestion && (
          <div className={s.infoMessage}>
            No cards were found in the pack according to your request
          </div>
        )}

        {!cardsState.cards.length &&
          !cardsState.searchData.cardQuestion &&
          cardsState.packUserId === userId && (
            <div className={s.infoMessage}>
              This pack is empty. Click add new card to fill this pack
            </div>
          )}

        {!cardsState.cards.length &&
          !cardsState.searchData.cardQuestion &&
          cardsState.packUserId !== userId && (
            <div className={s.infoMessage}>This pack is empty</div>
          )}
      </div>

      <AddCardModal isOpenModal={isAddModalOpen} setIsModalOpen={setIsAddModalOpen} />

      {deletePacks && (
        <DeletePacksModal
          isModalOpen={isDeleteModalOpen}
          setIsModalOpen={setIsDeleteModalOpen}
          packName={deletePacks && deletePacks.packName}
          id={packId as string}
          // id={deletePacks && deletePacks.packUserId}
        />
      )}
      {cardsState && (
        <UpdatePackModal
          isModalOpen={isUpdateModalOpen}
          setIsModalOpen={setIsUpdateModalOpen}
          cardPack={cardsState}
          packName={cardsState && cardsState.packName}
          id={packId && packId}
        />
      )}
    </>
  )
}

export default Pack
