import {User} from './user';
import {Classe} from './classe';
import {Comment} from './comment';
import {Like} from './like';
import {Media} from './media';

export class Article {
    id: number;
    createdby_id: number;
    description: string;
    content: string;
    title: string;
    is_featured: boolean;
    is_valid: boolean;
    created_at: string;
    comments_count: number;
    likes_count: number;
    owner: User;
    comments: Comment[];
    likes: Like[];
    medias: Media[];
}
