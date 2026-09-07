import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { simulateAnalysis } from '../utils/analysis';

export default function Analyze() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('');

  const stages = [
    '正在加载文件...',
    '提取面部特征...',
    '分析噪声模式...',
    '检测伪造痕迹...',
    '评估时序一致性...',
    '生成分析报告...',
  ];

  const handleFile = useCallback((f: File) => {
    const isImage = f.type.startsWith('image/');
    const isVideo = f.type.startsWith('video/');
    if (!isImage && !isVideo) {
      alert('请上传图片或视频文件（JPG/PNG/MP4/MOV）');
      return;
    }
    setFile(f);
    if (isImage) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(f);
    } else {
      setPreview(null);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const handleAnalyze = async () => {
    if (!file) return;
    setAnalyzing(true);
    setProgress(0);

    const totalDuration = 3000 + Math.random() * 2000;
    const stageInterval = totalDuration / stages.length;

    for (let i = 0; i < stages.length; i++) {
      setStage(stages[i]);
      await new Promise((r) => setTimeout(r, stageInterval));
      setProgress(Math.round(((i + 1) / stages.length) * 100));
    }

    const fileType = file.type.startsWith('image/') ? 'image' : 'video';
    const result = await simulateAnalysis(file.name, fileType, preview || undefined);
    navigate(`/result/${result.id}`);
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setAnalyzing(false);
    setProgress(0);
    setStage('');
  };

  return (
    <div style={{ padding: '60px 0', minHeight: 'calc(100vh - 200px)' }}>
      <div className="container">
        <h1 style={{ fontSize: 32, fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>
          深度伪造检测
        </h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 40, fontSize: 16 }}>
          上传图片或视频，AI 引擎将为您进行全面的伪造分析
        </p>

        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          {!analyzing ? (
            <>
              {/* Upload Area */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: `2px dashed ${dragOver ? 'var(--accent)' : 'var(--border-light)'}`,
                  borderRadius: 'var(--radius-lg)',
                  padding: file || preview ? 20 : 60,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  background: dragOver ? 'rgba(59,130,246,0.05)' : 'var(--bg-card)',
                  minHeight: 280,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  style={{ display: 'none' }}
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />

                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 8, objectFit: 'contain' }}
                  />
                ) : file ? (
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{file.name}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
                      {(file.size / 1024 / 1024).toFixed(2)} MB · {file.type}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
                      拖拽文件到此处，或点击上传
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
                      支持 JPG、PNG、MP4、MOV 格式，最大 100MB
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {file && (
                <div style={{ display: 'flex', gap: 16, marginTop: 24, justifyContent: 'center' }}>
                  <button className="btn btn-primary" onClick={handleAnalyze} style={{ fontSize: 16, padding: '14px 40px' }}>
                    开始分析
                  </button>
                  <button className="btn btn-outline" onClick={reset}>
                    重新选择
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Analyzing State */
            <div className="card" style={{ textAlign: 'center', padding: 60 }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  border: '4px solid var(--border)',
                  borderTopColor: 'var(--accent)',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 24px',
                }}
              />
              <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{stage}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
                正在分析 {file?.name}
              </div>
              {/* Progress Bar */}
              <div
                style={{
                  width: '100%',
                  height: 6,
                  background: 'var(--border)',
                  borderRadius: 3,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${progress}%`,
                    height: '100%',
                    background: 'var(--gradient-accent)',
                    borderRadius: 3,
                    transition: 'width 0.3s',
                  }}
                />
              </div>
              <div style={{ marginTop: 8, fontSize: 13, color: 'var(--text-secondary)' }}>{progress}%</div>
            </div>
          )}

          {/* Supported Types Info */}
          <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            <div className="card" style={{ padding: 20 }}>
              <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>图片检测</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6 }}>
                支持 JPG、PNG 格式。检测人脸替换、表情驱动、属性编辑、GAN 合成等伪造类型。
              </p>
            </div>
            <div className="card" style={{ padding: 20 }}>
              <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>视频检测</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6 }}>
                支持 MP4、MOV 格式。除图片检测能力外，额外分析时序一致性和帧间伪造痕迹。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
