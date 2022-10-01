import React, { FC } from 'react'

import { FormControl, Pagination, Select, MenuItem, SelectChangeEvent } from '@mui/material'

import s from './PaginationBlock.module.css'

type PropsType = {
  page: number
  totalItemsCount: number
  pageItemsCount: number
  onChangePage: (event: React.ChangeEvent<unknown>, page: number) => void
  selectItems: number[]
  defaultSelectValue: number
  onChangeSelect: (event: SelectChangeEvent) => void
}

export const PaginationBlock: FC<PropsType> = ({
  page,
  totalItemsCount,
  pageItemsCount,
  onChangePage,
  selectItems,
  defaultSelectValue,
  onChangeSelect,
}) => {
  const pagesCount = Math.ceil(totalItemsCount / pageItemsCount)

  return (
    <div className={s.paginationBlock}>
      <Pagination
        className={s.pagination}
        count={pagesCount}
        shape="rounded"
        page={page}
        onChange={onChangePage}
      />
      <FormControl className={s.selectBlock}>
        <div>Show</div>
        <Select
          value={defaultSelectValue.toString()}
          onChange={onChangeSelect}
          autoWidth
          className={s.select}
        >
          {selectItems.map((el, index) => (
            <MenuItem key={index} value={el}>
              {el}
            </MenuItem>
          ))}
        </Select>
        <div>Cards per Page</div>
      </FormControl>
    </div>
  )
}
