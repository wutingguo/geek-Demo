import React from 'react'
import classnames from 'classnames'

type Props = {
  type: string
  className?: string
}

export default function Icon({ type, className }: Props) {
  return (
    <svg className={classnames('icon', className)}>
      <use xlinkHref={`#${type}`}></use>
    </svg>
  )
}
