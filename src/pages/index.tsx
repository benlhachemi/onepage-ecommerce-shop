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
        url: `${process.env.API_ENDPOINT}/page?populate=*`,
        headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
        }
    })

    // FETCHING PRODUCTS DATA
    const { data } = await Axios({
        method: 'GET',
        url: `${process.env.API_ENDPOINT}/produits?populate=*`,
        headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
        }
    })

    // FETCHING CATEGORIES DATA
    const { data: categoriesRes } = await Axios({
        method: 'GET',
        url: `${process.env.API_ENDPOINT}/categories?populate=*`,
        headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
        }
    })

    // FORMATTING PAGE DATA
    const page: Page = {
        title: paramsRes.data.attributes.title,
        whatsapp: paramsRes.data.attributes.whatsapp,
        cover: `${process.env.BACKEND_URL}${paramsRes.data.attributes.cover.data.attributes.url}`,
        avatar: `${process.env.BACKEND_URL}${paramsRes.data.attributes.avatar.data.attributes.url}`,
    }

    // FORMATTING PRODUCTS DATA
    const products: Array<Product> = data.data.map((elt: any): Product => ({
        id: elt.id,
        title: elt.attributes.title,
        price: elt.attributes.price,
        image: `${process.env.BACKEND_URL}${elt.attributes.image.data.attributes.url}`,
        categoryId: elt.attributes.category.data?.id || 0
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
