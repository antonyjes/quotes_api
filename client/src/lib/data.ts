export interface User{
    _id: string
    firstName: string
    lastName: string
    email: string
    password: string
    picturePath: string
    role: string
    createdAt: Date
    updatedAt: Date
    favorites?: string[]
    submittedQuotes?: string[]
}

export interface Quote{
    _id: string
    content: string
    author?: string
    bgPath: string
    topic: string
    submittedBy?: string
    downloadCount?: number
    savedCount?: number
    createdAt: Date
    updatedAt: Date
}