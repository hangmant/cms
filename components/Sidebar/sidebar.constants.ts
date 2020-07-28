import CategoryIcon from '@material-ui/icons/Category'
import FontDownloadIcon from '@material-ui/icons/FontDownload'
import ChatIcon from '@material-ui/icons/Chat'

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
  {
    title: 'Messages',
    to: '/messages',
    icon: ChatIcon,
  },
]

export const SIDEBAR_WIDTH = 240
