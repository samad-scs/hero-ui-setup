import StatsCard from './_home/stats-card'

export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard'
}

const Dashboard = () => {
  return (
    <div className='min-h-screen space-y-3'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <StatsCard
          title='Total Revenue'
          value='$1,250.00'
          change='+12.5%'
          changeType='positive'
          trendLabel='Trending up this month'
          description='Visitors for the last 6 months'
        />
        {/* Adding a few more variations for robust verification */}
        <StatsCard
          title='Active Users'
          value='5,231'
          change='-2.4%'
          changeType='negative'
          trendLabel='Down from last week'
          description='Daily active users'
        />
        <StatsCard
          title='Total Sales'
          value='$45,982'
          change='+8.1%'
          changeType='positive'
          trendLabel='Trending up'
          description='Sales processed this month'
        />
        <StatsCard
          title='Server Uptime'
          value='99.9%'
          change='0.0%'
          changeType='neutral'
          trendLabel='Stable performance'
          description='Last 30 days check'
        />
      </div>
    </div>
  )
}

export default Dashboard
