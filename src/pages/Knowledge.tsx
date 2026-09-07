import { useState } from 'react';

const FORGERY_CATEGORIES = [
  {
    title: '人脸替换',
    desc: '将目标人物的面部替换为另一人的面部，保持表情和姿态一致。常见于 DeepFaceLab、FaceSwap 等工具。',
    examples: ['DeepFaceLab', 'FaceSwap', 'SimSwap', 'DeepFaceLive'],
    difficulty: '高',
    prevalence: '非常常见',
  },
  {
    title: '表情驱动',
    desc: '通过源视频的表情动作驱动目标人脸，生成逼真的表情迁移视频。代表技术如 First Order Motion Model。',
    examples: ['FOMM', 'Live Speech Portraits', 'SadTalker', 'AniPortrait'],
    difficulty: '中高',
    prevalence: '常见',
  },
  {
    title: '属性编辑',
    desc: '修改人脸的特定属性，如年龄、性别、表情、发型等，而不改变身份特征。',
    examples: ['StyleGAN Edit', 'GAN Inversion', 'Diffusion Edit'],
    difficulty: '中',
    prevalence: '较常见',
  },
  {
    title: '全脸生成',
    desc: '完全由 AI 生成的不存在的人脸图像，基于 GAN 或扩散模型技术，细节逼真难以肉眼分辨。',
    examples: ['StyleGAN3', 'DALL·E', 'MidJourney', 'Stable Diffusion'],
    difficulty: '中',
    prevalence: '快速增长',
  },
  {
    title: '音频克隆',
    desc: '克隆特定人物的声音特征，生成逼真的语音内容。可配合视频伪造实现多模态欺骗。',
    examples: ['ElevenLabs', 'Resemble AI', 'Bark', 'VALL-E'],
    difficulty: '中低',
    prevalence: '快速增长',
  },
  {
    title: '身体替换',
    desc: '不仅替换面部，还替换整个身体姿态和动作，实现全身级别的深度伪造。',
    examples: ['Pose Transfer', 'Human Generation', 'Animate Anyone'],
    difficulty: '极高',
    prevalence: '新兴',
  },
];

const DETECTION_METHODS = [
  {
    name: '空间域分析',
    desc: '分析单帧图像中的伪造痕迹，包括面部边界不自然、光照不一致、纹理异常等空间特征。',
    techniques: ['面部边界检测', '光照一致性分析', '纹理频率分析', '颜色空间异常检测'],
  },
  {
    name: '频域分析',
    desc: '通过傅里叶变换等频域方法，检测 GAN 生成图像特有的频谱伪影和上采样痕迹。',
    techniques: ['DCT 系数分析', '频谱异常检测', '上采样伪影识别', '噪声残差分析'],
  },
  {
    name: '时序一致性',
    desc: '针对视频内容，分析帧间的面部运动连续性、眨眼频率、微表情自然度等时序特征。',
    techniques: ['光流一致性', '眨眼模式分析', '微表情检测', '帧间跳变检测'],
  },
  {
    name: '生物特征验证',
    desc: '利用人脸的生物学特性进行验证，如 rPPG 心率信号、3D 结构一致性、皮肤反射特性等。',
    techniques: ['rPPG 心率检测', '3D 面部重建', '皮肤反射分析', '瞳孔反应检测'],
  },
  {
    name: '深度学习分类',
    desc: '基于大规模数据训练的深度学习模型，自动学习伪造与真实内容的深层特征差异。',
    techniques: ['CNN 特征提取', 'Vision Transformer', '多模态融合', '对比学习'],
  },
  {
    name: '溯源归因',
    desc: '不仅判断真假，更进一步识别伪造内容的具体生成方法和工具，实现攻击溯源。',
    techniques: ['特征指纹匹配', '模型指纹提取', '生成器识别', '攻击类型聚类'],
  },
];

const TIMELINE = [
  { year: '2014', event: 'GAN 诞生', desc: 'Ian Goodfellow 提出生成对抗网络，开启 AI 生成图像时代。' },
  { year: '217', event: 'DeepFake 出现', desc: 'Reddit 用户发布基于 AI 的面部替换视频，"DeepFake"一词由此诞生。' },
  { year: '2019', event: 'StyleGAN 发布', desc: 'NVIDIA 发布 StyleGAN，生成的人脸照片达到以假乱真的水平。' },
  { year: '2020', event: '检测技术兴起', desc: '各大研究机构和企业开始系统性研究深度伪造检测技术。' },
  { year: '2022', event: '扩散模型爆发', desc: 'Stable Diffusion、DALL·E 2 等扩散模型使 AI 生成内容门槛大幅降低。' },
  { year: '2024', event: '实时伪造普及', desc: '实时深度伪造技术成熟，视频通话场景面临严峻挑战。' },
  { year: '2026', event: '多模态检测', desc: '检测技术从单一模态向多模态融合演进，溯源能力持续增强。' },
];

const FAQS = [
  {
    q: '什么是深度伪造（Deepfake）？',
    a: '深度伪造是利用深度学习技术（尤其是生成对抗网络 GAN 和扩散模型）生成的逼真但虚假的图像、音频或视频内容。最常见的形式是人脸替换，即将一个人的面部无缝替换到另一个人的视频或图像中。',
  },
  {
    q: '深度伪造有哪些危害？',
    a: '深度伪造可能被用于制造虚假新闻、身份盗用、金融诈骗、色情内容、政治操纵等。随着技术门槛降低，普通人也能轻易制作高质量的伪造内容，对社会信任体系构成严重威胁。',
  },
  {
    q: '如何肉眼识别深度伪造？',
    a: '可以关注以下迹象：面部边缘不自然、眨眼频率异常、口型与声音不同步、光照方向不一致、皮肤纹理过于光滑、头发边缘模糊、背景扭曲等。但高水准的伪造已很难通过肉眼识别，建议使用专业检测工具。',
  },
  {
    q: 'TraceFake TraceVision 的检测准确率如何？',
    a: '我们的检测引擎在标准基准测试中准确率达到 98.6%，对已知攻击类型的识别率超过 99%。对于新型未知攻击，通过半监督学习框架也能保持 90% 以上的检测率。',
  },
  {
    q: '支持哪些文件格式？',
    a: '图片支持 JPG、PNG、WebP 格式，最大 50MB。视频支持 MP4、MOV、AVI 格式，最大 500MB，时长不超过 10 分钟。',
  },
  {
    q: '我的数据会被保存吗？',
    a: '所有分析均在本地浏览器中完成，上传的文件不会被传输到任何服务器。检测历史记录仅保存在您本地的浏览器存储中，您可以随时清除。',
  },
];

export default function Knowledge() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeMethod, setActiveMethod] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
            深度伪造<span style={{ color: 'var(--accent)' }}>知识库</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>
            了解深度伪造技术的原理、类型与检测方法，提升数字内容安全意识
          </p>
        </div>
      </section>

      {/* Forgery Types */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>伪造技术类型</h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: 40, fontSize: 15 }}>
            了解当前主流的 AI 伪造手段及其特征
          </p>

          <div style={{ display: 'flex', gap: 24 }}>
            {/* Category List */}
            <div style={{ width: 260, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {FORGERY_CATEGORIES.map((cat, i) => (
                <button
                  key={cat.title}
                  onClick={() => setActiveCategory(i)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '14px 18px',
                    borderRadius: 12,
                    border: 'none',
                    background: activeCategory === i ? 'var(--accent)' : 'var(--bg-card)',
                    color: activeCategory === i ? 'white' : 'var(--text-primary)',
                    fontSize: 14,
                    fontWeight: activeCategory === i ? 600 : 400,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.3s',
                  }}
                >
                  {cat.title}
                </button>
              ))}
            </div>

            {/* Category Detail */}
            <div className="card" style={{ flex: 1, padding: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <div>
                  <h3 style={{ fontSize: 24, fontWeight: 700 }}>{FORGERY_CATEGORIES[activeCategory].title}</h3>
                  <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
                    <span className="badge badge-info">难度: {FORGERY_CATEGORIES[activeCategory].difficulty}</span>
                    <span className="badge badge-warning">流行度: {FORGERY_CATEGORIES[activeCategory].prevalence}</span>
                  </div>
                </div>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.8, marginBottom: 24 }}>
                {FORGERY_CATEGORIES[activeCategory].desc}
              </p>
              <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>代表工具 / 技术</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {FORGERY_CATEGORIES[activeCategory].examples.map((ex) => (
                  <span
                    key={ex}
                    style={{
                      padding: '6px 14px',
                      background: 'rgba(59,130,246,0.1)',
                      borderRadius: 8,
                      fontSize: 13,
                      color: 'var(--accent)',
                      fontWeight: 500,
                    }}
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detection Methods */}
      <section style={{ padding: '60px 0', background: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderTop: '1px solid rgba(255,255,255,0.4)', borderBottom: '1px solid rgba(255,255,255,0.4)' }}>
        <div className="container">
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>检测技术体系</h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: 40, fontSize: 15 }}>
            多维度、多层次的深度伪造检测方法论
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 32 }}>
            {DETECTION_METHODS.map((method, i) => (
              <div
                key={method.name}
                className="card"
                onClick={() => setActiveMethod(i)}
                style={{
                  cursor: 'pointer',
                  borderColor: activeMethod === i ? 'var(--accent)' : undefined,
                  padding: 24,
                }}
              >
                <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{method.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7 }}>{method.desc}</p>
              </div>
            ))}
          </div>

          {/* Method Detail */}
          <div className="card" style={{ padding: 28 }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>
              {DETECTION_METHODS[activeMethod].name} — 核心技术
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {DETECTION_METHODS[activeMethod].techniques.map((t) => (
                <div
                  key={t}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '12px 16px',
                    background: 'rgba(59,130,246,0.06)',
                    borderRadius: 10,
                    fontSize: 14,
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      flexShrink: 0,
                    }}
                  />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>
            深度伪造<span style={{ color: 'var(--accent)' }}>发展史</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: 48, fontSize: 15 }}>
            从 GAN 诞生到多模态检测的技术演进
          </p>

          <div style={{ position: 'relative', maxWidth: 700, margin: '0 auto' }}>
            {/* Timeline line */}
            <div
              style={{
                position: 'absolute',
                left: 20,
                top: 0,
                bottom: 0,
                width: 2,
                background: 'var(--border-light)',
              }}
            />
            {TIMELINE.map((item) => (
              <div key={item.year} style={{ display: 'flex', gap: 24, marginBottom: 32, position: 'relative' }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: '50%',
                    background: 'var(--gradient-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 700,
                    flexShrink: 0,
                    zIndex: 1,
                  }}
                >
                  {item.year.slice(2)}
                </div>
                <div className="card" style={{ flex: 1, padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <h4 style={{ fontSize: 16, fontWeight: 600 }}>{item.event}</h4>
                    <span className="badge badge-info">{item.year}</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '60px 0', background: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderTop: '1px solid rgba(255,255,255,0.4)', borderBottom: '1px solid rgba(255,255,255,0.4)' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>常见问题</h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: 40, fontSize: 15 }}>
            关于深度伪造与检测的常见疑问
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="card"
                style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div
                  style={{
                    padding: '20px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <h4 style={{ fontSize: 15, fontWeight: 600 }}>{faq.q}</h4>
                  <span
                    style={{
                      fontSize: 20,
                      color: 'var(--text-secondary)',
                      transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)',
                      transition: 'transform 0.3s',
                    }}
                  >
                    +
                  </span>
                </div>
                {openFaq === i && (
                  <div style={{ padding: '0 24px 20px', color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.8 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
