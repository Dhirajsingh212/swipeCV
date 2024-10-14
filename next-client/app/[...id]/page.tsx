import { getSingleFormById } from '@/actions/form'
import SingleForm from '@/components/SingleForm'

const Component = async ({ params }: { params: { id: string[] } }) => {
  const singleFormData = await getSingleFormById(params.id[0])
  console.log(singleFormData)

  return <>{singleFormData && <SingleForm formData={singleFormData} />}</>
}

export default Component
