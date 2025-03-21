import { Metadata } from '../../../src/types/resource-types/Metadata';
import { Content } from '../../../src/types/resource-types/Content';

export interface ArticleData {
  pageType: string;
  postId: string;
  content: Content[];
  metadata: Metadata;
}
