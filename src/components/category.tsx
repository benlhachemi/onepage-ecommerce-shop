// IMPORTS
import ProductCard from './product-card'
import type Product from "@/types/product"
import typeCategory from "@/types/category"

export default function Category({ category, products }: { category: typeCategory, products: Array<Product> }){
    return(
        <div className='space-y-8' key={category.id}>
            <div className="divider after:bg-gray-300 before:bg-gray-300">
                <h2 className='text-gray-100 font-bold text-2xl mx-auto text-center py-1 px-3 rounded-tl-2xl rounded-br-2xl bg-gray-900'>{category.name}</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 space-y-6 lg:space-y-0">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}