// IMPORTS
import { ScriptProps } from 'next/script'
import Header from './header'

export default function Layout({ children }: ScriptProps) {
    return(
        <div className='w-full min-h-screen overflow-x-hidden bg-gray-100 space-y-6'>
            <Header />
            <div className='-translate-y-10 lg:-translate-y-20 mx-auto w-5/6 lg:w-4/6 space-y-8'>
                {children}
            </div>
        </div>
    )
}