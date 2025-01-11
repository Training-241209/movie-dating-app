import { z } from "zod";

export const genreSchema = z.object({
    id: z.number(),
    genreName: z.string()
})
export type GenreSchema = z.infer<typeof genreSchema>