import PricingCard from './PricingCard'

const Pricing = () => {
  return (
    <section id='pricing' className='bg-white py-24 dark:bg-gray-800'>
      <div className='container mx-auto px-6'>
        <h2 className='mb-12 text-center text-4xl font-bold text-gray-800 dark:text-white'>
          Choose Your Wave
        </h2>
        <div className='flex flex-col items-center justify-center gap-8 md:flex-row md:items-stretch'>
          <PricingCard
            title='Basic'
            price='free'
            features={[
              'Create 1 Custom Form',
              'ATS Scoring for up to 50 Resumes',
              'Swipe Review Feature'
            ]}
            btnText='Start Small'
            highlighted={false}
          />
          <PricingCard
            title='Pro'
            price='$29'
            features={[
              'Create up to 5 Custom Forms',
              'ATS Scoring for up to 500 Resumes',
              'Advanced Swipe Filtering'
            ]}
            btnText='Make Waves'
            highlighted={true}
          />
          <PricingCard
            title='Enterprise'
            price='Custom'
            features={[
              'Unlimited Custom Forms',
              'ATS Scoring for Unlimited Resumes',
              'Customizable Swipe Workflows'
            ]}
            btnText='Contact Us'
            highlighted={false}
          />
        </div>
      </div>
    </section>
  )
}

export default Pricing
