export type SectionType = 
  | 'header' 
  | 'hero' 
  | 'why-us' 
  | 'academic' 
  | 'jobs' 
  | 'institutional' 
  | 'footer';

export interface SocialLinks {
  instagram: string;
  facebook: string;
  youtube: string;
  tiktok: string;
  whatsappLatam: string;
  whatsappUS: string;
  linktree?: string;
}

export interface ListItem {
  text: string;
  imageUrl?: string;
}

export interface SectionContent {
  title?: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  imageBrightness?: number; // New field for image brightness (0-100)
  ceoImageUrl?: string;
  buttonText?: string;
  items?: ListItem[];
  socialLinks?: SocialLinks;
  logoText?: string;
  features?: { title: string; desc: string; icon?: string }[];
}

export interface SectionStyles {
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  paddingY: string;
  fontSizeTitle: string;
  fontSizeBody: string;
  textAlign: 'left' | 'center' | 'right';
}

export interface Section {
  id: string;
  type: SectionType;
  name: string;
  content: SectionContent;
  styles: SectionStyles;
}

export type ViewMode = 'desktop' | 'tablet' | 'mobile';