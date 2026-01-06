import { BarChart3, CreditCard, FileText, LayoutDashboard, Settings, Users } from 'lucide-react'
import { ROUTES } from '@/constants/routes'

export const MENU_ITEMS = [
  {
    title: 'Main',
    items: [
      { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: ROUTES.DASHBOARD },
      { key: 'analytics', label: 'Analytics', icon: BarChart3, href: ROUTES.ANALYTICS },
      { key: 'team', label: 'Team', icon: Users, href: ROUTES.TEAM }
    ]
  },
  {
    title: 'Management',
    items: [
      { key: 'projects', label: 'Projects', icon: FileText, href: ROUTES.PROJECTS },
      { key: 'billing', label: 'Billing', icon: CreditCard, href: ROUTES.BILLING },
      { key: 'settings', label: 'Settings', icon: Settings, href: ROUTES.SETTINGS }
    ]
  }
]
