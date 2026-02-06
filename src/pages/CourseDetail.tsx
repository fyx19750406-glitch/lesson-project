import { useState } from 'react'
import { Button, Card, List, Collapse, Modal, Form, Input, message } from 'antd'
import { ArrowLeftOutlined, ClockCircleOutlined, GiftOutlined, UserOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { courseData } from '../data/mockData'
import './CourseDetail.css'

const { Panel } = Collapse

function CourseDetail() {
  const navigate = useNavigate()
  const [faqExpanded, setFaqExpanded] = useState<string | string[]>([])
  const [faqSearchText, setFaqSearchText] = useState('')
  const [faqCategory, setFaqCategory] = useState<string>('all')

  const faqData = [
    {
      id: 'f1',
      question: '课程适合零基础学员吗？',
      answer: '是的，本课程专为零基础学员设计，从最基础的AI工具使用开始教学，逐步进阶到实战应用。',
      category: '报名相关'
    },
    {
      id: 'f2',
      question: '上课时间是什么时候？',
      answer: '课程时间为2026年2月25日-3月1日，每晚8-10点直播。',
      category: '上课相关'
    },
    {
      id: 'f3',
      question: '课程支持退款吗？',
      answer: '开课前7天可全额退款，开课后不支持退款。',
      category: '退款相关'
    },
    {
      id: 'f4',
      question: '如何获取上课链接？',
      answer: '开课前1天会通过短信和邮件发送上课链接，也可以在学员中心查看。',
      category: '上课相关'
    },
    {
      id: 'f5',
      question: '课程有回放吗？',
      answer: '是的，每节课都有回放，学员可以在学员中心随时观看。',
      category: '上课相关'
    },
    {
      id: 'f6',
      question: 'SVIP会员有效期多久？',
      answer: 'SVIP会员有效期为半年（180天），从激活之日起计算。',
      category: '报名相关'
    },
    {
      id: 'f7',
      question: '算力礼包如何使用？',
      answer: '算力礼包会自动发放到您的账户，可以在使用AI工具时自动抵扣。',
      category: '报名相关'
    },
    {
      id: 'f8',
      question: '技术陪跑服务包括什么？',
      answer: '包括专属答疑群、作业批改与反馈、一对一指导、学习进度跟踪等服务。',
      category: '报名相关'
    },
    {
      id: 'f9',
      question: '老学员有优惠吗？',
      answer: '老学员复训可享受5折优惠，推荐好友报名可获得200元返现。',
      category: '报名相关'
    },
    {
      id: 'f10',
      question: '课程结束后还能观看回放吗？',
      answer: '是的，课程结束后回放仍可观看，SVIP会员可以无限次观看专属回放。',
      category: '上课相关'
    }
  ]

  const filteredFaqs = faqData.filter(
    (faq) =>
      (faqCategory === 'all' || faq.category === faqCategory) &&
      (faqSearchText === '' || faq.question.includes(faqSearchText))
  )

  const handleBack = () => {
    navigate('/')
  }

  const handleRegister = () => {
    navigate('/registration')
  }

  const handleFaqSearch = (value: string) => {
    setFaqSearchText(value)
  }

  return (
    <div className="course-detail">
      <header className="detail-header">
        <div className="container header-content">
          <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
            返回首页
          </Button>
          <Button type="primary" onClick={handleRegister}>
            立即报名
          </Button>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <h1 className="course-title">{courseData.name}</h1>
          <p className="course-description">{courseData.description}</p>
          <div className="price-info">
            <span className="original-price">原价：¥{courseData.originalPrice}</span>
            <span className="current-price">优惠价：¥{courseData.price}</span>
            <span className="discount">立省¥{courseData.originalPrice - courseData.price}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">课程介绍</h2>
          <Card className="intro-card">
            <div className="intro-item">
              <ClockCircleOutlined />
              <span>培训周期：{courseData.duration}</span>
            </div>
            <div className="intro-item">
              <ClockCircleOutlined />
              <span>上课时间：{courseData.schedule}</span>
            </div>
            <div className="intro-item">
              <UserOutlined />
              <span>适合人群：</span>
              <ul>
                {courseData.targetAudience.map((audience, index) => (
                  <li key={index}>{audience}</li>
                ))}
              </ul>
            </div>
            <div className="intro-item">
              <CheckCircleOutlined />
              <span>学习目标：</span>
              <ul>
                {courseData.learningGoals.map((goal, index) => (
                  <li key={index}>{goal}</li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">模块拆解</h2>
          <Collapse defaultActiveKey={['m1', 'm2', 'm3', 'm4']}>
            {courseData.modules.map((module) => (
              <Panel
                header={
                  <div className="module-panel-header">
                    <span>{module.name}</span>
                    <span className="module-duration">预计学习时长：{module.duration}</span>
                  </div>
                }
                key={module.id}
              >
                <p className="module-description">{module.description}</p>
                <List
                  dataSource={module.topics}
                  renderItem={(topic) => <List.Item>{topic}</List.Item>}
                />
              </Panel>
            ))}
          </Collapse>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">学员权益</h2>
          <div className="benefits-grid">
            {courseData.benefits.map((benefit) => (
              <Card key={benefit.id} className="benefit-card">
                <div className="benefit-icon">
                  <GiftOutlined />
                </div>
                <h3>{benefit.name}</h3>
                {benefit.duration && <p className="benefit-duration">有效期：{benefit.duration}</p>}
                {benefit.value && <p className="benefit-value">价值：¥{benefit.value}</p>}
                <p className="benefit-description">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">常见问题</h2>
          <div className="faq-filters">
            <span className="faq-label">分类：</span>
            <span
              className={`faq-category ${faqCategory === 'all' ? 'active' : ''}`}
              onClick={() => setFaqCategory('all')}
            >
              全部
            </span>
            <span
              className={`faq-category ${faqCategory === '报名相关' ? 'active' : ''}`}
              onClick={() => setFaqCategory('报名相关')}
            >
              报名相关
            </span>
            <span
              className={`faq-category ${faqCategory === '上课相关' ? 'active' : ''}`}
              onClick={() => setFaqCategory('上课相关')}
            >
              上课相关
            </span>
            <span
              className={`faq-category ${faqCategory === '退款相关' ? 'active' : ''}`}
              onClick={() => setFaqCategory('退款相关')}
            >
              退款相关
            </span>
          </div>
          <Input.Search
            placeholder="搜索问题"
            onSearch={handleFaqSearch}
            style={{ marginBottom: 20 }}
          />
          <Collapse
            activeKey={faqExpanded}
            onChange={(keys) => setFaqExpanded(keys)}
          >
            {filteredFaqs.map((faq) => (
              <Panel header={faq.question} key={faq.id}>
                <p>{faq.answer}</p>
              </Panel>
            ))}
          </Collapse>
        </div>
      </section>

      <div className="fixed-bottom-bar">
        <div className="container">
          <Button
            type="primary"
            size="large"
            className="register-btn"
            onClick={handleRegister}
          >
            ⚡ 立即报名 - 限时优惠¥{courseData.price} ⚡
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
