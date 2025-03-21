import { safeParse } from "valibot"
import axios from "axios"
import { DraftProductSchema } from "../types"

type ProductData = {
    [k: string]: FormDataEntryValue
}

// Función para agregar el producto
export async function addProduct(data: ProductData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })
        // Petición metodo POST
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            const { data } = await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
        } else {
            throw new Error('Datos no vpalidos')
        }
    } catch (error) {
        console.log(error)
    }
}