// IMPORTS
import Layout from "@/components/layout"
import Category from "@/components/category"
import typeCategory from '@/types/category'
import Page from '@/types/page'
import { GetStaticProps } from "next"
import type Product from "@/types/product"
import Axios from 'axios'

export default function Home({ products, categories, page }: { products: Array<Product>, categories: Array<typeCategory>, page: Page }) {
    return (
        <Layout pageData={page}>
            <div className="space-y-16">
                {categories.map(category => (
                    <Category 
                        key={category.id} 
                        category={category} 
                        products={products.filter(product => product.categoryId === category.id)}
                        whatsapp={page.whatsapp} 
                    />
                ))}
            </div>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    // FETCHING PARAMS
    const { data: paramsRes } = await Axios({
        method: 'GET',
        url: 'https://onepage-ecommerce-strapi-production.up.railway.app/api/page?populate=*',
        headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
        }
    })

    // FETCHING PRODUCTS DATA
    const { data } = await Axios({
        method: 'GET',
        url: 'https://onepage-ecommerce-strapi-production.up.railway.app/api/produits?populate=*&pagination[limit]=500',
        headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
        }
    })

    // FETCHING CATEGORIES DATA
    const { data: categoriesRes } = await Axios({
        method: 'GET',
        url: 'https://onepage-ecommerce-strapi-production.up.railway.app/api/categories?populate=*&pagination[limit]=500',
        headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
        }
    })

    // FORMATTING PAGE DATA
    const page: Page = {
        title: paramsRes.data.attributes.title,
        whatsapp: paramsRes.data.attributes.whatsapp,
        cover: `https://onepage-ecommerce-strapi-production.up.railway.app${paramsRes.data.attributes.cover.data.attributes.url}`,
        avatar: `https://onepage-ecommerce-strapi-production.up.railway.app${paramsRes.data.attributes.avatar.data.attributes.url}`,
    }

    // FORMATTING PRODUCTS DATA
    const products: Array<Product> = data.data.map((elt: any): Product => ({
        id: elt.id,
        title: elt.attributes.title,
        price: elt.attributes.price,
        image: `https://onepage-ecommerce-strapi-production.up.railway.app${elt.attributes.image.data.attributes.url}`,
        categoryId: elt.attributes.category.data.id
    }))

    // FORMATTING PRODUCTS DATA
    const categories: Array<typeCategory> = categoriesRes.data.map((elt: any): typeCategory => ({
        id: elt.id,
        name: elt.attributes.name,
    }))

    return {
        props: {
            products,
            categories,
            page
        },
        revalidate: 60
    }
}
