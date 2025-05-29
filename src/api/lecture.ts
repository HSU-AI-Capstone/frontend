import axios from 'axios';
import type { 
  Lecture, 
  LectureUploadRequest, 
  LectureUploadResponse, 
  LectureListResponse,
  LectureSearchParams 
} from '../types/lecture';

// API 기본 설정
const API_BASE_URL = 'https://api.ai-cademy.store/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 강의 업로드 API
export const uploadLecture = async (data: LectureUploadRequest): Promise<LectureUploadResponse> => {
  const formData = new FormData();
  formData.append('subject', data.subject);
  formData.append('description', data.description);
  formData.append('professor', data.professor);
  formData.append('file', data.file);

  const response = await api.post<LectureUploadResponse>('/lectures/upload/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// 강의 목록 조회 API
export const getLectures = async (params?: LectureSearchParams): Promise<LectureListResponse> => {
  const response = await api.get<LectureListResponse>('/lectures/', { params });
  return response.data;
};

// 강의 상세 조회 API
export const getLectureDetail = async (id: number): Promise<Lecture> => {
  const response = await api.get<Lecture>(`/lectures/${id}/`);
  return response.data;
};

// API 에러 타입
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// API 에러 인터셉터 추가
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      throw new ApiError(
        error.response.data.message || 'API 요청 중 오류가 발생했습니다.',
        error.response.status,
        error.response.data
      );
    }
    throw new ApiError('네트워크 오류가 발생했습니다.');
  }
);

// API 인스턴스 내보내기 (필요한 경우 직접 사용)
export default api;
