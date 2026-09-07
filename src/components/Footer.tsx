import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'rgba(255,255,255,0.4)',
        backdropFilter: 'blur(20px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
        borderTop: '1px solid rgba(255,255,255,0.5)',
        padding: '48px 0 32px',
        marginTop: 'auto',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: 40,
            marginBottom: 40,
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: 1 }}>TraceFake <span style={{ color: 'var(--accent)' }}>TraceVision</span></span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7, maxWidth: 280 }}>
              AI 驱动的深度伪造内容检测与溯源平台，守护数字世界的真实性。
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>产品</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Link to="/analyze" style={{ color: 'var(--text-secondary)', fontSize: 13 }}>检测分析</Link>
              <Link to="/dashboard" style={{ color: 'var(--text-secondary)', fontSize: 13 }}>历史记录</Link>
              <Link to="/api-docs" style={{ color: 'var(--text-secondary)', fontSize: 13 }}>API 文档</Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>资源</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Link to="/knowledge" style={{ color: 'var(--text-secondary)', fontSize: 13 }}>知识库</Link>
              <Link to="/solutions" style={{ color: 'var(--text-secondary)', fontSize: 13 }}>行业方案</Link>
              <Link to="/about" style={{ color: 'var(--text-secondary)', fontSize: 13 }}>关于我们</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>联系</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, color: 'var(--text-secondary)', fontSize: 13 }}>
              <span>contact@tracefake.com</span>
              <span>北京市海淀区中关村</span>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
            &copy; 2026 TraceFake TraceVision. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: 24, color: 'var(--text-secondary)', fontSize: 13 }}>
            <span>隐私政策</span>
            <span>使用条款</span>
            <span>安全白皮书</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
