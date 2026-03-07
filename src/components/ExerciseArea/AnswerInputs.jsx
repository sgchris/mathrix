import {
  CheckCircleIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'
import { useApp } from '../../context/useApp'
import './AnswerInputs.css'

export default function AnswerInputs({
  inputs,
  currentInputs,
  status,
  onChange,
  canCheck,
  canNext,
  hasNextExercise,
  onCheck,
  onNext,
}) {
  const { t } = useApp()
  const isLocked = ['solved', 'failed', 'explanation_shown'].includes(status)

  return (
    <div className="answer-inputs">
      <h4 className="answer-inputs__title">{t('answerSectionTitle')}</h4>
      <div className="answer-inputs__fields">
        {inputs.map(({ name, label, inputType }) => (
          <div key={name} className="answer-row" dir="ltr">
            <label className="answer-row__label" htmlFor={`answer-${name}`}>
              <span dir="auto">{label}</span>
            </label>
            <input
              id={`answer-${name}`}
              type={inputType}
              className={`answer-row__input${
                status === 'solved' ? ' answer-row__input--correct' : ''
              }${status === 'failed' ? ' answer-row__input--wrong' : ''}`}
              value={currentInputs[name] ?? ''}
              onChange={e => onChange(name, e.target.value)}
              disabled={isLocked}
              autoComplete="off"
              dir="ltr"
            />
          </div>
        ))}
      </div>
      <div className="answer-inputs__actions">
        <button
          className="answer-action-btn answer-action-btn--primary"
          disabled={!canCheck}
          onClick={onCheck}
          title={t('actions.checkAnswersTitle')}
        >
          <CheckCircleIcon className="answer-action-btn__icon" />
          {t('actions.checkAnswers')}
        </button>
        <button
          className="answer-action-btn answer-action-btn--next"
          disabled={!canNext || !hasNextExercise}
          onClick={onNext}
          title={t('actions.nextTitle')}
        >
          {t('actions.next')}
          <ArrowRightIcon className="answer-action-btn__icon answer-action-btn__icon--right" />
        </button>
      </div>
    </div>
  )
}
