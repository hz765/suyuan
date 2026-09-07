import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getResultById, getRiskColor, getRiskLabel, type AnalysisResult } from '../utils/analysis';

function GaugeChart({ value, label, color }: { value: number; label: string; color: string }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div style={{ textAlign: 'center' }}>
      <svg width={90} height={90} viewBox="0 0 90 90">
        <circle cx={45} cy={45} r={radius} fill="none" stroke="var(--border)" strokeWidth={6} />
        <circle
          cx={45}
          cy={45}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 45 45)"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
        <text x={45} y={45} textAnchor="middle" dominantBaseline="central" fill={color} fontSize={18} fontWeight={700}>
          {value}%
        </text>
      </svg>
      <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 8 }}>{label}</div>
    </div>
  );
}

export default function Result() {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    if (id) {
      const r = getResultById(id);
      setResult(r || null);
    }
  }, [id]);

  if (!result) {
    return (
      <div style={{ padding: '80px 0', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16, color: 'var(--text-secondary)', opacity: 0.5 }}>!</div>
        <h2 style={{ fontSize: 22, marginBottom: 8 }}>未找到检测结果</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>该检测记录可能已被清除</p>
        <Link to="/analyze" className="btn btn-primary">
          重新检测
        </Link>
      </div>
    );
  }

  const riskColor = getRiskColor(result.riskLevel);
  const riskLabel = getRiskLabel(result.riskLevel);
  const dateStr = new Date(result.timestamp).toLocaleString('zh-CN');

  return (
    <div style={{ padding: '60px 0', minHeight: 'calc(100vh - 200px)' }}>
      <div className="container" style={{ maxWidth: 800 }}>
        {/* Header */}
        <div className="animate-in" style={{ textAlign: 'center', marginBottom: 40 }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: result.isFake ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              fontWeight: 700,
              color: result.isFake ? 'var(--danger)' : 'var(--success)',
              margin: '0 auto 20px',
            }}
          >
            {result.isFake ? '!' : '✓'}
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
            {result.isFake ? '检测到伪造内容' : '内容真实可信'}
          </h1>
          <span className={`badge ${result.isFake ? 'badge-danger' : 'badge-success'}`} style={{ fontSize: 14, padding: '6px 16px' }}>
            {riskLabel}
          </span>
        </div>

        {/* Main Result Card */}
        <div className="card animate-in animate-delay-1" style={{ marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {/* Left: Summary */}
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: 'var(--text-secondary)' }}>
                检测摘要
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>文件名</span>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{result.fileName}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>文件类型</span>
                  <span style={{ fontSize: 14 }}>{result.fileType === 'image' ? '图片' : '视频'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>检测时间</span>
                  <span style={{ fontSize: 14 }}>{dateStr}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>综合置信度</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: result.confidence > 90 ? 'var(--danger)' : 'var(--warning)' }}>
                    {result.confidence}%
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Attribution */}
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: 'var(--text-secondary)' }}>
                溯源结果
              </h3>
              <div
                style={{
                  background: result.isFake ? 'rgba(239,68,68,0.08)' : 'rgba(16,185,129,0.08)',
                  borderRadius: 12,
                  padding: 20,
                  border: `1px solid ${result.isFake ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)'}`,
                }}
              >
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>伪造类型</div>
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{result.attributionType}</div>
                {result.isFake && (
                  <>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>溯源置信度</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--danger)' }}>
                      {result.attributionConfidence}%
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Detail Metrics */}
        <div className="card animate-in animate-delay-2" style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 24, color: 'var(--text-secondary)' }}>
            多维度分析指标
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 24 }}>
            <GaugeChart
              value={Math.round(result.details.faceIntegrity)}
              label="面部完整性"
              color={result.details.faceIntegrity > 70 ? 'var(--success)' : 'var(--danger)'}
            />
            <GaugeChart
              value={Math.round(result.details.noisePattern)}
              label="噪声模式"
              color={result.details.noisePattern > 70 ? 'var(--success)' : 'var(--danger)'}
            />
            <GaugeChart
              value={Math.round(result.details.temporalConsistency)}
              label="时序一致性"
              color={result.details.temporalConsistency > 70 ? 'var(--success)' : 'var(--danger)'}
            />
            <GaugeChart
              value={Math.round(100 - result.details.artifactScore)}
              label="伪影检测"
              color={result.details.artifactScore < 30 ? 'var(--success)' : 'var(--danger)'}
            />
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="card animate-in animate-delay-3" style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: 'var(--text-secondary)' }}>
            风险评估
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 12,
                height: 60,
                borderRadius: 6,
                background: `linear-gradient(to top, var(--success), var(--warning), var(--danger))`,
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: -4,
                  bottom: `${result.confidence}%`,
                  width: 20,
                  height: 4,
                  background: riskColor,
                  borderRadius: 2,
                  transition: 'bottom 1s ease',
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>风险等级</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: riskColor }}>{riskLabel}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>伪造概率</span>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{result.confidence}%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>建议操作</span>
                <span style={{ fontSize: 14, fontWeight: 500 }}>
                  {result.isFake ? '建议进一步人工核实' : '内容可信，可正常使用'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="animate-in animate-delay-4" style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <Link to="/analyze" className="btn btn-primary">
            继续检测
          </Link>
          <Link to="/dashboard" className="btn btn-outline">
            查看历史记录
          </Link>
        </div>
      </div>
    </div>
  );
}
