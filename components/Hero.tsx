import PropertySearchForm from "./Properties/PropertySearchForm";

const Hero = () => {
  return (
    <section className='bg-primary py-20 mb-4'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center'>
        <div className='text-center mb-3'>
          <h1 className='text-4xl font-extrabold text-white sm:text-5xl md:text-6xl'>
            Discover Your Ideal Rental
          </h1>
          <p className='my-4 text-xl text-white'>
            Find the dream property that suits your needs
          </p>
        </div>
        <PropertySearchForm />
      </div>
    </section>
  );
};
export default Hero;