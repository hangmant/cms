import Link from 'next/link'
import React from 'react'

type ButtonLinkProps = {
  className?: string
  href?: string
  hrefAs?: string
  children?: React.ElementRef<any>
  prefetch?: boolean
}

export const ButtonLink = ({
  className,
  href,
  hrefAs,
  children,
  prefetch = false,
}: ButtonLinkProps) => (
  <Link href={href} as={hrefAs} prefetch={prefetch}>
    <a className={className}>{children}</a>
  </Link>
)
