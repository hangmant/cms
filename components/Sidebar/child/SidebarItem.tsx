import { Button, colors, makeStyles } from '@material-ui/core'
import NextLink from 'next/link'
import React from 'react'
import { noop } from '../../../utils/shared.utils'

type SidebarItemProps = {
  to?: string
  onClick?: any
  title: string
  IconComponent: React.ElementRef<any>
}

const SidebarItem = ({ to, onClick = noop, title, IconComponent }: SidebarItemProps) => {
  const classes = useStyles()

  return to ? (
    <NextLink href={to} passHref>
      <Button fullWidth className={classes.button}>
        <div className={classes.icon}>
          <IconComponent />
        </div>
        {title}
      </Button>
    </NextLink>
  ) : (
    <Button onClick={onClick} fullWidth className={classes.button}>
      <div className={classes.icon}>
        <IconComponent />
      </div>
      {title}
    </Button>
  )
}

const useStyles = makeStyles(theme => ({
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    fontWeight: theme.typography.fontWeightMedium,
    '&:active': {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium,
      '& $icon': {
        color: theme.palette.primary.main,
      },
    },
  },
  icon: {
    color: (theme.palette as any).icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1),
  },
}))

export default SidebarItem
