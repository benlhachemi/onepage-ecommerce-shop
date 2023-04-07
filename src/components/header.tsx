// IMPORTS
import Image from 'next/image'

export default function Header(){
    return(
        <div>
            <div className='w-full h-56 lg:h-96 bg-[url(https://i.imgur.com/Jg8qR9n.jpg)] shadow-md bg-center bg-cover' />
            <div className="px-8 lg:px-56 -translate-y-2/4 flex gap-6 lg:gap-10">
                <div className='avatar'>
                    <div className="w-20 lg:w-44 rounded-full border-4 border-gray-100">
                        <Image alt='avatar' src="https://i.imgur.com/vYDN1mE.jpg" width={600} height={600} />
                    </div>
                </div>

                <div className='h-fit border-4 border-gray-100 py-2 lg:py-3 px-3 lg:px-4 text-gray-100 font-bold text-xl lg:text-2xl bg-black bg-opacity-70 rounded-3xl items-center my-auto'>Soufiane Shop 🎸</div>
            </div>
        </div>
    )
}

