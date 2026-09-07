import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHistory, getRiskColor, getRiskLabel, type AnalysisResult } from '../utils/analysis';

export default function Dashboard() {
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [filter, setFilter] = useState<'all' | 'fake' | 'real'>('all');

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const filtered = history.filter((r) => {
    if (filter === 'fake') return r.isFake;
    if (filter === 'real') return !r.isFake;
    return true;
  });

  const stats = {
    total: history.length,
    fake: history.filter((r) => r.isFake).length,
    real: history.filter((r) => !r.isFake).length,
  };

  const clearHistory = () => {
    if (confirm('确定要清除所有历史记录吗？')) {
      localStorage.removeItem('rg_history');
      setHistory([]);
    }
  };

  return (
    <div style={{ padding: '60px 0', minHeight: 'calc(100vh - 200px)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700 }}>检测历史</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 4 }}>
              查看所有深度伪造检测记录
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link to="/analyze" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: 14 }}>
              + 新建检测
            </Link>
            {history.length > 0 && (
              <button className="btn btn-outline" onClick={clearHistory} style={{ padding: '10px 20px', fontSize: 14 }}>
                清除记录
              </button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 32 }}>
          <div className="card" style={{ padding: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--accent)' }}>{stats.total}</div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>总检测数</div>
          </div>
          <div className="card" style={{ padding: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--danger)' }}>{stats.fake}</div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>伪造内容</div>
          </div>
          <div className="card" style={{ padding: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--success)' }}>{stats.real}</div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>真实内容</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {(['all', 'fake', 'real'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '8px 20px',
                borderRadius: 8,
                border: 'none',
                background: filter === f ? 'var(--accent)' : 'var(--bg-card)',
                color: filter === f ? 'white' : 'var(--text-secondary)',
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              {f === 'all' ? '全部' : f === 'fake' ? '伪造' : '真实'}
              <span style={{ marginLeft: 6, opacity: 0.7 }}>
                ({f === 'all' ? stats.total : f === 'fake' ? stats.fake : stats.real})
              </span>
            </button>
          ))}
        </div>

        {/* History List */}
        {filtered.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: 60 }}>
            <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.3, color: 'var(--text-secondary)' }}>!</div>
            <h3 style={{ fontSize: 18, marginBottom: 8 }}>暂无检测记录</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
              {history.length === 0 ? '上传文件或图片开始第一次检测' : '当前筛选条件下没有记录'}
            </p>
            <Link to="/analyze" className="btn btn-primary">
              开始检测
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.map((r) => (
              <Link
                to={`/result/${r.id}`}
                key={r.id}
                className="card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '16px 24px',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                {/* Thumbnail / Icon */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 10,
                    background: r.isFake ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                    marginRight: 20,
                    flexShrink: 0,
                    overflow: 'hidden',
                  }}
                >
                  {r.thumbnail ? (
                    <img src={r.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
                      {r.fileType === 'image' ? 'IMG' : 'VID'}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {r.fileName}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                    {r.attributionType} · {new Date(r.timestamp).toLocaleString('zh-CN')}
                  </div>
                </div>

                {/* Status */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>置信度</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: getRiskColor(r.riskLevel) }}>
                      {r.confidence}%
                    </div>
                  </div>
                  <span className={`badge ${r.isFake ? 'badge-danger' : 'badge-success'}`}>
                    {getRiskLabel(r.riskLevel)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
