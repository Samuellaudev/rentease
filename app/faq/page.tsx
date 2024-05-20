import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQPage = () => {
  const breadcrumbArea = (
    <Breadcrumb className='container mt-4'>
      <BreadcrumbList>
        <BreadcrumbItem className='text-base'>
          <BreadcrumbLink
            href="/">Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className='text-base' />
        <BreadcrumbItem className='text-base'>
          <BreadcrumbPage>FAQ</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )

  const itemsList = [
    {
      itemNumber: 1,
      triggerTitle: 'What is RentEase?',
      triggerClasses: '',
      content: 'RentEase is a demo website designed to showcase my web development skills using technologies like Next.js, TailwindCSS, TypeScript, and Shadcn/UI. It is not intended for actual rental property market activities.'
    },
    {
      itemNumber: 2,
      triggerTitle: 'What technologies are used in RentEase?',
      triggerClasses: 'text-left',
      content: (
        <ul className="list-disc list-inside">
          <li>Next.js for server-side rendering and optimized performance.
          </li>
          <li>TailwindCSS for rapid and responsive UI design.
          </li>
          <li>TypeScript for type-safe JavaScript development.
          </li>
          <li>Shadcn/UI for modern and reusable UI components.
          </li>
        </ul>
      )
    },
    {
      itemNumber: 3,
      triggerTitle: 'Why did you choose Next.js for this project?',
      triggerClasses: 'text-left',
      content: 'Next.js offers powerful features like server-side rendering, static site generation, and API routes, which make it an excellent choice for building fast and scalable web applications. Its performance optimizations and development experience are unmatched.'
    },
    {
      itemNumber: 4,
      triggerTitle: 'How does TailwindCSS improve the development process?',
      triggerClasses: 'text-left',
      content: 'TailwindCSS provides a utility-first CSS framework that allows for rapid styling directly within the markup. This leads to a highly customizable design system and faster development times without the need for writing custom CSS.'
    },
    {
      itemNumber: 5,
      triggerTitle: 'What are the benefits of using TypeScript in this project?',
      triggerClasses: 'text-left',
      content: 'TypeScript introduces static typing to JavaScript, reducing the likelihood of runtime errors and improving code quality. It enhances developer productivity by providing better tooling and clearer code documentation.'
    },
    {
      itemNumber: 7,
      triggerTitle: 'What is Shadcn/UI and why did you use it?',
      triggerClasses: 'text-left',
      content: 'Shadcn/UI is a component library that provides pre-built, customizable UI components. It helps in building consistent and visually appealing interfaces quickly, allowing me to focus more on functionality rather than design from scratch.'
    },
    {
      itemNumber: 8,
      triggerTitle: 'Is RentEase mobile-friendly?',
      triggerClasses: 'text-left',
      content: 'Yes, RentEase is built with a responsive design in mind, ensuring that it works well on a variety of devices, including desktops, tablets, and smartphones. TailwindCSS helps in achieving a mobile-friendly layout easily.'
    }
  ]

  return (
    <section className='px-4'>
      { breadcrumbArea }
      <div className='container-xl lg:container mx-auto px-4 py-6'>
        <h1 className="text-3xl">Frequently Asked Questions</h1>
        <Accordion type="single" collapsible className="w-full">
          { itemsList.map(item => (
            <AccordionItem value={ `item-${ item.itemNumber }` } key={ item.itemNumber }>
              <AccordionTrigger className={ item.triggerClasses }>{ item.triggerTitle }</AccordionTrigger>
              <AccordionContent>
                { item.content }
              </AccordionContent>
            </AccordionItem>
          )) }
        </Accordion>
      </div>
    </section>
  )
}

export default FAQPage