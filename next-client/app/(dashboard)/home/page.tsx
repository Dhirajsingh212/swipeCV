import { getUserForms } from '@/actions/form'
import HomePageComp from '@/components/HomePageComp'
import { auth } from '@clerk/nextjs/server'

const Homepage = async () => {
  const { userId } = auth()
  const userFormData: any = await getUserForms(userId || '')
  return <>{userFormData && <HomePageComp forms={userFormData.forms} />}</>
}

export default Homepage
