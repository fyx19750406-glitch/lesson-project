import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from 'antd'
import Home from './pages/Home'
import CourseDetail from './pages/CourseDetail'
import Registration from './pages/Registration'
import StudentCenter from './pages/StudentCenter'
import Admin from './pages/Admin'

const { Content } = Layout

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course-detail" element={<CourseDetail />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/student-center" element={<StudentCenter />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Content>
    </Layout>
  )
}

export default App
