import {
  CheckCircleIcon,
  LightBulbIcon,
  QuestionMarkCircleIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'
import './ActionBar.css'

export default function ActionBar({
  canCheck,
  canHint,
  canNext,
  hasNextExercise,
  onCheck,
  onHint,
  onHowToSolve,
  onNext,
}) {
  return (
    <div className="action-bar">
      <button
        className="action-btn action-btn--primary"
        disabled={!canCheck}
        onClick={onCheck}
        title="Check your answers"
      >
        <CheckCircleIcon className="action-btn__icon" />
        Check Answers
      </button>

      <button
        className="action-btn"
        disabled={!canHint}
        onClick={onHint}
        title="Get a hint"
      >
        <LightBulbIcon className="action-btn__icon" />
        Give Hint
      </button>

      <button
        className="action-btn"
        onClick={onHowToSolve}
        title="Show the full solution"
      >
        <QuestionMarkCircleIcon className="action-btn__icon" />
        How to solve?
      </button>

      <button
        className="action-btn action-btn--next"
        disabled={!canNext || !hasNextExercise}
        onClick={onNext}
        title="Go to next exercise"
      >
        Next
        <ArrowRightIcon className="action-btn__icon action-btn__icon--right" />
      </button>
    </div>
  )
}
