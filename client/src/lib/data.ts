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
}

export interface Quote{
    _id: string
    content: string
    author?: string
    bgPath: string
    topic: string
    submittedBy?: string
    createdAt: Date
    updatedAt: Date
}