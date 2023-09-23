import mongoose, { Schema } from 'mongoose'

export type CardCreateRequest = {
    name: string,
    emailAddress: string,
    category: string,
    description: string
}


export type CardCreate = {
    name: string,
    status: string,
    author: mongoose.Types.ObjectId
}


export type CardHistoryCreate = {
    card: mongoose.Types.ObjectId,
    name: string,
    status: string,
    createdAt: number
}


export type CardByAuthor = {
    cardId: mongoose.Types.ObjectId,
    authorId: mongoose.Types.ObjectId
}


export type CardDetailsById = {
    id: mongoose.Types.ObjectId,
    name: string,
    status: string,
    author?: string,
    category?: string,
    description?: string,
    createdAt: string
}


export type CardEditRequest = {
    name: string,
    emailAddress: string,
    category: string,
    description: string
}


export type CardEdit = {
    _id: mongoose.Types.ObjectId,
    name: string,
    status: string,
}

export type CardDeleteRequest = {
    emailAddress: string,
}

export type CardDelete = {
    _id: mongoose.Types.ObjectId,
    status: string,
}
