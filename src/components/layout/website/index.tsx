import FooterLayout from './footer'
import Header from './header'

const WebsiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <FooterLayout />
    </>
  )
}

export default WebsiteLayout
