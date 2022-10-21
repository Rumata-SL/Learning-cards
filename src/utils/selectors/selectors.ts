import { AppStateType } from '../../bll/store'

// AppSelectors
export const selectAppError = (state: AppStateType) => state.app.error
export const selectAppStatus = (state: AppStateType) => state.app.status
export const selectAppIsInitial = (state: AppStateType) => state.app.isInitial

// ProfileSelectors
export const selectProfile = (state: AppStateType) => state.profile.profile
export const selectProfileAvatar = (state: AppStateType) => state.profile.profile.avatar
export const selectProfileName = (state: AppStateType) => state.profile.profile.name
export const selectProfileUserId = (state: AppStateType) => state.profile.profile._id

// LoginSelectors
export const selectLoginIsLoggedIn = (state: AppStateType) => state.login.isLoggedIn

// NewPasswordSelectors
export const selectNewPasswordIsCreated = (state: AppStateType) => state.newPassword.isCreated

// RecoverySelectors
export const selectRecoveryIsRequested = (state: AppStateType) => state.recovery.isRequested

// PackSelectors
export const selectPack = (state: AppStateType) => state.pack
export const selectPackIsDeleted = (state: AppStateType) => state.pack.isDeleted
export const selectPackCardQuestion = (state: AppStateType) => state.pack.searchData.cardQuestion

// PackListSelectors
export const selectPacksListCardPacks = (state: AppStateType) => state.packsList.cardPacks
export const selectPacksListPageCount = (state: AppStateType) => state.packsList.pageCount
export const selectPacksListPage = (state: AppStateType) => state.packsList.page
export const selectPacksListCardPacksTotalCount = (state: AppStateType) =>
  state.packsList.cardPacksTotalCount
export const selectPacksListIsMyPack = (state: AppStateType) => state.packsList.isMyPack
export const selectPackListFiltersModel = (state: AppStateType) => state.packsList.filtersModel
export const selectPackListMinCardsCount = (state: AppStateType) => state.packsList.filtersModel.min
export const selectPackListMaxCardsCount = (state: AppStateType) => state.packsList.filtersModel.max
export const selectPackListPackName = (state: AppStateType) => state.packsList.filtersModel.packName
export const selectPackListSortPacks = (state: AppStateType) =>
  state.packsList.filtersModel.sortPacks
