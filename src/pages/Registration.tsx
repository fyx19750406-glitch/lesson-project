import { useState } from 'react'
import { Form, Input, Button, Card, Radio, Upload, message, Modal } from 'antd'
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { courseData } from '../data/mockData'
import type { UploadFile } from 'antd/es/upload/interface'
import './Registration.css'

const { TextArea } = Input

function Registration() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [paymentModalVisible, setPaymentModalVisible] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'wechat' | 'alipay'>('wechat')
  const [orderData, setOrderData] = useState<any>(null)
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const handleBack = () => {
    navigate('/course-detail')
  }

  const handleSubmit = async (values: any) => {
    setLoading(true)
    try {
      const orderNumber = `ORD${Date.now()}`
      const order = {
        orderNumber,
        courseName: courseData.name,
        originalPrice: courseData.originalPrice,
        price: courseData.price,
        discount: courseData.originalPrice - courseData.price,
        ...values
      }
      setOrderData(order)
      setPaymentModalVisible(true)
    } catch (error) {
      message.error('提交失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = () => {
    message.success('支付成功！')
    setPaymentModalVisible(false)
    navigate('/student-center')
  }

  const handleUploadChange = (info: any) => {
    setFileList(info.fileList)
  }

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('只能上传 JPG/PNG 格式的图片!')
      return false
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('图片大小不能超过 2MB!')
      return false
    }
    return false
  }

  return (
    <div className="registration">
      <header className="detail-header">
        <div className="container header-content">
          <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
            返回课程详情
          </Button>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <h1 className="page-title">报名表单</h1>
          <Card className="registration-card">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              autoComplete="off"
            >
              <Form.Item
                label="姓名"
                name="name"
                rules={[
                  { required: true, message: '请输入姓名' },
                  { min: 2, max: 20, message: '姓名长度为2-20个字符' }
                ]}
              >
                <Input placeholder="请输入您的姓名" />
              </Form.Item>

              <Form.Item
                label="手机号"
                name="phone"
                rules={[
                  { required: true, message: '请输入手机号' },
                  { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
                ]}
              >
                <Input placeholder="请输入您的手机号" />
              </Form.Item>

              <Form.Item
                label="微信号"
                name="wechat"
                rules={[
                  { required: true, message: '请输入微信号' },
                  { min: 6, max: 20, message: '微信号长度为6-20个字符' }
                ]}
              >
                <Input placeholder="请输入您的微信号" />
              </Form.Item>

              <Form.Item
                label="邮箱"
                name="email"
                rules={[
                  { type: 'email', message: '请输入正确的邮箱地址' }
                ]}
              >
                <Input placeholder="请输入您的邮箱（选填）" />
              </Form.Item>

              <Form.Item label="职业" name="profession">
                <Input placeholder="请输入您的职业（选填）" />
              </Form.Item>

              <Form.Item
                label="学习目标"
                name="learningGoal"
                rules={[
                  { max: 200, message: '学习目标最多200字' }
                ]}
              >
                <TextArea
                  rows={4}
                  placeholder="请输入您的学习目标（选填，最多200字）"
                />
              </Form.Item>

              <Form.Item label="头像" name="avatar">
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleUploadChange}
                  beforeUpload={beforeUpload}
                  maxCount={1}
                >
                  {fileList.length === 0 && (
                    <div>
                      <UploadOutlined />
                      <div style={{ marginTop: 8 }}>上传头像</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  size="large"
                  block
                >
                  提交报名
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </section>

      <Modal
        title="确认订单"
        open={paymentModalVisible}
        onCancel={() => setPaymentModalVisible(false)}
        footer={null}
        width={600}
      >
        {orderData && (
          <div className="order-confirmation">
            <div className="order-info">
              <h3>订单信息</h3>
              <p><strong>课程名称：</strong>{orderData.courseName}</p>
              <p><strong>订单编号：</strong>{orderData.orderNumber}</p>
              <p><strong>报名人：</strong>{orderData.name}</p>
              <p><strong>手机号：</strong>{orderData.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}</p>
              <p><strong>微信号：</strong>{orderData.wechat}</p>
              {orderData.email && <p><strong>邮箱：</strong>{orderData.email}</p>}
            </div>

            <div className="order-price">
              <h3>费用明细</h3>
              <p><strong>原价：</strong>¥{orderData.originalPrice}</p>
              <p><strong>优惠金额：</strong>-¥{orderData.discount}</p>
              <p className="total-price"><strong>实付金额：</strong>¥{orderData.price}</p>
            </div>

            <div className="payment-method">
              <h3>选择支付方式</h3>
              <Radio.Group
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <Radio value="wechat">
                  <span className="payment-option">
                    <span className="payment-icon">💚</span>
                    微信支付
                  </span>
                </Radio>
                <Radio value="alipay">
                  <span className="payment-option">
                    <span className="payment-icon">💙</span>
                    支付宝
                  </span>
                </Radio>
              </Radio.Group>
            </div>

            <div className="payment-qr">
              {paymentMethod === 'wechat' ? (
                <div className="qr-code">
                  <div className="qr-placeholder">微信支付二维码</div>
                  <p>请使用微信扫码支付</p>
                </div>
              ) : (
                <div className="qr-code">
                  <div className="qr-placeholder">支付宝二维码</div>
                  <p>请使用支付宝扫码支付</p>
                </div>
              )}
            </div>

            <div className="payment-actions">
              <Button onClick={() => setPaymentModalVisible(false)}>
                取消
              </Button>
              <Button type="primary" onClick={handlePayment}>
                我已支付
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Registration
