import mongoose from 'mongoose'

export type ContentCreate = {
    card?: mongoose.Types.ObjectId,
    category: string,
    description: string,
    createdAt: number
}

export type ContentHistoryCreate = {
    content?: mongoose.Types.ObjectId,
    category: string,
    description: string
}


export type ContentEdit = {
    card: mongoose.Types.ObjectId,
    category: string,
    description: string
}