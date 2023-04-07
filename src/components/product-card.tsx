// IMPORTS
import Image from 'next/image'
import type Product from "@/types/product"
import {useRouter} from 'next/router'

export default function Card({ product, whatsapp }: { product: Product, whatsapp: number }){
    const router = useRouter()
    return(
        <div className='w-full rounded-3xl shadow-md border-4 border-gray-900 cursor-pointer transition-all'>
            <Image 
                src={product.image}
                alt={product.title} 
                className='rounded-t-2xl' 
                width={500}
                height={500}
            />
            <div className="space-y-3 pb-3">
                <h2 className='text-gray-100 font-bold text-xl mx-auto text-center py-1 px-3 h-10 items-center my-auto bg-gray-900'>{product.title}</h2>
                <h3 className='text-gray-900 font-semibold text-lg mx-auto text-center px-6'>{product.price} DH</h3>
                <center>
                    <button className="btn btn-primary" onClick={() => router.push(`https://wa.me/212${whatsapp}?text=${product.title}`)}>Commender</button>
                </center>
            </div>
        </div>
    )
}