import { Tab } from '@headlessui/react';
import Head from 'next/head';

import Header from '../components/Header';
import Landing from '../components/Landing';
import { fetchCategories } from '../utils/fetchCategories';

import type { GetServerSideProps, NextPage } from 'next'

interface Props {
  categories: Category[]
  products: Product[]
}

const Home = ({ categories, products }: Props) => {
  console.log(products)
  return (
    <div className=''>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />

      <main className='relative h-[200vh] bg-AppleGlass'>
        <Landing />
      </main>
      <section className='relative z-40 -mt-[100vh] min-h-screen bg-[#1b1b1b]'>
        <div className='py-16 space-y-10'>
          <h1 className='text-4xl font-medium tracking-wide text-center text-white md:text-5xl'>
            New Promos
          </h1>

          <Tab.Group>
            <Tab.List className='flex justify-center'>
              {categories.map((category) => (
                <Tab
                  key={category.id_}
                  id={category.id}
                  className={({ selected }) =>
                    `whitespace-nowrap rounded-t-lg py-3 px-5 text-sm font-light outline-none md:py-4 md:px-6 md:text-base ${
                      selected
                        ? 'borderGradient bg-[#35383C] text-white'
                        : 'border-b-2 border-[#35383C] text-[#747474]'
                    }`
                  }
                >
                  {category.title}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className='pt-10 pb-24 mx-auto max-w-fit sm:px-4'>
              {/* <Tab.Panel className='tabPanel'>{showProducts(0)}</Tab.Panel>
              <Tab.Panel className='tabPanel'>{showProducts(1)}</Tab.Panel>
              <Tab.Panel className='tabPanel'>{showProducts(2)}</Tab.Panel>
              <Tab.Panel className='tabPanel'>{showProducts(3)}</Tab.Panel> */}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </section>
    </div>
  )
}

export default Home

// Backend Code - This is the serversiderenderer
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const categories = await fetchCategories()
  // const products = await fetchProducts()
  // const session = await getSession(context)

  return {
    props: {
      categories,
      products
      // session
    }
  }
}
