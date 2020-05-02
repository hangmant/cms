import CategoryIcon from '@material-ui/icons/Category'
import FontDownloadIcon from '@material-ui/icons/FontDownload'

export type SidebarItem = {
  title: string
  to: string
  icon: Function
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
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

export const SIDEBAR_WIDTH = 240
