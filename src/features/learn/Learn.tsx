import React, { useEffect, useState } from 'react'

import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { useParams } from 'react-router-dom'

import { CardGradeType, CardType } from '../../api/cards/packAPI'
import { useAppDispatch, useAppSelector } from '../../bll/store'
import { BackToPackList } from '../../common/components/backToPackList/BackToPackList'
import SuperButton from '../../common/components/superButton/SuperButton'
import { getRandomCard } from '../../utils/getRandomCard'
import { selectPack } from '../../utils/selectors/selectors'
import { getPackTC, updateCardGradeTC } from '../packsList/pack/packReducer'

import s from './Learn.module.css'

const grades = [
  {
    title: 'Did not know',
    value: 1 as CardGradeType,
  },
  {
    title: 'Forgot',
    value: 2 as CardGradeType,
  },
  {
    title: 'A lot of thought',
    value: 3 as CardGradeType,
  },
  {
    title: 'Сonfused',
    value: 4 as CardGradeType,
  },
  {
    title: 'Knew the answer',
    value: 5 as CardGradeType,
  },
]

const Learn = () => {
  const [showAnswer, setShowAnswer] = useState(false)
  const [first, setFirst] = useState<boolean>(true)
  const { cards, packName } = useAppSelector(selectPack)
  const { packId } = useParams()

  const [card, setCard] = useState<CardType>({} as CardType)
  const [gradeRadioValue, setGradeRadioValue] = useState<CardGradeType>(1)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (first) {
      dispatch(getPackTC(packId as string))
      setFirst(false)
    }

    if (cards.length > 0) setCard(getRandomCard(cards))
  }, [dispatch, packId, cards, first])

  const handleChangeRadioValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGradeRadioValue(+(event.target as HTMLInputElement).value as CardGradeType)
  }

  const onNext = () => {
    setShowAnswer(false)

    if (cards.length > 0) {
      dispatch(updateCardGradeTC(gradeRadioValue, card._id))
      setCard(getRandomCard(cards))
    }
  }

  console.log(card)

  return (
    <div>
      <BackToPackList />
      <h3 className={s.title}>Learn “{packName}”</h3>
      <div className={s.container}>
        <div className={s.question}>
          {card.questionImg ? (
            <div className={s.questionImg}>
              <img src={card.questionImg} alt="question" />
            </div>
          ) : (
            <>
              <span>Question: </span> {card.question}
            </>
          )}
        </div>
        <div className={s.countAnswers}>
          Количество попыток ответов на вопрос: <span>{card.shots}</span>
        </div>
        {showAnswer && (
          <>
            <div className={s.answer}>
              {card.answerImg ? (
                <div className={s.answerImg}>
                  <img src={card.answerImg} alt="answer" />
                </div>
              ) : (
                <>
                  <span>Answer: </span> {card.answer}
                </>
              )}
            </div>
            <FormControl className={s.radioGroup}>
              <FormLabel className={s.radioGroupLabel}>Rate yourself:</FormLabel>
              <RadioGroup value={gradeRadioValue} onChange={handleChangeRadioValue}>
                {grades.map((g, i) => (
                  <FormControlLabel
                    key={'grade-' + i}
                    value={g.value}
                    control={<Radio />}
                    label={g.title}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </>
        )}

        {showAnswer ? (
          <SuperButton className={s.button} onClick={onNext}>
            Next
          </SuperButton>
        ) : (
          <SuperButton className={s.button} onClick={() => setShowAnswer(true)}>
            Show answer
          </SuperButton>
        )}
      </div>
    </div>
  )
}

export default Learn
