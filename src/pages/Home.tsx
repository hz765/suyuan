import { Link } from 'react-router-dom';

const FEATURES = [
  {
    title: '深度伪造检测',
    desc: '基于多模态特征分析，精准识别各类 AI 生成的人脸内容，包括人脸替换、表情驱动、属性编辑等。',
  },
  {
    title: '伪造类型溯源',
    desc: '不仅判断真假，更能溯源至具体的伪造技术类型，支持近百种攻击手法的精准分类。',
  },
  {
    title: '实时分析引擎',
    desc: '高效的分析流水线，图片秒级出结果，视频流式处理，满足实时内容审核需求。',
  },
  {
    title: '多维风险评估',
    desc: '从面部完整性、噪声模式、时序一致性等多维度给出综合风险评分，辅助决策。',
  },
  {
    title: '开放场景适配',
    desc: '持续学习新型攻击手法，对未知伪造技术同样具备强大的泛化检测能力。',
  },
  {
    title: '隐私安全保障',
    desc: '所有分析均在本地完成，数据不上传云端，严格保护用户隐私与数据安全。',
  },
];

const STEPS = [
  { num: '01', title: '上传内容', desc: '支持图片（JPG/PNG）和视频（MP4/MOV）格式，拖拽或点击上传。' },
  { num: '02', title: '智能分析', desc: 'AI 引擎对内容进行多维度深度扫描，提取伪造特征。' },
  { num: '03', title: '获取报告', desc: '即时生成检测报告，包含真假判定、伪造类型溯源及风险等级。' },
];

const THREATS = [
  { type: '人脸替换', severity: 'critical', trend: '+340%', desc: '利用 DeepFaceLab 等工具进行面部替换，用于虚假视频传播。' },
  { type: 'AI 换脸直播', severity: 'high', trend: '+520%', desc: '实时换脸技术用于直播诈骗和虚假身份冒充。' },
  { type: '语音克隆', severity: 'high', trend: '+280%', desc: '克隆特定人物声音进行电话诈骗和虚假音频传播。' },
  { type: 'AI 生成图片', severity: 'medium', trend: '+180%', desc: '使用扩散模型生成逼真但完全虚构的人物照片。' },
];

const USE_CASES = [
  {
    title: '新闻媒体',
    desc: '在信息传播的第一道关口拦截伪造内容，维护新闻真实性。',
    color: '#3b82f6',
  },
  {
    title: '金融安全',
    desc: '防范基于深度伪造的身份欺诈，保障远程开户和视频面签安全。',
    color: '#10b981',
  },
  {
    title: '司法取证',
    desc: '为电子证据提供技术鉴定，识别伪造的音视频证据。',
    color: '#8b5cf6',
  },
  {
    title: '社交平台',
    desc: '构建内容安全防线，保护用户免受虚假信息和伪造内容侵害。',
    color: '#f59e0b',
  },
];

const TESTIMONIALS = [
  {
    name: '刘记者',
    role: '资深新闻编辑',
    content: 'TraceFake TraceVision 帮助我们快速验证了多条可疑新闻素材，成功拦截了至少 3 起深度伪造新闻事件。检测速度快，结果准确可靠。',
  },
  {
    name: '王工程师',
    role: '金融科技公司 CTO',
    content: '集成 API 非常顺利，文档清晰，响应迅速。在远程 KYC 流程中加入了深度伪造检测后，身份欺诈事件下降了 95%。',
  },
  {
    name: '李研究员',
    role: '网络安全实验室',
    content: '溯源功能非常强大，不仅能判断真假，还能识别具体的伪造工具类型，这对我们的取证工作非常有帮助。',
  },
];

const TECH_HIGHLIGHTS = [
  { label: '空间域分析', desc: '面部边界、光照一致性、纹理异常检测' },
  { label: '频域分析', desc: 'DCT 系数、频谱伪影、上采样痕迹识别' },
  { label: '时序一致性', desc: '光流分析、眨眼模式、微表情自然度' },
  { label: '生物特征', desc: 'rPPG 心率、3D 结构、皮肤反射特性' },
];

const STATS = [
  { value: '98.6%', label: '检测准确率' },
  { value: '< 3s', label: '平均分析时间' },
  { value: '100+', label: '支持伪造类型' },
  { value: '50K+', label: '累计检测次数' },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section
        style={{
          background: 'rgba(255,255,255,0.3)',
          backdropFilter: 'blur(24px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
          padding: '100px 0 80px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(255,255,255,0.4)',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -150,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1
            className="animate-in animate-delay-1"
            style={{
              fontSize: 52,
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: 20,
              background: 'linear-gradient(135deg, #f0f4ff 0%, #3b82f6 50%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            TraceFake TraceVision
          </h1>
          <p
            className="animate-in animate-delay-2"
            style={{
              fontSize: 20,
              color: 'var(--text-secondary)',
              maxWidth: 640,
              margin: '0 auto 40px',
              lineHeight: 1.7,
            }}
          >
            AI 驱动的深度伪造内容检测与溯源平台
            <br />
            守护真实，抵御伪造
          </p>
          <div className="animate-in animate-delay-3" style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link to="/analyze" className="btn btn-primary" style={{ fontSize: 16, padding: '14px 36px' }}>
              立即检测
            </Link>
            <a href="#features" className="btn btn-outline" style={{ fontSize: 16, padding: '14px 36px' }}>
              了解更多
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '40px 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, textAlign: 'center' }}>
            {STATS.map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--accent)' }}>{s.value}</div>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: 'center', marginBottom: 12 }}>核心能力</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 48, fontSize: 16 }}>
            全方位守护数字内容真实性
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {FEATURES.map((f, i) => (
              <div key={f.title} className="card animate-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '80px 0', background: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderTop: '1px solid rgba(255,255,255,0.4)', borderBottom: '1px solid rgba(255,255,255,0.4)' }}>
        <div className="container">
          <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: 'center', marginBottom: 12 }}>工作流程</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 48, fontSize: 16 }}>
            三步完成深度伪造检测
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {STEPS.map((s, i) => (
              <div key={s.num} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: 'var(--gradient-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                    fontWeight: 700,
                    margin: '0 auto 20px',
                  }}
                >
                  {s.num}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>{s.desc}</p>
                {i < 2 && (
                  <div
                    style={{
                      position: 'absolute',
                      right: -16,
                      top: 32,
                      color: 'var(--border-light)',
                      fontSize: 24,
                    }}
                  >
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Threat Landscape */}
      <section style={{ padding: '80px 0', background: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderTop: '1px solid rgba(255,255,255,0.4)', borderBottom: '1px solid rgba(255,255,255,0.4)' }}>
        <div className="container">
          <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: 'center', marginBottom: 12 }}>威胁态势</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 48, fontSize: 16 }}>
            深度伪造威胁正在快速增长，需要强有力的防御手段
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {THREATS.map((t) => (
              <div key={t.type} className="card" style={{ padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span
                    className={`badge ${t.severity === 'critical' ? 'badge-danger' : t.severity === 'high' ? 'badge-warning' : 'badge-info'}`}
                  >
                    {t.severity === 'critical' ? '严重' : t.severity === 'high' ? '高' : '中'}
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--danger)' }}>{t.trend}</span>
                </div>
                <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.type}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: 'center', marginBottom: 12 }}>应用场景</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 48, fontSize: 16 }}>
            为不同行业提供定制化的内容安全解决方案
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {USE_CASES.map((uc) => (
              <Link
                to="/solutions"
                key={uc.title}
                className="card"
                style={{
                  padding: 28,
                  textDecoration: 'none',
                  color: 'inherit',
                  borderTop: `3px solid ${uc.color}`,
                }}
              >
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{uc.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>{uc.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Highlights */}
      <section style={{ padding: '80px 0', background: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderTop: '1px solid rgba(255,255,255,0.4)', borderBottom: '1px solid rgba(255,255,255,0.4)' }}>
        <div className="container">
          <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: 'center', marginBottom: 12 }}>技术引擎</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 48, fontSize: 16 }}>
            多维度、多层次的技术分析体系
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {TECH_HIGHLIGHTS.map((th) => (
              <div key={th.label} className="card" style={{ padding: 28, textAlign: 'center' }}>
                <h4 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{th.label}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6 }}>{th.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: 'center', marginBottom: 12 }}>用户评价</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 48, fontSize: 16 }}>
            来自各行业用户的真实反馈
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="card" style={{ padding: 28 }}>
                <div style={{ fontSize: 24, marginBottom: 16, color: 'var(--accent)' }}>"</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.8, marginBottom: 20, fontStyle: 'italic' }}>
                  {t.content}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: 'var(--gradient-accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: 16,
                    }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: '80px 0',
          textAlign: 'center',
          background: 'rgba(255,255,255,0.3)',
          backdropFilter: 'blur(20px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
          borderTop: '1px solid rgba(255,255,255,0.4)',
        }}
      >
        <div className="container">
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>准备好开始检测了吗？</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: 16 }}>
            上传您的图片或视频，即刻获取专业的深度伪造分析报告
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link to="/analyze" className="btn btn-primary" style={{ fontSize: 16, padding: '14px 40px' }}>
              开始检测 →
            </Link>
            <Link to="/api-docs" className="btn btn-outline" style={{ fontSize: 16, padding: '14px 40px' }}>
              查看 API 文档
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
