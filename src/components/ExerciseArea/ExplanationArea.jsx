import MathText from '../shared/MathText'
import './ExplanationArea.css'

export default function ExplanationArea({ steps }) {
  return (
    <div className="explanation-area">
      <h3 className="explanation-area__title">Step-by-step solution</h3>
      <ol className="explanation-area__steps">
        {steps.map((step, i) => (
          <li key={i} className="explanation-area__step">
            <MathText text={step} displayMode={false} />
          </li>
        ))}
      </ol>
    </div>
  )
}
