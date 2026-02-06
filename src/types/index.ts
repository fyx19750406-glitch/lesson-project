export interface Course {
  id: string
  name: string
  description: string
  price: number
  originalPrice: number
  duration: string
  schedule: string
  targetAudience: string[]
  learningGoals: string[]
  modules: Module[]
  benefits: Benefit[]
}

export interface Module {
  id: string
  name: string
  description: string
  duration: string
  topics: string[]
}

export interface Benefit {
  id: string
  name: string
  description: string
  duration?: string
  value?: number
}

export interface Student {
  id: string
  name: string
  phone: string
  wechat: string
  email?: string
  avatar?: string
  profession?: string
  learningGoal?: string
  registrationDate: string
  learningProgress: number
  paymentStatus: 'paid' | 'unpaid'
  status: 'active' | 'paused' | 'completed'
}

export interface Case {
  id: string
  title: string
  studentName: string
  studentAvatar?: string
  submitTime: string
  reviewStatus: 'pending' | 'approved' | 'rejected'
  type: 'image-video' | 'novel' | 'short-drama'
  content: string
  files?: File[]
  thumbnail?: string
}

export interface Announcement {
  id: string
  title: string
  content: string
  category: 'course' | 'system' | 'activity'
  publishTime: string
}

export interface Playback {
  id: string
  courseId: string
  courseName: string
  date: string
  duration: number
  videoUrl: string
  watchStatus: 'unwatched' | 'watching' | 'watched'
  watchProgress: number
}

export interface Homework {
  id: string
  title: string
  submitTime: string
  files: File[]
  reviewStatus: 'unreviewed' | 'reviewing' | 'reviewed'
  feedback?: string
  reviewTime?: string
}

export interface User {
  id: string
  name: string
  phone: string
  email?: string
  avatar?: string
  role: 'student' | 'admin'
}
