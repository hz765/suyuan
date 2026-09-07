import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

export default function Navbar() {
  const location = useLocation();

  const linkStyle = (path: string) => ({
    color: location.pathname === path ? 'var(--accent)' : 'var(--text-secondary)',
    fontWeight: location.pathname === path ? 600 : 400,
    transition: 'color 0.3s',
  });

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(245, 247, 251, 0.6)',
        backdropFilter: 'blur(24px) saturate(1.6)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 80,
        }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', color: 'var(--text-primary)' }}>
          <Logo size={52} />
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Link to="/" style={linkStyle('/')}>首页</Link>
          <Link to="/analyze" style={linkStyle('/analyze')}>检测分析</Link>
          <Link to="/knowledge" style={linkStyle('/knowledge')}>知识库</Link>
          <Link to="/solutions" style={linkStyle('/solutions')}>行业方案</Link>
          <Link to="/api-docs" style={linkStyle('/api-docs')}>API</Link>
          <Link to="/about" style={linkStyle('/about')}>关于</Link>
          <Link to="/dashboard" style={linkStyle('/dashboard')}>历史</Link>
          <Link to="/analyze" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: 14 }}>
            开始检测
          </Link>
        </div>
      </div>
    </nav>
  );
}
