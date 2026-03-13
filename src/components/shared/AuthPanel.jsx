import { ArrowRightStartOnRectangleIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline'
import { useApp } from '../../context/useApp'
import './AuthPanel.css'

function formatLastSyncedAt(timestamp, language) {
  if (!timestamp) return null

  return new Intl.DateTimeFormat(language, {
    hour: 'numeric',
    minute: '2-digit',
    month: 'short',
    day: 'numeric',
  }).format(timestamp)
}

export default function AuthPanel() {
  const {
    authState,
    syncState,
    isCloudSyncEnabled,
    language,
    signInWithGoogle,
    signOutUser,
    t,
  } = useApp()

  const isBusy = authState.action !== 'idle'
  const formattedSyncTime = formatLastSyncedAt(syncState.lastSyncedAt, language)
  const syncLabel = t(`sync.${syncState.status}`, { time: formattedSyncTime })

  return (
    <section className="auth-panel" aria-label={t('auth.title')}>
      <div className="auth-panel__header">
        <div>
          <p className="auth-panel__eyebrow">{t('auth.title')}</p>
          <p className="auth-panel__status">{syncLabel}</p>
        </div>
        <CloudArrowUpIcon className="auth-panel__icon" aria-hidden="true" />
      </div>

      {!isCloudSyncEnabled && (
        <p className="auth-panel__message auth-panel__message--warning">{t('auth.notConfigured')}</p>
      )}

      {isCloudSyncEnabled && authState.status === 'loading' && (
        <p className="auth-panel__message">{t('auth.loading')}</p>
      )}

      {isCloudSyncEnabled && authState.user && (
        <>
          <div className="auth-panel__user">
            {authState.user.photoURL ? (
              <img
                className="auth-panel__avatar"
                src={authState.user.photoURL}
                alt={authState.user.displayName || authState.user.email || 'User avatar'}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="auth-panel__avatar auth-panel__avatar--fallback" aria-hidden="true">
                {(authState.user.displayName || authState.user.email || '?').slice(0, 1).toUpperCase()}
              </div>
            )}
            <div>
              <p className="auth-panel__name">{authState.user.displayName || t('auth.welcomeBack')}</p>
              <p className="auth-panel__email">{authState.user.email}</p>
            </div>
          </div>

          <button
            type="button"
            className="auth-panel__button auth-panel__button--secondary"
            onClick={signOutUser}
            disabled={isBusy}
          >
            <ArrowRightStartOnRectangleIcon className="auth-panel__button-icon" aria-hidden="true" />
            <span>{authState.action === 'signing-out' ? t('auth.signingOut') : t('auth.signOut')}</span>
          </button>
        </>
      )}

      {isCloudSyncEnabled && authState.status === 'ready' && !authState.user && (
        <>
          <p className="auth-panel__message">{t('auth.signInHint')}</p>
          <button
            type="button"
            className="auth-panel__button auth-panel__button--primary"
            onClick={signInWithGoogle}
            disabled={isBusy}
          >
            <span>{authState.action === 'signing-in' ? t('auth.signingIn') : t('auth.googleSignIn')}</span>
          </button>
        </>
      )}

      {(authState.error || syncState.error) && (
        <p className="auth-panel__message auth-panel__message--error">{authState.error || syncState.error}</p>
      )}
    </section>
  )
}