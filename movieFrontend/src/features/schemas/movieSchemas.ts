import {z} from "zod"
const movieSchema = z.object({
    title: z.string(),
    genre: z.string(),
    imageURL: z.string(),
})
export type MovieSchema = z.infer<typeof movieSchema>