/* eslint-disable */

import React from 'react'

import s from './Pack.module.css'
import {Link, TextField} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SuperButton from '../../../common/components/superButton/SuperButton';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import {SuperInput} from '../../../common/components/superInput/SuperInput';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

type PackPropsType = {}

export const Pack: React.FC<PackPropsType> = props => {
    return <div>

        <Link className={s.backLink} href="#">
            <ArrowBackIcon sx={{color: '#ffffff'}}/>
            Back to Packs List
        </Link>

        <div className={s.nameButtonBlock}>
            <div className={s.nameMoreBlock}>
                Friend's My Pack
                <div onClick={() => alert('Не лезь сюда')} className={s.moreButton}><MoreVertOutlinedIcon
                    sx={{color: '#ffffff'}}/></div>
            </div>
            <SuperButton onClick={() => alert('Пока не работает')} className={s.button}>Learn to Pack</SuperButton>
        </div>

        <div className={s.searchBlock}>
            <div className={s.searchBlockText}>Search</div>

            <div className={s.inputBlock}>
                <SuperInput placeholder={'Provide your text'}/>
                <SearchOutlinedIcon className={s.searchIcon} sx={{color: '#ffffff'}}/>
            </div>
        </div>

    </div>
}
