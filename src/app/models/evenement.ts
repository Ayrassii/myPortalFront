import {User} from './user';
import {Media} from './media';

export class Evenement {
  id: number;
  createdby_id: number;
  description: string;
  title: string;
  start_date: string;
  end_date: string;
  created_at: string;
  comments_count: number;
  likes_count: number;
  owner: User;
  medias: Media[];
}
