export interface ShortImageResponse {
    imageId: string;
    userId: string;
    uploadedAt: number;
    authorUsername: string;
    imageTitle: string;
    category: string;
    views: number;
    likes: string[];
    fileUrl: string;
}

export interface CompleteImageResponse {
    imageId: string;
    userId: string;
    uploadedAt: number;
    authorUsername: string;
    imageTitle: string;
    imageDescription: string;
    category: string;
    views: number;
    likes: string[];
    labels: string[];
    fileUrl: string;
}

export interface UserData {
    userId: string;
    username: string;
    email: string;
    profilePictureUrl: string;
    bio: string;
    followers: number;
    following: number;
    views: number;
    likes: number;
}