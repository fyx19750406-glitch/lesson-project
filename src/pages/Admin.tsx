import { useState } from 'react'
import { Card, Row, Col, Button, Table, Input, Select, Tag, Modal, Form, message } from 'antd'
import { ArrowLeftOutlined, UserOutlined, BookOutlined, BarChartOutlined, FileTextOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { caseData, announcements } from '../data/mockData'
import './Admin.css'

const { Search } = Input
const { Option } = Select

function Admin() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('students')
  const [studentModalVisible, setStudentModalVisible] = useState(false)
  const [courseModalVisible, setCourseModalVisible] = useState(false)
  const [announcementModalVisible, setAnnouncementModalVisible] = useState(false)
  const [caseModalVisible, setCaseModalVisible] = useState(false)
  const [selectedCase, setSelectedCase] = useState<any>(null)
  const [studentForm] = Form.useForm()
  const [courseForm] = Form.useForm()
  const [announcementForm] = Form.useForm()

  const students = [
    {
      id: 's1',
      name: '张三',
      phone: '138****8888',
      wechat: 'zhangsan123',
      email: 'zhangsan@example.com',
      registrationDate: '2026-02-01',
      progress: 60,
      paymentStatus: 'paid',
      status: 'active'
    },
    {
      id: 's2',
      name: '李四',
      phone: '139****9999',
      wechat: 'lisi456',
      email: 'lisi@example.com',
      registrationDate: '2026-02-02',
      progress: 45,
      paymentStatus: 'paid',
      status: 'active'
    },
    {
      id: 's3',
      name: '王五',
      phone: '137****7777',
      wechat: 'wangwu789',
      email: 'wangwu@example.com',
      registrationDate: '2026-02-03',
      progress: 30,
      paymentStatus: 'unpaid',
      status: 'paused'
    }
  ]

  const statistics = {
    registration: {
      daily: 15,
      monthly: 120,
      conversionRate: 8.5,
      sales: 154560,
      avgPrice: 1288
    },
    behavior: {
      pageViews: 5000,
      clickRate: 25,
      redemptionRate: 85,
      watchRate: 70,
      submissionRate: 60
    }
  }

  const handleBack = () => {
    navigate('/')
  }

  const handleViewStudent = (record: any) => {
    studentForm.setFieldsValue(record)
    setStudentModalVisible(true)
  }

  const handleStudentSubmit = (values: any) => {
    message.success('学员信息更新成功')
    setStudentModalVisible(false)
  }

  const handleEditCourse = () => {
    setCourseModalVisible(true)
  }

  const handleCourseSubmit = (values: any) => {
    message.success('课程信息更新成功')
    setCourseModalVisible(false)
  }

  const handlePublishAnnouncement = () => {
    setAnnouncementModalVisible(true)
  }

  const handleAnnouncementSubmit = (values: any) => {
    message.success('公告发布成功')
    setAnnouncementModalVisible(false)
    announcementForm.resetFields()
  }

  const handleViewCase = (record: any) => {
    setSelectedCase(record)
    setCaseModalVisible(true)
  }

  const handleApproveCase = () => {
    message.success('案例审核通过')
    setCaseModalVisible(false)
  }

  const handleRejectCase = () => {
    message.success('案例已拒绝')
    setCaseModalVisible(false)
  }

  const studentColumns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: '报名时间',
      dataIndex: 'registrationDate',
      key: 'registrationDate'
    },
    {
      title: '学习进度',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => `${progress}%`
    },
    {
      title: '支付状态',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (status: string) => (
        <Tag color={status === 'paid' ? 'success' : 'error'}>
          {status === 'paid' ? '已支付' : '未支付'}
        </Tag>
      )
    },
    {
      title: '学员状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap: Record<string, { text: string; color: string }> = {
          active: { text: '正常', color: 'success' },
          paused: { text: '暂停', color: 'warning' },
          completed: { text: '已结课', color: 'default' }
        }
        const statusInfo = statusMap[status] || { text: status, color: 'default' }
        return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Button type="link" onClick={() => handleViewStudent(record)}>
          查看详情
        </Button>
      )
    }
  ]

  const caseColumns = [
    {
      title: '案例标题',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: '学员姓名',
      dataIndex: 'studentName',
      key: 'studentName'
    },
    {
      title: '提交时间',
      dataIndex: 'submitTime',
      key: 'submitTime'
    },
    {
      title: '审核状态',
      dataIndex: 'reviewStatus',
      key: 'reviewStatus',
      render: (status: string) => {
        const statusMap: Record<string, { text: string; color: string }> = {
          pending: { text: '待审核', color: 'warning' },
          approved: { text: '已通过', color: 'success' },
          rejected: { text: '已拒绝', color: 'error' }
        }
        const statusInfo = statusMap[status] || { text: status, color: 'default' }
        return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Button type="link" onClick={() => handleViewCase(record)}>
          查看详情
        </Button>
      )
    }
  ]

  return (
    <div className="admin">
      <header className="detail-header">
        <div className="container header-content">
          <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
            返回首页
          </Button>
          <h1>管理后台</h1>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="admin-tabs">
            <Button
              type={activeTab === 'students' ? 'primary' : 'default'}
              icon={<UserOutlined />}
              onClick={() => setActiveTab('students')}
            >
              学员信息管理
            </Button>
            <Button
              type={activeTab === 'course' ? 'primary' : 'default'}
              icon={<BookOutlined />}
              onClick={() => setActiveTab('course')}
            >
              课程管理
            </Button>
            <Button
              type={activeTab === 'statistics' ? 'primary' : 'default'}
              icon={<BarChartOutlined />}
              onClick={() => setActiveTab('statistics')}
            >
              数据统计
            </Button>
            <Button
              type={activeTab === 'cases' ? 'primary' : 'default'}
              icon={<FileTextOutlined />}
              onClick={() => setActiveTab('cases')}
            >
              案例管理
            </Button>
          </div>

          {activeTab === 'students' && (
            <Card className="admin-card">
              <div className="card-header">
                <h2>学员信息管理</h2>
                <div className="card-actions">
                  <Search placeholder="搜索学员" style={{ width: 200, marginRight: 10 }} />
                  <Select placeholder="筛选状态" style={{ width: 120, marginRight: 10 }}>
                    <Option value="all">全部</Option>
                    <Option value="paid">已支付</Option>
                    <Option value="unpaid">未支付</Option>
                  </Select>
                  <Button type="primary">导出数据</Button>
                </div>
              </div>
              <Table
                dataSource={students}
                columns={studentColumns}
                rowKey="id"
                pagination={{ pageSize: 20 }}
              />
            </Card>
          )}

          {activeTab === 'course' && (
            <Card className="admin-card">
              <div className="card-header">
                <h2>课程管理</h2>
                <Button type="primary" onClick={handleEditCourse}>
                  编辑课程信息
                </Button>
              </div>
              <div className="course-info">
                <h3>课程信息</h3>
                <p><strong>课程名称：</strong>AI创作集训营</p>
                <p><strong>培训周期：</strong>5天集训</p>
                <p><strong>上课时间：</strong>2026年2月25日-3月1日，每晚8-10点直播</p>
                <p><strong>适合人群：</strong>零基础AI创作爱好者、新媒体/短视频从业者、内容创业者、职场技能提升人群</p>
              </div>
              <div className="course-actions">
                <Button onClick={handlePublishAnnouncement}>
                  发布课程公告
                </Button>
                <Button>管理课程回放</Button>
              </div>
            </Card>
          )}

          {activeTab === 'statistics' && (
            <Card className="admin-card">
              <h2>数据统计</h2>
              <Row gutter={[24, 24]}>
                <Col xs={24} sm={12} md={8}>
                  <Card className="stat-card">
                    <h3>报名数据</h3>
                    <p><strong>每日报名：</strong>{statistics.registration.daily}人</p>
                    <p><strong>每月报名：</strong>{statistics.registration.monthly}人</p>
                    <p><strong>转化率：</strong>{statistics.registration.conversionRate}%</p>
                    <p><strong>销售额：</strong>¥{statistics.registration.sales.toLocaleString()}</p>
                    <p><strong>平均客单价：</strong>¥{statistics.registration.avgPrice}</p>
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Card className="stat-card">
                    <h3>学员行为</h3>
                    <p><strong>页面访问量：</strong>{statistics.behavior.pageViews}</p>
                    <p><strong>点击率：</strong>{statistics.behavior.clickRate}%</p>
                    <p><strong>权益兑换率：</strong>{statistics.behavior.redemptionRate}%</p>
                    <p><strong>回放观看率：</strong>{statistics.behavior.watchRate}%</p>
                    <p><strong>作业提交率：</strong>{statistics.behavior.submissionRate}%</p>
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Card className="stat-card">
                    <h3>报表导出</h3>
                    <Button type="primary" block style={{ marginBottom: 10 }}>
                      导出报名数据
                    </Button>
                    <Button type="primary" block style={{ marginBottom: 10 }}>
                      导出学员行为数据
                    </Button>
                    <Button type="primary" block>
                      导出综合报表
                    </Button>
                  </Card>
                </Col>
              </Row>
            </Card>
          )}

          {activeTab === 'cases' && (
            <Card className="admin-card">
              <div className="card-header">
                <h2>案例管理</h2>
                <div className="card-actions">
                  <Search placeholder="搜索案例" style={{ width: 200, marginRight: 10 }} />
                  <Select placeholder="筛选状态" style={{ width: 120, marginRight: 10 }}>
                    <Option value="all">全部</Option>
                    <Option value="pending">待审核</Option>
                    <Option value="approved">已通过</Option>
                    <Option value="rejected">已拒绝</Option>
                  </Select>
                  <Select placeholder="筛选类型" style={{ width: 120 }}>
                    <Option value="all">全部</Option>
                    <Option value="image-video">图文视频</Option>
                    <Option value="novel">小说推文</Option>
                    <Option value="short-drama">短剧</Option>
                  </Select>
                </div>
              </div>
              <Table
                dataSource={caseData}
                columns={caseColumns}
                rowKey="id"
                pagination={{ pageSize: 20 }}
              />
            </Card>
          )}
        </div>
      </section>

      <Modal
        title="学员详情"
        open={studentModalVisible}
        onCancel={() => setStudentModalVisible(false)}
        onOk={() => studentForm.submit()}
        width={800}
      >
        <Form form={studentForm} layout="vertical" onFinish={handleStudentSubmit}>
          <Form.Item label="姓名" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="手机号" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="微信号" name="wechat">
            <Input />
          </Form.Item>
          <Form.Item label="邮箱" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="学习进度" name="progress">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="学员状态" name="status">
            <Select>
              <Option value="active">正常</Option>
              <Option value="paused">暂停</Option>
              <Option value="completed">已结课</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="编辑课程信息"
        open={courseModalVisible}
        onCancel={() => setCourseModalVisible(false)}
        onOk={() => courseForm.submit()}
        width={800}
      >
        <Form form={courseForm} layout="vertical" onFinish={handleCourseSubmit}>
          <Form.Item label="课程名称" name="name" initialValue="AI创作集训营">
            <Input />
          </Form.Item>
          <Form.Item label="培训周期" name="duration" initialValue="5天集训">
            <Input />
          </Form.Item>
          <Form.Item label="上课时间" name="schedule" initialValue="2026年2月25日-3月1日，每晚8-10点直播">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="发布课程公告"
        open={announcementModalVisible}
        onCancel={() => setAnnouncementModalVisible(false)}
        onOk={() => announcementForm.submit()}
      >
        <Form form={announcementForm} layout="vertical" onFinish={handleAnnouncementSubmit}>
          <Form.Item
            label="公告标题"
            name="title"
            rules={[{ required: true, message: '请输入公告标题' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="公告内容"
            name="content"
            rules={[{ required: true, message: '请输入公告内容' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="公告分类" name="category" initialValue="course">
            <Select>
              <Option value="course">课程通知</Option>
              <Option value="system">系统公告</Option>
              <Option value="activity">活动通知</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="案例详情"
        open={caseModalVisible}
        onCancel={() => setCaseModalVisible(false)}
        footer={[
          <Button key="reject" danger onClick={handleRejectCase}>
            拒绝
          </Button>,
          <Button key="approve" type="primary" onClick={handleApproveCase}>
            通过
          </Button>
        ]}
        width={800}
      >
        {selectedCase && (
          <div className="case-detail">
            <h3>{selectedCase.title}</h3>
            <p><strong>学员姓名：</strong>{selectedCase.studentName}</p>
            <p><strong>提交时间：</strong>{selectedCase.submitTime}</p>
            <p><strong>案例类型：</strong>{selectedCase.type}</p>
            <p><strong>案例内容：</strong>{selectedCase.content}</p>
            {selectedCase.thumbnail && (
              <div className="case-thumbnail">
                <img src={selectedCase.thumbnail} alt={selectedCase.title} />
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Admin
