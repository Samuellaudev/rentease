'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const FormSchema = z.object({
  location: z.string(),
  propertyType: z.string(),
})

const PropertySearchForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      location: '',
      propertyType: 'All',
    },
  })

  const router = useRouter()

  const handleOnSubmit = (data: z.infer<typeof FormSchema>) => {
    const { location, propertyType } = data
    const query = `?location=${ location }&propertyType=${ propertyType }`;

    if (location === '' && propertyType === 'All') {
      router.push('/properties');
    } else {
      router.push(`/properties/search-results${ query }`);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={ form.handleSubmit(handleOnSubmit) }
        className='mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center'
      >
        <FormField
          control={ form.control }
          name='location'
          render={ ({ field }) => (
            <FormItem className='w-full md:w-3/5 md:pr-2 mb-4 md:mb-0'>
              <FormLabel htmlFor='location' className='sr-only'>
                Location
              </FormLabel>
              <Input
                type='text'
                id='location'
                placeholder='Enter Location or Keyword'
                className='w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-gray-500'
                {...field}
              />
            </FormItem>
          )}
        />
        <FormField
          control={ form.control }
          name="propertyType"
          render={ ({ field }) => (
            <FormItem className='w-full md:w-2/5 md:pl-2'>
              <FormLabel htmlFor="property-type" className='sr-only'>
                Property Type
              </FormLabel>
              <Select
                {...field}
                onValueChange={ (value) => field.onChange(value) }
              >
                <FormControl>
                  <SelectTrigger className='w-full px-4 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-gray-500'>
                    <SelectValue className='text-gray-300' placeholder="Select Property Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Property Type</SelectLabel>
                    <SelectItem value='All'>All</SelectItem>
                    <SelectItem value='Apartment'>Apartment</SelectItem>
                    <SelectItem value='Studio'>Studio</SelectItem>
                    <SelectItem value='Condo'>Condo</SelectItem>
                    <SelectItem value='House'>House</SelectItem>
                    <SelectItem value='Cabin Or Cottage'>Cabin or Cottage</SelectItem>
                    <SelectItem value='Loft'>Loft</SelectItem>
                    <SelectItem value='Room'>Room</SelectItem>
                    <SelectItem value='Other'>Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          ) }
        />
        <Button
          type='submit'
          className='md:ml-4 mt-4 md:mt-[6px] w-full md:w-auto px-6 py-3 rounded-lg bg-cyan-400 text-white hover:bg-cyan-600 focus:outline-none focus:ring focus:ring-gray-600 transition duration-300'
        >
          Search
        </Button>
      </form>
    </Form>
  )
}

export default PropertySearchForm