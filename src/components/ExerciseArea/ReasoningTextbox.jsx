import { useApp } from '../../context/useApp'
import './ReasoningTextbox.css'

export default function ReasoningTextbox({ value, onChange }) {
  const { t } = useApp()

  return (
    <div className="reasoning-box">
      <label className="reasoning-box__label" htmlFor="reasoning-textarea">
        {t('scratchPad.title')}
      </label>
      <p className="reasoning-box__sublabel">{t('scratchPad.description')}</p>
      <textarea
        id="reasoning-textarea"
        className="reasoning-box__textarea"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={t('scratchPad.placeholder')}
        rows={6}
      />
    </div>
  )
}
