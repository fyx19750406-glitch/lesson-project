import { Course, Case, Announcement } from '../types'

export const courseData: Course = {
  id: '1',
  name: 'AI创作集训营',
  description: '5天集训+2个月陪跑，零基础到专业',
  price: 1288,
  originalPrice: 2588,
  duration: '5天集训',
  schedule: '2026年2月25日-3月1日，每晚8-10点直播',
  targetAudience: [
    '零基础AI创作爱好者',
    '新媒体/短视频从业者',
    '内容创业者',
    '职场技能提升人群'
  ],
  learningGoals: [
    '掌握主流AI创作工具的使用方法',
    '独立完成图文、视频、小说推文等内容创作',
    '建立个人AI作品集',
    '了解内容变现路径和商业化方法'
  ],
  modules: [
    {
      id: 'm1',
      name: '爆款逆向拆解',
      description: '学习如何分析和拆解热门内容',
      duration: '2小时',
      topics: [
        '热门内容分析方法',
        '成功案例工作流复刻',
        '创意灵感挖掘技巧'
      ]
    },
    {
      id: 'm2',
      name: 'AI工具实操',
      description: '掌握主流AI创作工具的使用',
      duration: '3小时',
      topics: [
        '图生视频工具使用',
        '文本生成与优化',
        'AI图像创作技巧'
      ]
    },
    {
      id: 'm3',
      name: '内容创作实战',
      description: '实战演练各类内容创作',
      duration: '3小时',
      topics: [
        '图文内容创作',
        '视频内容制作',
        '小说推文创作'
      ]
    },
    {
      id: 'm4',
      name: '变现路径规划',
      description: '学习内容变现和商业化',
      duration: '2小时',
      topics: [
        '内容平台变现策略',
        '个人IP打造方法',
        '商业化路径规划'
      ]
    }
  ],
  benefits: [
    {
      id: 'b1',
      name: 'SVIP会员',
      description: '无限次使用AI工具、专属客服、优先体验新功能、专属回放、线下活动优先权',
      duration: '半年（180天）'
    },
    {
      id: 'b2',
      name: '算力礼包',
      description: '500次AI生成额度',
      value: 50
    },
    {
      id: 'b3',
      name: '技术陪跑服务',
      description: '专属答疑群、作业批改与反馈、一对一指导、学习进度跟踪',
      duration: '2个月'
    }
  ]
}

export const caseData: Case[] = [
  {
    id: 'c1',
    title: '爆款内容分析案例',
    studentName: '张三',
    submitTime: '2026-02-26 15:30',
    reviewStatus: 'approved',
    type: 'image-video',
    content: '这是一个通过AI工具创作的爆款内容分析案例，展示了如何从热门内容中提取创意并复刻工作流。',
    thumbnail: 'https://via.placeholder.com/300x200'
  },
  {
    id: 'c2',
    title: 'AI工具实操作业',
    studentName: '李四',
    submitTime: '2026-02-27 16:45',
    reviewStatus: 'approved',
    type: 'novel',
    content: '使用AI工具完成小说推文创作，展示了AI在文本创作方面的强大能力。',
    thumbnail: 'https://via.placeholder.com/300x200'
  },
  {
    id: 'c3',
    title: '短剧创作案例',
    studentName: '王五',
    submitTime: '2026-02-28 14:20',
    reviewStatus: 'rejected',
    type: 'short-drama',
    content: '尝试使用AI工具创作短剧，虽然被拒绝但积累了宝贵经验。',
    thumbnail: 'https://via.placeholder.com/300x200'
  },
  {
    id: 'c4',
    title: '图文内容优化案例',
    studentName: '赵六',
    submitTime: '2026-03-01 10:15',
    reviewStatus: 'pending',
    type: 'image-video',
    content: '使用AI工具优化图文内容，提升内容质量和吸引力。',
    thumbnail: 'https://via.placeholder.com/300x200'
  }
]

export const announcements: Announcement[] = [
  {
    id: 'a1',
    title: '开课通知',
    content: 'AI创作集训营将于2026年2月25日正式开课，请各位学员做好准备。',
    category: 'course',
    publishTime: '2026-02-20 10:00'
  },
  {
    id: 'a2',
    title: '系统维护通知',
    content: '系统将于2026年2月24日凌晨2:00-4:00进行维护，期间将无法访问。',
    category: 'system',
    publishTime: '2026-02-23 15:00'
  }
]
