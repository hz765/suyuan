const TEAM_MEMBERS = [
  { name: '张明远', role: '首席科学家', desc: '计算机视觉博士，10年+ AI 安全研究经验，主导核心检测算法研发。' },
  { name: '李晓峰', role: '工程总监', desc: '全栈架构师，负责平台工程化落地和高可用架构设计。' },
  { name: '王思涵', role: '算法研究员', desc: '深度学习专家，专注生成模型与检测对抗技术研究。' },
  { name: '陈雨桐', role: '产品经理', desc: '5年+ 安全产品经验，负责产品规划与用户体验设计。' },
];

const VALUES = [
  {
    title: '安全第一',
    desc: '将内容安全视为核心使命，持续投入技术研发，守护数字世界的真实性。',
  },
  {
    title: '技术驱动',
    desc: '以前沿 AI 技术为基石，不断探索检测与伪造之间的技术博弈。',
  },
  {
    title: '开放合作',
    desc: '与学术界、产业界深度合作，共同构建深度伪造防御生态。',
  },
  {
    title: '社会责任',
    desc: '坚持科技向善，让 AI 技术更好地服务社会，防范技术滥用风险。',
  },
];

const MILESTONES = [
  { year: '2023 Q1', event: '项目启动', desc: '核心团队组建，完成技术可行性验证。' },
  { year: '2023 Q3', event: 'Alpha 版本', desc: '内部测试版上线，支持 5 种伪造类型检测。' },
  { year: '2024 Q1', event: 'Beta 公测', desc: '开放公测，用户突破 10,000，检测类型扩展至 20+。' },
  { year: '2024 Q4', event: 'v1.0 正式发布', desc: '产品正式发布，API 开放，企业客户开始接入。' },
  { year: '2025 Q2', event: '多模态升级', desc: '支持视频、音频多模态检测，检测准确率突破 98%。' },
  { year: '2026 Q1', event: '全球化部署', desc: '服务覆盖亚太地区，累计检测超过 50,000 次。' },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section
        style={{
          background: 'rgba(255,255,255,0.3)',
          backdropFilter: 'blur(24px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
          borderBottom: '1px solid rgba(255,255,255,0.4)',
          padding: '80px 0 60px',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <h1 style={{ fontSize: 40, fontWeight: 800, marginBottom: 16 }}>
            关于 <span style={{ color: 'var(--accent)' }}>TraceFake TraceVision</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 18, maxWidth: 640, margin: '0 auto', lineHeight: 1.8 }}>
            我们是一支专注于 AI 内容安全的团队，致力于用技术手段
            守护数字世界的真实性，让每一个人都能安心面对屏幕背后的内容。
          </p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 20 }}>我们的使命</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.9, marginBottom: 20 }}>
                随着 AI 生成技术的飞速发展，深度伪造内容正以前所未有的速度和规模涌现。
                从人脸替换到全脸生成，从表情驱动到音频克隆，伪造技术不断进化，
                对新闻真实性、金融安全、司法公正和个人隐私构成严重威胁。
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.9, marginBottom: 20 }}>
                TraceFake TraceVision 应运而生。我们构建了业界领先的深度伪造检测与溯源引擎，
                不仅判断内容真假，更能溯源至具体的伪造技术类型，
                为新闻媒体、金融机构、司法部门、社交平台等提供全方位的内容安全保障。
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.9 }}>
                我们相信，技术应当用于守护真实，而非制造虚假。
                让 AI 更好地为社会服务，是我们不变的追求。
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {VALUES.map((v) => (
                <div key={v.title} className="card" style={{ padding: 24 }}>
                  <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{v.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section style={{ padding: '60px 0', background: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderTop: '1px solid rgba(255,255,255,0.4)', borderBottom: '1px solid rgba(255,255,255,0.4)' }}>
        <div className="container">
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>发展历程</h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: 48, fontSize: 15 }}>
            从技术验证到产品落地的成长之路
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {MILESTONES.map((m) => (
              <div key={m.year} className="card" style={{ padding: 24, position: 'relative' }}>
                <span
                  className="badge badge-info"
                  style={{ marginBottom: 12, display: 'inline-block' }}
                >
                  {m.year}
                </span>
                <h4 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{m.event}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>核心团队</h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: 48, fontSize: 15 }}>
            汇聚 AI 安全领域的顶尖人才
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {TEAM_MEMBERS.map((m) => (
              <div key={m.name} className="card" style={{ padding: 28, textAlign: 'center' }}>
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: 'var(--gradient-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 28,
                    fontWeight: 700,
                    margin: '0 auto 16px',
                    color: 'white',
                  }}
                >
                  {m.name[0]}
                </div>
                <h4 style={{ fontSize: 17, fontWeight: 600, marginBottom: 4 }}>{m.name}</h4>
                <div style={{ color: 'var(--accent)', fontSize: 13, fontWeight: 500, marginBottom: 12 }}>{m.role}</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section style={{ padding: '60px 0', background: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderTop: '1px solid rgba(255,255,255,0.4)', borderBottom: '1px solid rgba(255,255,255,0.4)' }}>
        <div className="container" style={{ maxWidth: 600, textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>联系我们</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: 16 }}>
            无论是技术咨询、商务合作还是问题反馈，我们都很乐意与您交流
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 20 }}>
              <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent)' }}>@</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>邮箱</div>
                <div style={{ fontSize: 15, fontWeight: 500 }}>contact@tracefake.com</div>
              </div>
            </div>
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 20 }}>
              <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent)' }}>#</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>地址</div>
                <div style={{ fontSize: 15, fontWeight: 500 }}>北京市海淀区中关村科技园</div>
              </div>
            </div>
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 20 }}>
              <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent)' }}>i</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>工作时间</div>
                <div style={{ fontSize: 15, fontWeight: 500 }}>周一至周五 9:00 - 18:00</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
