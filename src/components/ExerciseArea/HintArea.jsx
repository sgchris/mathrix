import { LightBulbIcon } from '@heroicons/react/24/solid'
import { useApp } from '../../context/useApp'
import MathText from '../shared/MathText'
import './HintArea.css'

export default function HintArea({ hints, hintIndex }) {
  const { t } = useApp()
  const visibleHints = hints.slice(0, hintIndex)

  return (
    <div className="hint-area">
      <div className="hint-area__header">
        <LightBulbIcon className="hint-area__icon" />
        <span>{t('hintTitle', { count: visibleHints.length })}</span>
      </div>
      <ol className="hint-area__list">
        {visibleHints.map((hint, i) => (
          <li key={i} className="hint-area__item">
            <MathText text={hint} displayMode={false} />
          </li>
        ))}
      </ol>
    </div>
  )
}
