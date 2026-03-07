import { useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useApp } from '../../context/useApp'
import './MobileDrawer.css'

export default function MobileDrawer({ isOpen, onClose, children }) {
  const { t } = useApp()

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) {
    // We could return null here, but rendering with classes helps transition
  }

  return (
    <>
      <div 
        className={`mobile-drawer-overlay ${isOpen ? 'is-open' : ''}`}
        onClick={onClose}
      />
      <div className={`mobile-drawer ${isOpen ? 'is-open' : ''}`}>
        <div className="mobile-drawer__header">
          <span className="mobile-drawer__title">{t('menu')}</span>
          <button className="mobile-drawer__close" onClick={onClose} aria-label={t('closeMenu')}>
            <XMarkIcon className="w-6 h-6" style={{ width: '24px', height: '24px' }} />
          </button>
        </div>
        <div className="mobile-drawer__content">
          {children}
        </div>
      </div>
    </>
  )
}
