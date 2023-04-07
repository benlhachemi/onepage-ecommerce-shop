// IMPORTS
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Admin(){
    // VARIABLES
    const router = useRouter()

    // EFFECTS
    useEffect(() => {
        router.push('https://onepage-ecommerce-strapi-production.up.railway.app/admin')
    }, [router])

    // RETURNS
    return 1
}