import React from 'react';
import {
  BookOpen,
  FileText,
  Layout,
  PlayCircle,
  Search,
  Star,
  TrendingUp,
  Plus,
  Sparkles,
  Users,
} from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Layout className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">AIcademy</span>
            </div>
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="원하는 강의를 검색하세요..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="h-5 w-5 mr-2" />
                강의 만들기
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AI Course Creation Banner */}
        <div className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center p-8">
            <div className="md:w-2/3 text-white mb-6 md:mb-0">
              <h1 className="text-3xl font-bold mb-4">AI로 나만의 강의 만들기</h1>
              <p className="text-lg mb-6">
                원하는 주제를 입력하면 AI가 강의 자료와 커리큘럼을 자동으로 생성해드립니다.
                전문적인 교육 컨텐츠를 손쉽게 제작해보세요.
              </p>
              <button className="flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                <Sparkles className="h-5 w-5 mr-2" />
                AI로 강의 만들기
              </button>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="AI Education"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Popular User-Created Courses */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">인기 크리에이터 강의</h2>
            <button className="text-blue-600 hover:text-blue-700 flex items-center">
              <Users className="h-5 w-5 mr-1" />
              크리에이터 둘러보기
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Django Course"
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=40&h=40&q=80"
                      alt="Creator"
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-900">김개발</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">4.9</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Django로 웹사이트 만들기
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Django 프레임워크의 기초부터 실전 프로젝트까지 완벽 가이드
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-semibold">₩55,000</span>
                  <button className="bg-blue-50 text-blue-600 py-1 px-3 rounded-lg text-sm hover:bg-blue-100 transition-colors">
                    수강하기
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Machine Learning Course"
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <img
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=40&h=40&q=80"
                      alt="Creator"
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-900">이머신</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">4.8</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  머신러닝 기초 마스터
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  수학적 개념부터 실제 모델 구현까지 차근차근 배우는 머신러닝
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-semibold">₩66,000</span>
                  <button className="bg-blue-50 text-blue-600 py-1 px-3 rounded-lg text-sm hover:bg-blue-100 transition-colors">
                    수강하기
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Data Analysis Course"
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=40&h=40&q=80"
                      alt="Creator"
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-900">박데이터</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">4.7</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  파이썬 데이터 분석
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  pandas와 numpy를 활용한 실전 데이터 분석 프로젝트
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-semibold">₩44,000</span>
                  <button className="bg-blue-50 text-blue-600 py-1 px-3 rounded-lg text-sm hover:bg-blue-100 transition-colors">
                    수강하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Categories */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">강의 카테고리</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <TrendingUp className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">프로그래밍</h3>
              <p className="text-gray-600 text-sm">웹, 앱, 서버 개발</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <FileText className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">데이터 사이언스</h3>
              <p className="text-gray-600 text-sm">데이터 분석, ML, AI</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <BookOpen className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">디자인</h3>
              <p className="text-gray-600 text-sm">UI/UX, 그래픽 디자인</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <PlayCircle className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">비즈니스</h3>
              <p className="text-gray-600 text-sm">마케팅, 창업, 경영</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;