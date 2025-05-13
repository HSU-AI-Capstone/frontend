export interface Professor {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  bio: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  professorId: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number; // in seconds
  createdAt: Date;
  views: number;
}

export type VideoFormData = {
  title: string;
  description: string;
  professorId: string;
  pdfFile: File | null;
};

export type VideoEditData = {
  id: string;
  title: string;
  description: string;
  professorId: string;
  pdfFile: File | null;
};