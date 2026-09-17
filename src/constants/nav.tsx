import {
  AudioWaveform,
  Calculator,
  Command,
  ContactRound,
  DollarSign,
  FileText,
  Frame,
  GalleryVerticalEnd,
  Gavel,
  HomeIcon,
  LifeBuoy,
  LogsIcon,
  LucideIcon,
  Mail,
  Map,
  MapPin,
  PieChart,
  Send,
  Settings,
  Shield,
  Truck,
  User,
  UserIcon,
  Users,
} from 'lucide-react'

import { HandCoins, Library, ListOrdered, Logs } from 'lucide-react'

// import type { Messages } from 'next-intl'

type NavItem = {
  // title: keyof Messages['nav']
  title: string
  url: string
  icon: LucideIcon
}
export const NAV_MAIN: {
  // title: keyof Messages['nav']
  title: string
  url: string
  icon: LucideIcon
  items: NavItem[]
}[] = [
  {
    title: 'key-rate-management',
    url: '#',
    icon: DollarSign,
    items: [
      {
        title: 'key-client-rate',
        url: '#',
        icon: Gavel,
      },
      {
        title: 'key-qoutation',
        url: '#',
        icon: HandCoins,
      },
      {
        title: 'key-client-tariff',
        url: '#',
        icon: ListOrdered,
      },
      {
        title: 'key-company-tariff',
        url: '#',
        icon: LogsIcon,
      },
    ],
  },
  {
    title: 'key-administration',
    url: '#',
    icon: Users,
    items: [
      {
        title: 'key-staff',
        url: '#',
        icon: ContactRound,
      },
      {
        title: 'key-user',
        url: '#',
        icon: User,
      },
      {
        title: 'key-role',
        url: '#',
        icon: Shield,
      },
    ],
  },
  {
    title: 'key-settings',
    url: '#',
    icon: Settings,
    items: [
      {
        title: 'key-email-log',
        url: '#',
        icon: Mail,
      },
      {
        title: 'key-library',
        url: '#',
        icon: Library,
      },
      {
        title: 'key-system-log',
        url: '#',
        icon: Logs,
      },
      {
        title: 'key-api-integration',
        url: '#',
        icon: Command,
      },
    ],
  },
]

export const NAV_DATA: {
  client: NavItem[]
  navSecondary: NavItem[]
} = {
  client: [
    {
      title: 'key-dashboard',
      url: '/dashboard',
      icon: HomeIcon,
    },
    {
      title: 'key-client',
      url: '/dashboard/test',
      icon: UserIcon,
    },
    {
      title: 'key-transport-job',
      url: '/dashboard/transport-job',
      icon: Truck,
    },
    {
      title: 'key-operation',
      url: '/dashboard/operation',
      icon: MapPin,
    },
    {
      title: 'key-accounting',
      url: '/dashboard/accounting',
      icon: Calculator,
    },
    {
      title: 'key-report',
      url: '/dashboard/report',
      icon: FileText,
    },
  ],
  navSecondary: [
    {
      title: 'key-case',
      url: '#',
      icon: LifeBuoy,
    },
    {
      title: 'key-user-guide',
      url: '#',
      icon: Send,
    },
  ],
}
export const NAV_PROJECTS: {
  name: string
  url: string
  icon: LucideIcon
}[] = [
  {
    name: 'Design Engineering',
    url: '#',
    icon: Frame,
  },
  {
    name: 'Sales & Marketing',
    url: '#',
    icon: PieChart,
  },
  {
    name: 'Travel',
    url: '#',
    icon: Map,
  },
]
export const NAV_TEAMS: {
  name: string
  logo: LucideIcon
  plan: string
}[] = [
  {
    name: 'Acme Inc',
    logo: GalleryVerticalEnd,
    plan: 'Enterprise',
  },
  {
    name: 'Acme Corp.',
    logo: AudioWaveform,
    plan: 'Startup',
  },
  {
    name: 'Evil Corp.',
    logo: Command,
    plan: 'Free',
  },
]
