import './AnswerInputs.css'

export default function AnswerInputs({ inputs, currentInputs, status, onChange }) {
  const isLocked = ['solved', 'failed', 'explanation_shown'].includes(status)

  return (
    <div className="answer-inputs">
      <h4 className="answer-inputs__title">Your Answer</h4>
      <div className="answer-inputs__fields">
        {inputs.map(({ name, label, inputType }) => (
          <div key={name} className="answer-row">
            <label className="answer-row__label" htmlFor={`answer-${name}`}>
              {label}
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
            />
          </div>
        ))}
      </div>
    </div>
  )
}
