import { useState } from 'react'
import { Carousel, Row, Col, Card, Button, Tag, Input, Pagination, message } from 'antd'
import { ArrowRightOutlined, ClockCircleOutlined, GiftOutlined, UserOutlined, VideoCameraOutlined, FileTextOutlined, ThunderboltOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { courseData, caseData } from '../data/mockData'
import './Home.css'

const { Search } = Input

function Home() {
  const navigate = useNavigate()
  const [expandedModule, setExpandedModule] = useState<string | null>(null)
  const [caseType, setCaseType] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useState('')

  const filteredCases = caseData.filter(
    (caseItem) =>
      (caseType === 'all' || caseItem.type === caseType) &&
      (searchText === '' || caseItem.title.includes(searchText))
  )

  const pageSize = 20
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const displayedCases = filteredCases.slice(startIndex, endIndex)

  const handleModuleToggle = (moduleId: string) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId)
  }

  const handleRegister = () => {
    navigate('/registration')
  }

  const handleCaseClick = (caseId: string) => {
    message.info('案例详情功能开发中')
  }

  const getCaseTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'image-video': '图文视频',
      'novel': '小说推文',
      'short-drama': '短剧'
    }
    return labels[type] || type
  }

  const getCaseTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'image-video': 'blue',
      'novel': 'green',
      'short-drama': 'purple'
    }
    return colors[type] || 'default'
  }

  return (
    <div className="home">
      <header className="header">
        <div className="container header-content">
          <div className="logo">AI创作集训营</div>
          <nav className="nav">
            <Button type="link" onClick={() => navigate('/')}>
              首页
            </Button>
            <Button type="link" onClick={() => navigate('/course-detail')}>
              课程详情
            </Button>
            <Button type="link" onClick={() => navigate('/student-center')}>
              学员中心
            </Button>
            <Button type="primary" onClick={() => navigate('/student-center')}>
              登录/注册
            </Button>
          </nav>
        </div>
      </header>

      <section className="banner">
        <Carousel autoplay autoplaySpeed={3000} dots={true}>
          <div>
            <div className="banner-content">
              <h1>5天集训+2个月陪跑</h1>
              <p>零基础到专业 限时优惠立省1300元</p>
              <Button type="primary" size="large" onClick={handleRegister}>
                立即报名
              </Button>
            </div>
          </div>
          <div>
            <div className="banner-content">
              <h1>掌握AI创作工具</h1>
              <p>独立完成图文、视频、小说推文等内容创作</p>
              <Button type="primary" size="large" onClick={handleRegister}>
                立即报名
              </Button>
            </div>
          </div>
          <div>
            <div className="banner-content">
              <h1>建立个人作品集</h1>
              <p>了解内容变现路径和商业化方法</p>
              <Button type="primary" size="large" onClick={handleRegister}>
                立即报名
              </Button>
            </div>
          </div>
        </Carousel>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">课程亮点</h2>
          <Row gutter={[24, 24]}>
            {courseData.modules.map((module) => (
              <Col xs={12} sm={12} md={6} key={module.id}>
                <Card hoverable className="highlight-card">
                  <div className="highlight-icon">
                    <ThunderboltOutlined />
                  </div>
                  <h3>{module.name}</h3>
                  <p>{module.description}</p>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="course-info">
            <p>
              <VideoCameraOutlined /> 上课形式：腾讯会议每晚8-10点直播
            </p>
            <p>
              <GiftOutlined /> 学员权益：半年SVIP会员 | 50元算力礼包 | 2个月技术陪跑
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">课程大纲</h2>
          <div className="modules-list">
            {courseData.modules.map((module) => (
              <Card
                key={module.id}
                className="module-card"
                onClick={() => handleModuleToggle(module.id)}
              >
                <div className="module-header">
                  <h3>
                    <FileTextOutlined /> {module.name}
                  </h3>
                  <span className="expand-icon">
                    {expandedModule === module.id ? '▲' : '▼'}
                  </span>
                </div>
                <p className="module-duration">预计学习时长：{module.duration}</p>
                {expandedModule === module.id && (
                  <ul className="module-topics">
                    {module.topics.map((topic, index) => (
                      <li key={index}>{topic}</li>
                    ))}
                  </ul>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">学员案例</h2>
          <div className="case-filters">
            <Tag.CheckableTag
              checked={caseType === 'all'}
              onChange={(checked) => {
                setCaseType(checked ? 'all' : '')
                setCurrentPage(1)
              }}
            >
              全部
            </Tag.CheckableTag>
            <Tag.CheckableTag
              checked={caseType === 'image-video'}
              onChange={(checked) => {
                setCaseType(checked ? 'image-video' : '')
                setCurrentPage(1)
              }}
            >
              图文视频
            </Tag.CheckableTag>
            <Tag.CheckableTag
              checked={caseType === 'novel'}
              onChange={(checked) => {
                setCaseType(checked ? 'novel' : '')
                setCurrentPage(1)
              }}
            >
              小说推文
            </Tag.CheckableTag>
            <Tag.CheckableTag
              checked={caseType === 'short-drama'}
              onChange={(checked) => {
                setCaseType(checked ? 'short-drama' : '')
                setCurrentPage(1)
              }}
            >
              短剧
            </Tag.CheckableTag>
            <Search
              placeholder="搜索案例标题"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value)
                setCurrentPage(1)
              }}
              style={{ width: 200, marginLeft: 'auto' }}
            />
          </div>
          <Row gutter={[24, 24]} className="case-list">
            {displayedCases.map((caseItem) => (
              <Col xs={12} sm={12} md={6} key={caseItem.id}>
                <Card
                  hoverable
                  cover={
                    <div className="case-thumbnail">
                      <img alt={caseItem.title} src={caseItem.thumbnail} />
                    </div>
                  }
                  onClick={() => handleCaseClick(caseItem.id)}
                  className="case-card"
                >
                  <Card.Meta
                    title={caseItem.title}
                    description={
                      <>
                        <p>
                          <UserOutlined /> {caseItem.studentName}
                        </p>
                        <Tag color={getCaseTypeColor(caseItem.type)}>
                          {getCaseTypeLabel(caseItem.type)}
                        </Tag>
                      </>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
          {filteredCases.length > pageSize && (
            <div className="pagination-container">
              <Pagination
                current={currentPage}
                total={filteredCases.length}
                pageSize={pageSize}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
              />
            </div>
          )}
        </div>
      </section>

      <section className="section优惠活动">
        <div className="container">
          <h2 className="section-title">优惠活动</h2>
          <Card className="promotion-card">
            <div className="promotion-content">
              <div className="promotion-time">
                <ClockCircleOutlined /> 限时优惠：原价{courseData.originalPrice}元 → 现价
                {courseData.price}元
              </div>
              <div className="promotion-schedule">
                开课时间：每月月底
              </div>
            </div>
          </Card>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-content">
          <p>联系我们 | 关于我们 | 隐私政策 | 服务条款</p>
        </div>
      </footer>

      <div className="fixed-bottom-bar">
        <div className="container">
          <Button
            type="primary"
            size="large"
            className="register-btn"
            onClick={handleRegister}
          >
            ⚡ 立即报名 - 限时优惠{courseData.price}元 ⚡
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
