// IMPORTS
import Layout from "@/components/layout"
import Category from "@/components/category"
import typeCategory from '@/types/category'
import { GetStaticProps } from "next"
import type Product from "@/types/product"
import Axios from 'axios'

export default function Home({ products, categories }: { products: Array<Product>, categories: Array<typeCategory> }) {
    return (
        <Layout>
            <div className="space-y-16">
                {categories.map(category => (
                    <Category key={category.id} category={category} products={products.filter(product => product.categoryId === category.id)} />
                ))}
            </div>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    // FETCHING PRODUCTS DATA
    const { data } = await Axios({
        method: 'GET',
        url: 'https://onepage-ecommerce-strapi-production.up.railway.app/api/produits?populate=*',
        headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
        }
    })

    // FETCHING CATEGORIES DATA
    const { data: categoriesRes } = await Axios({
        method: 'GET',
        url: 'https://onepage-ecommerce-strapi-production.up.railway.app/api/categories?populate=*',
        headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
        }
    })

    // FORMATTING PRODUCTS DATA
    const products = data.data.map((elt: any): Product => ({
        id: elt.id,
        title: elt.attributes.title,
        price: elt.attributes.price,
        image: `https://onepage-ecommerce-strapi-production.up.railway.app${elt.attributes.image.data.attributes.url}`,
        categoryId: elt.attributes.category.data.id
    }))

    // FORMATTING PRODUCTS DATA
    const categories = categoriesRes.data.map((elt: any): typeCategory => ({
        id: elt.id,
        name: elt.attributes.name,
    }))

    return {
        props: {
            products,
            categories,
        },
        revalidate: 60
    }
}