const SOLUTIONS = [
  {
    industry: '新闻媒体',
    color: '#3b82f6',
    desc: '在信息传播的第一道关口拦截伪造内容，维护新闻真实性和公众信任。',
    scenarios: [
      { title: '新闻素材验证', desc: '对记者提交的图片/视频素材进行真实性验证，防止伪造内容进入新闻流程。' },
      { title: '社交媒体监控', desc: '自动扫描社交平台传播的热点内容，识别并标记可疑的深度伪造信息。' },
      { title: '事实核查辅助', desc: '为事实核查团队提供技术支撑，快速判定争议内容的真伪。' },
    ],
    stats: [
      { value: '99.2%', label: '新闻图片检测准确率' },
      { value: '< 1s', label: '单张图片检测速度' },
    ],
  },
  {
    industry: '金融服务',
    color: '#10b981',
    desc: '防范基于深度伪造的身份欺诈，保障金融交易安全和客户资金安全。',
    scenarios: [
      { title: '远程开户核验', desc: '在远程 KYC 流程中检测视频面签是否为实时真人，防止伪造身份开户。' },
      { title: '视频客服防伪', desc: '实时检测视频通话中的对方是否为深度伪造，防范社会工程学攻击。' },
      { title: '生物识别增强', desc: '作为人脸识别的补充层，提升生物认证系统的抗攻击能力。' },
    ],
    stats: [
      { value: '99.7%', label: '活体检测通过率' },
      { value: '0.01%', label: '伪造通过率' },
    ],
  },
  {
    industry: '司法取证',
    color: '#8b5cf6',
    desc: '为电子证据提供技术鉴定支持，辅助司法机关识别伪造的音视频证据。',
    scenarios: [
      { title: '证据真实性鉴定', desc: '对提交的音视频证据进行深度伪造检测，出具技术分析报告。' },
      { title: '伪造类型溯源', desc: '识别伪造内容使用的具体技术和工具，为案件调查提供线索。' },
      { title: '批量证据筛查', desc: '对大量电子数据进行自动化筛查，快速定位可疑内容。' },
    ],
    stats: [
      { value: '100+', label: '支持伪造类型' },
      { value: '可溯源', label: '伪造工具识别' },
    ],
  },
  {
    industry: '社交平台',
    color: '#f59e0b',
    desc: '构建平台内容安全防线，保护用户免受虚假信息和伪造内容的侵害。',
    scenarios: [
      { title: '内容审核', desc: '在内容发布环节自动检测深度伪造，对违规内容进行标记或拦截。' },
      { title: '举报辅助', desc: '为用户举报的疑似伪造内容提供快速技术鉴定。' },
      { title: '创作者认证', desc: '验证内容创作者的身份真实性，打击冒充名人的虚假账号。' },
    ],
    stats: [
      { value: '10K+', label: '日均处理量' },
      { value: '98.5%', label: '误报率低于' },
    ],
  },
  {
    industry: '教育科研',
    color: '#ec4899',
    desc: '为学术研究和教学提供深度伪造检测的技术平台和数据分析能力。',
    scenarios: [
      { title: '研究数据支持', desc: '为深度伪造检测研究提供标注数据和基准测试环境。' },
      { title: '教学演示', desc: '可视化展示各类伪造技术的特征和检测方法，辅助课堂教学。' },
      { title: '安全意识培训', desc: '帮助师生了解深度伪造的识别方法，提升数字素养。' },
    ],
    stats: [
      { value: '20+', label: '伪造类型覆盖' },
      { value: '开放', label: '学术合作' },
    ],
  },
  {
    industry: '企业安全',
    color: '#06b6d4',
    desc: '保护企业免受深度伪造带来的商业欺诈和声誉风险。',
    scenarios: [
      { title: '高管身份保护', desc: '监控网络上是否存在冒充企业高管的伪造内容，及时预警。' },
      { title: '视频会议安全', desc: '在重要视频会议中实时检测参与者身份真实性。' },
      { title: '品牌声誉管理', desc: '监测和识别利用深度伪造损害企业品牌形象的内容。' },
    ],
    stats: [
      { value: '24/7', label: '持续监控' },
      { value: '< 5min', label: '告警响应时间' },
    ],
  },
];

const PROCESS_STEPS = [
  { num: 1, title: '需求沟通', desc: '了解您的业务场景、数据规模和安全需求。' },
  { num: 2, title: '方案定制', desc: '基于需求设计专属的检测方案和部署架构。' },
  { num: 3, title: '系统集成', desc: '通过 API 或 SDK 将检测能力集成到您的业务系统。' },
  { num: 4, title: '持续优化', desc: '根据实际使用数据持续优化模型，适应新型攻击。' },
];

export default function Solutions() {
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
            行业<span style={{ color: 'var(--accent)' }}>解决方案</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>
            为不同行业场景量身定制的深度伪造检测方案
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {SOLUTIONS.map((sol) => (
              <div
                key={sol.industry}
                className="card"
                style={{ padding: 32, position: 'relative', overflow: 'hidden' }}
              >
                {/* Accent bar */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: sol.color,
                  }}
                />

                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <h3 style={{ fontSize: 22, fontWeight: 700 }}>{sol.industry}</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
                  {sol.desc}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                  {sol.scenarios.map((s) => (
                    <div key={s.title} style={{ display: 'flex', gap: 10 }}>
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: sol.color,
                          marginTop: 8,
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{s.title}</div>
                        <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 24, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                  {sol.stats.map((s) => (
                    <div key={s.label}>
                      <div style={{ fontSize: 20, fontWeight: 700, color: sol.color }}>{s.value}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cooperation Process */}
      <section style={{ padding: '60px 0', background: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderTop: '1px solid rgba(255,255,255,0.4)', borderBottom: '1px solid rgba(255,255,255,0.4)' }}>
        <div className="container">
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>合作流程</h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: 48, fontSize: 15 }}>
            从需求到落地的完整服务链路
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.num} style={{ textAlign: 'center', position: 'relative' }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'var(--gradient-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                    fontWeight: 700,
                    margin: '0 auto 16px',
                  }}
                >
                  {step.num}
                </div>
                <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{step.title}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6 }}>{step.desc}</p>
                {i < 3 && (
                  <div
                    style={{
                      position: 'absolute',
                      right: -12,
                      top: 28,
                      color: 'var(--border-light)',
                      fontSize: 20,
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

      {/* CTA */}
      <section style={{ padding: '60px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>需要定制化方案？</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: 16 }}>
            我们的技术团队将根据您的具体需求提供专属解决方案
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <a href="mailto:contact@tracefake.com" className="btn btn-primary" style={{ fontSize: 16, padding: '14px 36px' }}>
              联系我们
            </a>
            <a href="/api-docs" className="btn btn-outline" style={{ fontSize: 16, padding: '14px 36px' }}>
              查看 API 文档
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
