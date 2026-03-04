import './ReasoningTextbox.css'

export default function ReasoningTextbox({ value, onChange }) {
  return (
    <div className="reasoning-box">
      <label className="reasoning-box__label" htmlFor="reasoning-textarea">
        Show your working (optional)
      </label>
      <textarea
        id="reasoning-textarea"
        className="reasoning-box__textarea"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Write out your steps here..."
        rows={4}
      />
    </div>
  )
}
