import React from 'react'

import SuperButton from '../../common/components/superButton/SuperButton'
import t from '../../common/styles/Title.module.css'

import s from './PacksList.module.css'
import { PacksListTable } from './PacksListTable'

type PacksListPropsType = {}

export const PacksList: React.FC<PacksListPropsType> = props => {
  return (
    <div>
      <div className={s.header}>
        <h2 className={t.title}>Packs list</h2>
        <div>
          <SuperButton
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '175px',
              fontFamily: 'Montserrat',
              fontSize: '16px',
              fontWeight: '500',
            }}
          >
            Add new pack
          </SuperButton>
        </div>
      </div>

      <div className={s.settings}>
        <div className={s.searchBlock}>Search</div>
        <div className={s.filterByBlock}>Show packs cards</div>
        <div className={s.filterNumberCardsBlock}>Number of cards</div>
        <div className={s.resetFilterBlock}>Reset</div>
      </div>

      <PacksListTable />

      <div className={s.paginationBlock}>Pagination</div>
    </div>
  )
}
