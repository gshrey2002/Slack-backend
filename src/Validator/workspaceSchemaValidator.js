import {z} from "zod";
export const workspaceSchemaValidator=z.object({
    name:z.string().min(4).max(50),
})