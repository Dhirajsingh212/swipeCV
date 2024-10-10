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
            title='Ripple'
            price='$29'
            features={[
              '5 Projects',
              '10GB Storage',
              'Basic Support',
              '1 Team Member'
            ]}
            btnText='Start Small'
            highlighted={false}
          />
          <PricingCard
            title='Tsunami'
            price='$99'
            features={[
              'Unlimited Projects',
              '1TB Storage',
              '24/7 Priority Support',
              'Unlimited Team Members'
            ]}
            btnText='Make Waves'
            highlighted={true}
          />
          <PricingCard
            title='Ocean'
            price='Custom'
            features={[
              'Everything in Tsunami',
              'Custom Integrations',
              'Dedicated Account Manager',
              'Advanced Analytics'
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
