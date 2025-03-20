
interface Content {
  type: string;
  header: string;
  text: string;
  questions: string[];
  answers: string[];
}

export interface ArticleData {
  content: Content[];
  metadata: any;
}
