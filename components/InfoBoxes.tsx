import InfoBox from './InfoBox';

const InfoBoxes = () => {
  return (
    <section>
      <div className='container-xl lg:container m-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
          <InfoBox
            heading='For Renters'
            backgroundColor='bg-gray-100'
            buttonInfo={{
              text: 'Browse Properties',
              link: '/properties',
              backgroundColor: 'bg-slate-700',
            }}
          >
            Search for your perfect rental. Save preferred listings and connect with property owners effortlessly.
          </InfoBox>
          <InfoBox
            heading='For Property Owners'
            backgroundColor='bg-cyan-100'
            buttonInfo={{
              text: 'Add Property',
              link: '/properties/add',
              backgroundColor: 'bg-primary',
            }}
          >
            Showcase your properties to attract potential tenants. Rent for short-term stays or long-term leases.
          </InfoBox>
        </div>
      </div>
    </section>
  );
};
export default InfoBoxes;
