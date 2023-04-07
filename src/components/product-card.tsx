// IMPORTS
import Image from 'next/image'
import type Product from "@/types/product"

export default function Card({ product }: { product: Product }){
    return(
        <div className='h-fit w-full rounded-3xl shadow-md border-4 border-gray-900 cursor-pointer transition-all'>
            <Image 
                src={product.image}
                alt={product.title} 
                className='rounded-t-2xl' 
                width={500}
                height={500}
            />
            <div className="space-y-3 pb-3">
                <h2 className='text-gray-100 font-bold text-2xl mx-auto text-center py-1 px-3 bg-gray-900'>{product.title}</h2>
                <h3 className='text-gray-900 font-semibold text-lg mx-auto text-center px-6'>{product.price} DH</h3>
                <center>
                    <button className="btn btn-primary">Commender</button>
                </center>
            </div>
        </div>
    )
}