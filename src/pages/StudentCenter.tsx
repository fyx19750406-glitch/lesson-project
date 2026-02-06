import { useState } from 'react'
import { Card, Row, Col, Button, Progress, List, Tag, Modal, Form, Input, message } from 'antd'
import { ArrowLeftOutlined, VideoCameraOutlined, FileTextOutlined, GiftOutlined, CustomerServiceOutlined, WechatOutlined, UserOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { courseData } from '../data/mockData'
import './StudentCenter.css'

const { TextArea } = Input

function StudentCenter() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [profileModalVisible, setProfileModalVisible] = useState(false)
  const [profileForm] = Form.useForm()
  const [homeworkModalVisible, setHomeworkModalVisible] = useState(false)
  const [homeworkForm] = Form.useForm()

  const studentData = {
    name: '张三',
    avatar: 'https://via.placeholder.com/100',
    course: courseData.name,
    progress: 60,
    registrationDate: '2026-02-01',
    phone: '138****8888',
    wechat: 'zhangsan123',
    email: 'zhangsan@example.com'
  }

  const classInfo = {
    nextClass: '2026年2月25日 20:00',
    link: 'https://meeting.tencent.com/dm/xxx'
  }

  const playbackList = [
    {
      id: 'p1',
      title: '模块1：爆款逆向拆解',
      date: '2026-02-25',
      duration: 120,
      watchStatus: 'watched',
      watchProgress: 100
    },
    {
      id: 'p2',
      title: '模块2：AI工具实操',
      date: '2026-02-26',
      duration: 180,
      watchStatus: 'watching',
      watchProgress: 65
    },
    {
      id: 'p3',
      title: '模块3：内容创作实战',
      date: '2026-02-27',
      duration: 180,
      watchStatus: 'unwatched',
      watchProgress: 0
    }
  ]

  const homeworkList = [
    {
      id: 'h1',
      title: '爆款内容分析作业',
      submitTime: '2026-02-26 15:30',
      reviewStatus: 'reviewed',
      feedback: '作业完成得很好，继续保持！'
    },
    {
      id: 'h2',
      title: 'AI工具实操作业',
      submitTime: '2026-02-27 16:45',
      reviewStatus: 'reviewing',
      feedback: null
    }
  ]

  const benefits = {
    svip: {
      status: 'activated',
      expiryDate: '2026-08-01',
      items: [
        '无限次使用AI工具',
        '专属客服',
        '优先体验新功能',
        '专属回放',
        '线下活动优先权'
      ]
    },
    package: {
      status: 'claimed',
      remaining: 450,
      total: 500
    },
    mentorship: {
      status: 'active',
      remainingDays: 58,
      totalDays: 60
    }
  }

  const handleBack = () => {
    navigate('/')
  }

  const handleEditProfile = () => {
    setProfileModalVisible(true)
  }

  const handleProfileSubmit = (values: any) => {
    message.success('个人信息更新成功')
    setProfileModalVisible(false)
  }

  const handleJoinClass = () => {
    window.open(classInfo.link, '_blank')
  }

  const handleWatchPlayback = (id: string) => {
    message.info('视频播放功能开发中')
  }

  const handleSubmitHomework = () => {
    setHomeworkModalVisible(true)
  }

  const handleHomeworkSubmit = (values: any) => {
    message.success('作业提交成功')
    setHomeworkModalVisible(false)
    homeworkForm.resetFields()
  }

  const handleCopyWechat = () => {
    navigator.clipboard.writeText('zhangsan123')
    message.success('微信号已复制')
  }

  const getStatusTag = (status: string) => {
    const statusMap: Record<string, { text: string; color: string }> = {
      watched: { text: '已观看', color: 'success' },
      watching: { text: '观看中', color: 'processing' },
      unwatched: { text: '未观看', color: 'default' },
      reviewed: { text: '已批改', color: 'success' },
      reviewing: { text: '批改中', color: 'processing' },
      unreviewed: { text: '未批改', color: 'default' }
    }
    const statusInfo = statusMap[status] || { text: status, color: 'default' }
    return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>
  }

  return (
    <div className="student-center">
      <header className="detail-header">
        <div className="container header-content">
          <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
            返回首页
          </Button>
          <h1>学员中心</h1>
          <Button onClick={handleEditProfile}>
            <UserOutlined /> 编辑资料
          </Button>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={24} md={8}>
              <Card className="profile-card">
                <div className="profile-avatar">
                  <img src={studentData.avatar} alt={studentData.name} />
                </div>
                <h2>{studentData.name}</h2>
                <p className="profile-course">{studentData.course}</p>
                <div className="profile-progress">
                  <Progress percent={studentData.progress} />
                  <p>学习进度：{studentData.progress}%</p>
                </div>
                <p className="profile-info">
                  <ClockCircleOutlined /> 报名时间：{studentData.registrationDate}
                </p>
              </Card>
            </Col>

            <Col xs={24} sm={24} md={16}>
              <Card className="service-card">
                <div className="service-tabs">
                  <Button
                    type={activeTab === 'overview' ? 'primary' : 'default'}
                    onClick={() => setActiveTab('overview')}
                  >
                    学习服务
                  </Button>
                  <Button
                    type={activeTab === 'benefits' ? 'primary' : 'default'}
                    onClick={() => setActiveTab('benefits')}
                  >
                    权益兑换
                  </Button>
                  <Button
                    type={activeTab === 'support' ? 'primary' : 'default'}
                    onClick={() => setActiveTab('support')}
                  >
                    服务通道
                  </Button>
                </div>

                {activeTab === 'overview' && (
                  <div className="service-content">
                    <div className="service-item">
                      <h3>
                        <VideoCameraOutlined /> 上课链接
                      </h3>
                      <p>下次上课时间：{classInfo.nextClass}</p>
                      <Button type="primary" onClick={handleJoinClass}>
                        进入课堂
                      </Button>
                    </div>

                    <div className="service-item">
                      <h3>
                        <VideoCameraOutlined /> 课程回放
                      </h3>
                      <List
                        dataSource={playbackList}
                        renderItem={(item) => (
                          <List.Item
                            actions={[
                              <Button
                                type="link"
                                onClick={() => handleWatchPlayback(item.id)}
                              >
                                观看
                              </Button>
                            ]}
                          >
                            <List.Item.Meta
                              title={item.title}
                              description={
                                <>
                                  <p>上课时间：{item.date}</p>
                                  <p>时长：{item.duration}分钟</p>
                                  <Progress
                                    percent={item.watchProgress}
                                    size="small"
                                  />
                                </>
                              }
                            />
                            {getStatusTag(item.watchStatus)}
                          </List.Item>
                        )}
                      />
                    </div>

                    <div className="service-item">
                      <h3>
                        <FileTextOutlined /> 作业提交
                      </h3>
                      <Button type="primary" onClick={handleSubmitHomework}>
                        提交作业
                      </Button>
                      <List
                        dataSource={homeworkList}
                        renderItem={(item) => (
                          <List.Item>
                            <List.Item.Meta
                              title={item.title}
                              description={
                                <>
                                  <p>提交时间：{item.submitTime}</p>
                                  {item.feedback && (
                                    <p>导师评语：{item.feedback}</p>
                                  )}
                                </>
                              }
                            />
                            {getStatusTag(item.reviewStatus)}
                          </List.Item>
                        )}
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'benefits' && (
                  <div className="service-content">
                    <Card className="benefit-card">
                      <div className="benefit-header">
                        <GiftOutlined />
                        <h3>SVIP会员</h3>
                      </div>
                      <Tag color={benefits.svip.status === 'activated' ? 'success' : 'default'}>
                        {benefits.svip.status === 'activated' ? '已激活' : '未激活'}
                      </Tag>
                      {benefits.svip.status === 'activated' && (
                        <p className="benefit-expiry">有效期至：{benefits.svip.expiryDate}</p>
                      )}
                      <ul className="benefit-list">
                        {benefits.svip.items.map((item, index) => (
                          <li key={index}>
                            <CheckCircleOutlined /> {item}
                          </li>
                        ))}
                      </ul>
                    </Card>

                    <Card className="benefit-card">
                      <div className="benefit-header">
                        <GiftOutlined />
                        <h3>算力礼包</h3>
                      </div>
                      <Tag color={benefits.package.status === 'claimed' ? 'success' : 'default'}>
                        {benefits.package.status === 'claimed' ? '已领取' : '未领取'}
                      </Tag>
                      {benefits.package.status === 'claimed' && (
                        <p className="benefit-remaining">
                          剩余算力：{benefits.package.remaining}/{benefits.package.total}次
                        </p>
                      )}
                    </Card>

                    <Card className="benefit-card">
                      <div className="benefit-header">
                        <GiftOutlined />
                        <h3>技术陪跑</h3>
                      </div>
                      <Tag color={benefits.mentorship.status === 'active' ? 'success' : 'default'}>
                        {benefits.mentorship.status === 'active' ? '进行中' : '已结束'}
                      </Tag>
                      {benefits.mentorship.status === 'active' && (
                        <p className="benefit-remaining">
                          剩余时间：{benefits.mentorship.remainingDays}/{benefits.mentorship.totalDays}天
                        </p>
                      )}
                    </Card>
                  </div>
                )}

                {activeTab === 'support' && (
                  <div className="service-content">
                    <Card className="support-card">
                      <h3>
                        <WechatOutlined /> 技术陪跑答疑群
                      </h3>
                      <p>群号：zhangsan123</p>
                      <Button onClick={handleCopyWechat}>
                        复制群号
                      </Button>
                    </Card>

                    <Card className="support-card">
                      <h3>
                        <CustomerServiceOutlined /> 运营助理
                      </h3>
                      <p>微信号：zhangsan123</p>
                      <p>工作时间：周一至周五 9:00-18:00</p>
                      <Button onClick={handleCopyWechat}>
                        复制微信号
                      </Button>
                    </Card>

                    <Card className="support-card">
                      <h3>
                        <CustomerServiceOutlined /> 在线客服
                      </h3>
                      <p>如有问题，请点击下方按钮联系在线客服</p>
                      <Button type="primary">
                        联系客服
                      </Button>
                    </Card>
                  </div>
                )}
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      <Modal
        title="编辑个人信息"
        open={profileModalVisible}
        onCancel={() => setProfileModalVisible(false)}
        onOk={() => profileForm.submit()}
      >
        <Form form={profileForm} layout="vertical" onFinish={handleProfileSubmit}>
          <Form.Item label="昵称" name="name" initialValue={studentData.name}>
            <Input />
          </Form.Item>
          <Form.Item label="微信号" name="wechat" initialValue={studentData.wechat}>
            <Input />
          </Form.Item>
          <Form.Item label="邮箱" name="email" initialValue={studentData.email}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="提交作业"
        open={homeworkModalVisible}
        onCancel={() => setHomeworkModalVisible(false)}
        onOk={() => homeworkForm.submit()}
      >
        <Form form={homeworkForm} layout="vertical" onFinish={handleHomeworkSubmit}>
          <Form.Item
            label="作业标题"
            name="title"
            rules={[{ required: true, message: '请输入作业标题' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="作业描述" name="description">
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default StudentCenter
