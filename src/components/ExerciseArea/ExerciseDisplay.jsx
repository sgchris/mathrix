import MathText from '../shared/MathText'
import './ExerciseDisplay.css'

export default function ExerciseDisplay({ question }) {
  return (
    <div className="exercise-display">
      <p className="exercise-display__text">{question.text}</p>
      {question.mathExpression && question.mathExpression.length > 0 && (
        <div className="exercise-display__math">
          {question.mathExpression.map((expr, i) => (
            <div key={i} className="exercise-display__math-line">
              <MathText text={expr} displayMode={true} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
