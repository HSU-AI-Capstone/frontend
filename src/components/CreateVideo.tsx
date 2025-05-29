import React, { useState, useEffect, useRef } from 'react';
import { Upload, X, FileText, Eye } from 'lucide-react';
import type { Professor, VideoFormData, VideoEditData } from '../types/lecture';
import { lectureApi } from '../services/api';
import ProfessorCard from './ProfessorCard';
import VideoCard from './VideoCard';
import VideoGrid from './components/VideoGrid';

interface CreateVideoProps {
  professors: Professor[];
  onSuccess?: () => void;
  editData?: VideoEditData;
  onCancel?: () => void;
}

const CreateVideo: React.FC<CreateVideoProps> = ({ 
  professors, 
  onSuccess,
  editData,
  onCancel 
}) => {
  const [formData, setFormData] = useState<VideoFormData>({
    subject: '',
    description: '',
    professor: '',
    file: null
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load edit data if provided
  useEffect(() => {
    if (editData) {
      setFormData({
        subject: editData.title,
        description: editData.description,
        professor: editData.professorId,
        file: null
      });
    }
  }, [editData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfessorSelect = (professorId: string) => {
    setFormData(prev => ({ ...prev, professor: professorId }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setFormData(prev => ({ ...prev, file }));
        setFilePreview(URL.createObjectURL(file));
      } else {
        setError('PDF 파일만 업로드할 수 있습니다.');
      }
    }
  };

  const removeFile = () => {
    setFormData(prev => ({ ...prev, file: null }));
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
      setFilePreview(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const togglePdfPreview = () => {
    setShowPdfPreview(!showPdfPreview);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('폼 제출 시작');
    setError(null);
    
    console.log('현재 폼 데이터:', formData);
    
    if (!formData.subject.trim()) {
      console.log('제목 누락');
      setError('제목을 입력해주세요.');
      return;
    }
    
    if (!formData.description.trim()) {
      console.log('설명 누락');
      setError('설명을 입력해주세요.');
      return;
    }
    
    if (!formData.professor) {
      console.log('교수 선택 누락');
      setError('교수를 선택해주세요.');
      return;
    }
    
    if (!formData.file) {
      console.log('파일 누락');
      setError('PDF 파일을 업로드해주세요.');
      return;
    }

    try {
      setIsProcessing(true);
      console.log('강의 업로드 시작:', formData);
      
      // FormData 객체 생성 및 데이터 추가
      const uploadData = new FormData();
      uploadData.append('subject', formData.subject);
      uploadData.append('description', formData.description);
      uploadData.append('professor', formData.professor);
      uploadData.append('file', formData.file);
      
      console.log('업로드할 데이터:', {
        subject: formData.subject,
        description: formData.description,
        professor: formData.professor,
        fileName: formData.file.name
      });
      
      console.log('API 호출 시작');
      const response = await lectureApi.uploadLecture(formData);
      console.log('API 응답:', response);
      
      // 성공 후 폼 초기화
      setFormData({
        subject: '',
        description: '',
        professor: '',
        file: null
      });
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
        setFilePreview(null);
      }
      
      console.log('업로드 성공, onSuccess 호출');
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      console.error('강의 업로드 실패:', err);
      if (err.response) {
        console.error('서버 응답:', err.response.data);
        setError(err.response.data.message || '서버 오류가 발생했습니다.');
      } else if (err.request) {
        console.error('서버 응답 없음:', err.request);
        setError('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
      } else {
        console.error('요청 에러:', err.message);
        setError('요청을 처리하는 중 오류가 발생했습니다.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {editData ? 'Edit Video Lecture' : 'Create New Video Lecture'}
          </h2>
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="Enter video title"
            />
          </div>
          
          <div className="mb-5">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="Enter video description"
            ></textarea>
          </div>
          
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">
              Select Professor
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {professors.map(professor => (
                <ProfessorCard
                  key={professor.id}
                  professor={professor}
                  isSelected={professor.id === formData.professor}
                  onSelect={handleProfessorSelect}
                />
              ))}
            </div>
          </div>
          
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">
              {editData ? 'Update PDF' : 'Upload PDF'}
            </label>
            
            {!formData.file ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  id="file"
                  ref={fileInputRef}
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="file"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <Upload className="h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-gray-600 mb-1">
                    {editData 
                      ? 'Upload a new PDF file to update the video'
                      : 'Drag & drop a PDF file here, or click to select'
                    }
                  </p>
                  <p className="text-gray-500 text-sm">Only PDF files are supported</p>
                </label>
              </div>
            ) : (
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-center flex-1">
                    <FileText className="h-8 w-8 text-blue-600 mr-3" />
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium">{formData.file.name}</p>
                      <p className="text-gray-500 text-sm">
                        {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={togglePdfPreview}
                      className="text-blue-600 hover:text-blue-800 transition-colors p-2"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="text-gray-500 hover:text-red-500 transition-colors p-2"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* PDF Preview Modal */}
            {showPdfPreview && filePreview && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
                  <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-lg font-semibold">PDF Preview</h3>
                    <button
                      onClick={togglePdfPreview}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="flex-1 p-4">
                    <iframe
                      src={filePreview}
                      className="w-full h-full rounded border"
                      title="PDF Preview"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-4">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 rounded-lg font-medium text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isProcessing}
              className={`px-6 py-3 rounded-lg font-medium text-white transition-colors ${
                isProcessing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isProcessing 
                ? 'Processing...' 
                : editData 
                  ? 'Update Video Lecture'
                  : 'Create Video Lecture'
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateVideo;