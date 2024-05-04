import useNavigation from '@renderer/stores/navigate'
import React from 'react'

type LinkProps = {
  to: string
  className?: string
  children?: React.ReactNode
}

export default function Link(props: LinkProps) {
  const navigation = useNavigation()
  return (
    <button className={props.className ?? ''} onClick={() => navigation.navigate(props.to)}>
      {props.children}
    </button>
  )
}
