// IMPORTS
import Page from '@/types/page'
import Header from './header'
import Head from 'next/head'

export default function Layout({ children, pageData }: { children: React.ReactNode, pageData: Page }) {
    return(
        <div className='w-full min-h-screen overflow-x-hidden bg-gray-100 space-y-6'>
            <Head>
                <title>{pageData.title}</title>
            </Head>
            <Header pageData={pageData} />
            <div className='-translate-y-10 lg:-translate-y-20 mx-auto w-5/6 lg:w-4/6 space-y-8'>
                {children}
            </div>
        </div>
    )
}