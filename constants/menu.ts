import FontDownloadIcon from '@material-ui/icons/FontDownload'
import CategoryIcon from '@material-ui/icons/Category'

export type MenuItem = {
  title: string
  to: string
  icon: Function
}

export const MENU_ITEMS: MenuItem[] = [
  {
    title: 'Words',
    to: '/words',
    icon: FontDownloadIcon,
  },
  {
    title: 'Categories',
    to: '/categories',
    icon: CategoryIcon,
  },
]
