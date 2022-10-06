import React, { FC, useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../bll/store'
import { BackToPackList } from '../../common/components/backToPackList/BackToPackList'
import SuperButton from '../../common/components/superButton/SuperButton'
import { getRandomCard } from '../../utils/getRandomCard'
import { CardType, getPackTC } from '../packsList/pack/packReducer'

import s from './Learn.module.css'

type PropsType = {}

const Learn: FC<PropsType> = () => {
  const dispatch = useAppDispatch()
  const { packId } = useParams<{ packId: string }>()
  const packName = useAppSelector(state => state.pack.packName)
  const cards = useAppSelector(state => state.pack.cards)
  const [card, setCard] = useState<CardType>()
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() => {
    dispatch(getPackTC(packId ? packId : ''))
    if (cards && cards.length > 0) setCard(getRandomCard(cards))
  }, [])

  const showAnswerHandler = () => {
    setShowAnswer(true)
  }

  const nextCardHandler = () => {
    setShowAnswer(false)
    setCard(getRandomCard(cards))
  }

  return (
    <div>
      <BackToPackList />

      <h3 className={s.title}>Learn “{packName}”</h3>

      <div className={s.container}>
        <div className={s.question}>
          <span>Question: </span> {card && card.question}
        </div>
        <div className={s.countAnswers}>
          Количество попыток ответов на вопрос: <span>10</span>
        </div>
        {showAnswer && (
          <div className={s.answer}>
            <span>Answer: </span> {card && card.answer}
          </div>
        )}

        {showAnswer ? (
          <SuperButton className={s.button} onClick={nextCardHandler}>
            Next
          </SuperButton>
        ) : (
          <SuperButton className={s.button} onClick={showAnswerHandler}>
            Show answer
          </SuperButton>
        )}
      </div>
    </div>
  )
}

export default Learn
