export interface Comment {
    id: number;
    title: string;
    description: string;
    item?: number;
    rating: number;
}

export interface CommentProps {
    title?: string;
    className?: string;
}