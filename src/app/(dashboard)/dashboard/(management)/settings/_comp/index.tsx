'use client'

import { Tab, Tabs } from '@heroui/tabs'
import { Settings } from 'lucide-react'
import SiteSetting from './tabs/site-setting'

export default function TabsComponent() {
  return (
    <div className='flex flex-col px-4'>
      <div className='flex w-full flex-col'>
        <Tabs
          aria-label='Options'
          classNames={{
            tabList: 'bg-secondary',
            tab: 'min-w-[200px] text-left justify-start ',
            panel: 'flex-1'
          }}
          color='primary'
          variant='bordered'
          isVertical={true}
        >
          <Tab
            key='site-settings'
            title={
              <div className='flex items-center space-x-2'>
                <Settings size={16} />
                <span>Site Settings</span>
              </div>
            }
          >
            <SiteSetting />
          </Tab>
          <Tab
            key='app-settings'
            title={
              <div className='flex items-center space-x-2'>
                <Settings size={16} />
                <span>App Settings</span>
              </div>
            }
          >
            <SiteSetting />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}
