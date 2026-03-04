import { LightBulbIcon } from '@heroicons/react/24/solid'
import './HintArea.css'

export default function HintArea({ hints, hintIndex }) {
  const visibleHints = hints.slice(0, hintIndex)

  return (
    <div className="hint-area">
      <div className="hint-area__header">
        <LightBulbIcon className="hint-area__icon" />
        <span>Hint{visibleHints.length > 1 ? 's' : ''}</span>
      </div>
      <ol className="hint-area__list">
        {visibleHints.map((hint, i) => (
          <li key={i} className="hint-area__item">
            {hint}
          </li>
        ))}
      </ol>
    </div>
  )
}
