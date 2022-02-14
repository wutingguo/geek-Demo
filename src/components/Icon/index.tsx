import React from 'react'
import classnames from 'classnames'

type Props = {
  type: string
  className?: string
  onClick?: () => void
}

export default function Icon({ type, className, onClick }: Props) {
  return (
    <svg className={classnames('icon', className)}>
      <use xlinkHref={`#${type}`}></use>
    </svg>
  )
}
