import axios, { AxiosError } from 'axios';
import type { Lecture, VideoFormData } from '../types/lecture';

// API 기본 URL 수정 (api 중복 제거)
const API_BASE_URL = 'http://localhost:8000';

// API 응답 타입 정의
interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 파일 업로드를 위한 별도의 axios 인스턴스
const uploadApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// 에러 처리 헬퍼 함수
const handleApiError = (error: AxiosError): never => {
  if (error.response) {
    // 서버에서 응답이 왔지만 에러인 경우
    const errorMessage = error.response.data?.message || error.response.data?.error || '서버 오류가 발생했습니다.';
    throw new Error(errorMessage);
  } else if (error.request) {
    // 요청은 보냈지만 응답이 없는 경우
    throw new Error('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
  } else {
    // 요청 설정 중 에러가 발생한 경우
    throw new Error(error.message || '요청을 처리하는 중 오류가 발생했습니다.');
  }
};

export const lectureApi = {
  // 강의 목록 조회
  getLectures: async (search?: string, page: number = 1, pageSize: number = 30) => {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      params.append('page', page.toString());
      params.append('page_size', pageSize.toString());
      
      const response = await api.get<ApiResponse<{ results: Lecture[]; count: number }>>(`/api/v1/test/lectures/?${params}`);
      return response.data.data;
    } catch (error) {
      return handleApiError(error as AxiosError);
    }
  },

  // 강의 상세 조회
  getLecture: async (id: number) => {
    try {
      const response = await api.get<ApiResponse<Lecture>>(`/api/v1/test/lectures/${id}`);
      return response.data.data;
    } catch (error) {
      return handleApiError(error as AxiosError);
    }
  },

  // 강의 업로드
  uploadLecture: async (formData: VideoFormData) => {
    try {
      // FormData 유효성 검사
      if (!formData.subject || !formData.description || !formData.professor || !formData.file) {
        throw new Error('모든 필수 필드를 입력해주세요.');
      }

      const data = new FormData();
      data.append('subject', formData.subject);
      data.append('description', formData.description);
      data.append('professor', formData.professor);
      data.append('file', formData.file);

      console.log('API 요청 URL:', `${API_BASE_URL}/api/v1/test/lectures`);  // 디버깅용 로그
      const response = await uploadApi.post<ApiResponse<{ lecture_id: number }>>('/api/v1/test/lectures', data);
      return response.data.data;
    } catch (error) {
      return handleApiError(error as AxiosError);
    }
  },
}; 