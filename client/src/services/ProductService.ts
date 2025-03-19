import { safeParse } from "valibot"
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
        if (result.success) {

        } else {
            throw new Error('Datos no vpalidos')
        }
    } catch (error) {
        console.log(error)
    }
}