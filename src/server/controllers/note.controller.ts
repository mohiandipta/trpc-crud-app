import { Prisma, PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
    CreateNoteInput,
    FilterQueryInput,
    ParamsInput,
    UpdateNoteInput
} from "../schema/note.schema";

const prisma = new PrismaClient()

export const createNoteController = async ({ input }: { input: CreateNoteInput }) => {
    try {
        const note = await prisma.note.create({
            data: {
                title: input.title,
                content: input.content,
                category: input.category,
                published: input.published
            }
        })
        return {
            status: "success", data: { note }
        }
    } catch (error) {
        console.log(error)
    }
}

export const updateNoteController = async ({
    paramsInput, input }: {
        paramsInput: ParamsInput,
        input: UpdateNoteInput
    }) => {
    try {
        const updateNote = await prisma.note.update({
            where: { id: paramsInput.noteId },
            data: input
        })
        return {
            status: "success", data: { updateNote }
        }
    } catch (error) {
        console.log(error)
    }
}