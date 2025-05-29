// frontend/src/types/lecture.ts

// 강의 기본 정보 타입
export interface Lecture {
  id: number;
  title: string;
  professor: string;
  view_count: number;
  video_url: string;
  created_at: string;
}

// 강의 업로드 요청 데이터 타입
export interface VideoFormData {
  subject: string;
  description: string;
  professor: string;
  file: File | null;
}

// 강의 업로드 응답 데이터 타입
export interface LectureUploadResponse {
  lecture_id: number;
  video_url: string;
}

// 강의 목록 조회 응답 데이터 타입
export interface LectureListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Lecture[];
}

// 강의 검색 파라미터 타입
export interface LectureSearchParams {
  search?: string;
  page?: number;
  page_size?: number;
}

export interface Professor {
  id: string;
  name: string;
  department: string;
  image_url?: string;
}

export interface VideoEditData {
  id: number;
  title: string;
  description: string;
  professorId: string;
  video_url: string;
}
