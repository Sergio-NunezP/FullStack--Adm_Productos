import { safeParse, number, parse, string, transform, pipe } from "valibot"
import axios from "axios"
import { DraftProductSchema, ProductsSchema, Product, ProductSchema } from "../types"
import { toBoolean } from "../utils"

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
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })

        } else {
            throw new Error('Datos no validos')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const { data } = await axios(url)
        const result = safeParse(ProductsSchema, data.data)
        if (result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProductsById(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const { data } = await axios(url)
        const result = safeParse(ProductSchema, data.data)
        if (result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function updateProduct(data: ProductData, id: Product['id']) {
    try {
        const NumberSchema = pipe(string(), transform(Number), number())
        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            availability: toBoolean(data.availability.toString())
        })
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

