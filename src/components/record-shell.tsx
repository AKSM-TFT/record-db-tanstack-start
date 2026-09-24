import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { LogOutIcon } from 'lucide-react'

import type { User } from '#/db/schema'
import { Button } from '#/components/ui/button'

type RecordAppShellProps = {
  children: ReactNode
  onLogout: () => void | Promise<void>
  roleLabel: string
  user: User | null
}

export function RecordAppShell({
  children,
  onLogout,
  roleLabel,
  user,
}: RecordAppShellProps) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__inner">
          <Link
            className="brand-lockup"
            to={roleLabel === 'Patient' ? '/patient' : '/staff'}
            aria-label="Record database home"
          >
            <span className="brand-mark" aria-hidden="true">
              R
            </span>
            <span className="brand-copy">
              <span className="brand-name">Record database</span>
              <span className="brand-subtitle">Authenticated workspace</span>
            </span>
          </Link>

          <div className="header-context" aria-label={`${roleLabel} workspace`}>
            <span className="header-context__dot" aria-hidden="true" />
            <span>{roleLabel} workspace</span>
          </div>

          <div className="header-account">
            <div className="header-account__identity">
              <span className="header-account__name">
                {user?.name ?? 'Account'}
              </span>
              <span className="header-account__email">{user?.email ?? ''}</span>
            </div>
            <Button
              className="sign-out-button"
              onClick={onLogout}
              size="sm"
              type="button"
              variant="ghost"
            >
              <LogOutIcon aria-hidden="true" />
              <span>Sign out</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="app-main">{children}</main>

      <footer className="app-footer">
        <div className="app-footer__inner">
          <span>Record database</span>
          <span>TanStack Form practice</span>
        </div>
      </footer>
    </div>
  )
}

type RecordPageHeaderProps = {
  action?: ReactNode
  description: string
  title: string
}

export function RecordPageHeader({
  action,
  description,
  title,
}: RecordPageHeaderProps) {
  return (
    <div className="page-header">
      <div className="page-header__copy">
        <h1 className="page-title">{title}</h1>
        <p className="page-description">{description}</p>
      </div>
      {action ? <div className="page-header__actions">{action}</div> : null}
    </div>
  )
}

type RecordSectionHeaderProps = {
  count: number
  description: string
  title: string
}

export function RecordSectionHeader({
  count,
  description,
  title,
}: RecordSectionHeaderProps) {
  const countLabel = `${count} ${count === 1 ? 'record' : 'records'}`

  return (
    <div className="record-section__header">
      <div>
        <h2 className="record-section__title">{title}</h2>
        <p className="record-section__description">{description}</p>
      </div>
      <span className="record-count" aria-label={countLabel}>
        {countLabel}
      </span>
    </div>
  )
}
