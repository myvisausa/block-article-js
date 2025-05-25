export interface ResourceArticle {
    pageType: string;
    postId: string;
    metadata: Metadata;
    content: ContentSection[];
  }
  
  export interface Metadata {
    title: string;
    description: string;
    createdTime: string;
    modifiedTime: string;
    ogImage: string;
    ogImageCaption: string;
    ogImageAlt: string;
    categories: string;
    tags: string[];
    author: string;
  }
  
  export interface ContentSection {
    sectionId: string;
    type: string;
    header: string;
    text: string;
    summary: string;
    lastEdited: string;
    questions?: string[];
    answers?: string[];
  }
  