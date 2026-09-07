import { useState } from 'react';

const API_ENDPOINTS = [
  {
    method: 'POST',
    path: '/api/v1/detect/image',
    desc: '上传图片进行深度伪造检测',
    params: [
      { name: 'file', type: 'File', required: true, desc: '图片文件（JPG/PNG/WebP），最大 50MB' },
      { name: 'return_details', type: 'boolean', required: false, desc: '是否返回详细分析指标，默认 false' },
    ],
    response: {
      code: 200,
      body: `{
  "success": true,
  "data": {
    "id": "rg_xxxxx",
    "is_fake": true,
    "confidence": 94.7,
    "risk_level": "high",
    "attribution": {
      "type": "face_swap",
      "confidence": 87.3
    },
    "details": {
      "face_integrity": 34.2,
      "noise_pattern": 41.8,
      "artifact_score": 78.5
    }
  }
}`,
    },
  },
  {
    method: 'POST',
    path: '/api/v1/detect/video',
    desc: '上传视频进行深度伪造检测',
    params: [
      { name: 'file', type: 'File', required: true, desc: '视频文件（MP4/MOV/AVI），最大 500MB' },
      { name: 'frame_interval', type: 'integer', required: false, desc: '抽帧间隔（秒），默认 1' },
      { name: 'return_details', type: 'boolean', required: false, desc: '是否返回详细分析指标' },
    ],
    response: {
      code: 200,
      body: `{
  "success": true,
  "data": {
    "id": "rg_xxxxx",
    "is_fake": true,
    "confidence": 91.2,
    "risk_level": "high",
    "frame_results": [
      { "frame": 1, "is_fake": true, "confidence": 93.1 },
      { "frame": 30, "is_fake": true, "confidence": 89.7 }
    ],
    "attribution": {
      "type": "expression_driving",
      "confidence": 82.6
    }
  }
}`,
    },
  },
  {
    method: 'GET',
    path: '/api/v1/result/:id',
    desc: '获取指定检测任务的完整报告',
    params: [
      { name: 'id', type: 'string', required: true, desc: '检测任务 ID' },
    ],
    response: {
      code: 200,
      body: `{
  "success": true,
  "data": {
    "id": "rg_xxxxx",
    "file_name": "sample.jpg",
    "file_type": "image",
    "timestamp": 1725724800,
    "is_fake": true,
    "confidence": 94.7,
    "risk_level": "high",
    "attribution_type": "人脸替换 (Face Swap)",
    "attribution_confidence": 87.3,
    "details": { ... }
  }
}`,
    },
  },
  {
    method: 'GET',
    path: '/api/v1/history',
    desc: '获取当前用户的检测历史记录',
    params: [
      { name: 'page', type: 'integer', required: false, desc: '页码，默认 1' },
      { name: 'limit', type: 'integer', required: false, desc: '每页数量，默认 20' },
      { name: 'filter', type: 'string', required: false, desc: '筛选: all / fake / real' },
    ],
    response: {
      code: 200,
      body: `{
  "success": true,
  "data": {
    "total": 156,
    "page": 1,
    "items": [ ... ]
  }
}`,
    },
  },
  {
    method: 'DELETE',
    path: '/api/v1/history',
    desc: '清除所有检测历史记录',
    params: [],
    response: {
      code: 200,
      body: `{
  "success": true,
  "message": "历史记录已清除"
}`,
    },
  },
];

const SDK_EXAMPLES = [
  {
    lang: 'Python',
    code: `import requests

# 图片检测
def detect_image(file_path):
    url = "https://api.tracefake.com/v1/detect/image"
    headers = {
        "Authorization": "Bearer YOUR_API_KEY"
    }
    
    with open(file_path, "rb") as f:
        files = {"file": f}
        response = requests.post(
            url, 
            headers=headers, 
            files=files,
            data={"return_details": True}
        )
    
    result = response.json()
    print(f"伪造: {result['data']['is_fake']}")
    print(f"置信度: {result['data']['confidence']}%")
    print(f"类型: {result['data']['attribution']['type']}")
    return result

# 批量检测
def batch_detect(file_paths):
    results = []
    for path in file_paths:
        result = detect_image(path)
        results.append(result)
    return results`,
  },
  {
    lang: 'JavaScript',
    code: `// 图片检测
async function detectImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('return_details', 'true');

  const response = await fetch(
    'https://api.tracefake.com/v1/detect/image',
    {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY'
      },
      body: formData
    }
  );

  const result = await response.json();
  console.log('伪造:', result.data.is_fake);
  console.log('置信度:', result.data.confidence + '%');
  console.log('类型:', result.data.attribution.type);
  return result;
}

// 视频检测
async function detectVideo(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('frame_interval', '1');

  const response = await fetch(
    'https://api.tracefake.com/v1/detect/video',
    {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY'
      },
      body: formData
    }
  );

  return await response.json();
}`,
  },
  {
    lang: 'cURL',
    code: `# 图片检测
curl -X POST https://api.tracefake.com/v1/detect/image \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@photo.jpg" \\
  -F "return_details=true"

# 视频检测
curl -X POST https://api.tracefake.com/v1/detect/video \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@video.mp4" \\
  -F "frame_interval=1"

# 获取结果
curl -X GET https://api.tracefake.com/v1/result/rg_xxxxx \\
  -H "Authorization: Bearer YOUR_API_KEY"

# 历史记录
curl -X GET "https://api.tracefake.com/v1/history?page=1&limit=20" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
  },
];

const ERROR_CODES = [
  { code: 400, desc: '请求参数错误', detail: '检查文件类型、大小是否符合要求' },
  { code: 401, desc: '未授权', detail: 'API Key 无效或已过期' },
  { code: 413, desc: '文件过大', detail: '图片不超过 50MB，视频不超过 500MB' },
  { code: 429, desc: '请求频率过高', detail: '请降低请求频率或升级套餐' },
  { code: 500, desc: '服务器内部错误', detail: '请稍后重试，或联系技术支持' },
];

export default function ApiDocs() {
  const [activeEndpoint, setActiveEndpoint] = useState(0);
  const [activeSdk, setActiveSdk] = useState(0);

  const methodColor = (m: string) => {
    switch (m) {
      case 'GET': return '#10b981';
      case 'POST': return '#3b82f6';
      case 'DELETE': return '#ef4444';
      default: return 'var(--text-secondary)';
    }
  };

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
            API <span style={{ color: 'var(--accent)' }}>文档</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>
            通过 RESTful API 将深度伪造检测能力集成到您的应用中
          </p>
          <div style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'center' }}>
            <span className="badge badge-info">Base URL: https://api.tracefake.com</span>
            <span className="badge badge-success">v1.0 稳定版</span>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>快速开始</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 48 }}>
            {[
              { step: '1', title: '获取 API Key', desc: '注册账户后在控制台生成您的专属 API Key。' },
              { step: '2', title: '调用接口', desc: '使用 HTTP 请求调用检测 API，上传需要分析的内容。' },
              { step: '3', title: '获取结果', desc: '解析返回的 JSON 数据，获取检测结果和详细指标。' },
            ].map((s) => (
              <div key={s.step} className="card" style={{ padding: 24 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'var(--gradient-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    marginBottom: 12,
                  }}
                >
                  {s.step}
                </div>
                <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{s.title}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* API Endpoints */}
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>API 端点</h2>
          <div style={{ display: 'flex', gap: 24 }}>
            {/* Endpoint List */}
            <div style={{ width: 340, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {API_ENDPOINTS.map((ep, i) => (
                <button
                  key={ep.path}
                  onClick={() => setActiveEndpoint(i)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '12px 16px',
                    borderRadius: 10,
                    border: 'none',
                    background: activeEndpoint === i ? 'var(--bg-card)' : 'transparent',
                    color: 'var(--text-primary)',
                    fontSize: 13,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.3s',
                  }}
                >
                  <span
                    style={{
                      padding: '3px 8px',
                      borderRadius: 4,
                      background: methodColor(ep.method),
                      color: 'white',
                      fontSize: 11,
                      fontWeight: 700,
                      minWidth: 48,
                      textAlign: 'center',
                    }}
                  >
                    {ep.method}
                  </span>
                  <span style={{ fontFamily: 'monospace', fontSize: 12 }}>{ep.path}</span>
                </button>
              ))}
            </div>

            {/* Endpoint Detail */}
            <div className="card" style={{ flex: 1, padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span
                  style={{
                    padding: '4px 12px',
                    borderRadius: 6,
                    background: methodColor(API_ENDPOINTS[activeEndpoint].method),
                    color: 'white',
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  {API_ENDPOINTS[activeEndpoint].method}
                </span>
                <code style={{ fontSize: 15, fontFamily: 'monospace' }}>{API_ENDPOINTS[activeEndpoint].path}</code>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 20 }}>
                {API_ENDPOINTS[activeEndpoint].desc}
              </p>

              {API_ENDPOINTS[activeEndpoint].params.length > 0 && (
                <>
                  <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>请求参数</h4>
                  <div style={{ marginBottom: 20 }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)' }}>
                          <th style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-secondary)' }}>参数</th>
                          <th style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-secondary)' }}>类型</th>
                          <th style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-secondary)' }}>必填</th>
                          <th style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-secondary)' }}>说明</th>
                        </tr>
                      </thead>
                      <tbody>
                        {API_ENDPOINTS[activeEndpoint].params.map((p) => (
                          <tr key={p.name} style={{ borderBottom: '1px solid var(--border)' }}>
                            <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 13 }}>{p.name}</td>
                            <td style={{ padding: '8px 12px', color: 'var(--accent)', fontSize: 13 }}>{p.type}</td>
                            <td style={{ padding: '8px 12px', fontSize: 13 }}>{p.required ? '是' : '否'}</td>
                            <td style={{ padding: '8px 12px', color: 'var(--text-secondary)', fontSize: 13 }}>{p.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>响应示例</h4>
              <pre
                style={{
                  background: 'rgba(13,17,23,0.7)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                  borderRadius: 10,
                  padding: 20,
                  fontSize: 13,
                  lineHeight: 1.6,
                  overflow: 'auto',
                  color: '#c9d1d9',
                  fontFamily: 'monospace',
                }}
              >
                {API_ENDPOINTS[activeEndpoint].response.body}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* SDK Examples */}
      <section style={{ padding: '60px 0', background: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderTop: '1px solid rgba(255,255,255,0.4)', borderBottom: '1px solid rgba(255,255,255,0.4)' }}>
        <div className="container">
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>SDK 示例</h2>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {SDK_EXAMPLES.map((sdk, i) => (
              <button
                key={sdk.lang}
                onClick={() => setActiveSdk(i)}
                style={{
                  padding: '8px 20px',
                  borderRadius: 8,
                  border: 'none',
                  background: activeSdk === i ? 'var(--accent)' : 'var(--bg-card)',
                  color: activeSdk === i ? 'white' : 'var(--text-secondary)',
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                {sdk.lang}
              </button>
            ))}
          </div>
          <pre
            style={{
              background: 'rgba(13,17,23,0.7)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
              borderRadius: 12,
              padding: 28,
              fontSize: 14,
              lineHeight: 1.7,
              overflow: 'auto',
              color: '#c9d1d9',
              fontFamily: 'monospace',
              maxHeight: 500,
            }}
          >
            {SDK_EXAMPLES[activeSdk].code}
          </pre>
        </div>
      </section>

      {/* Error Codes */}
      <section style={{ padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>错误码</h2>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' }}>
                  <th style={{ textAlign: 'left', padding: '14px 20px', color: 'var(--text-secondary)' }}>状态码</th>
                  <th style={{ textAlign: 'left', padding: '14px 20px', color: 'var(--text-secondary)' }}>描述</th>
                  <th style={{ textAlign: 'left', padding: '14px 20px', color: 'var(--text-secondary)' }}>解决方案</th>
                </tr>
              </thead>
              <tbody>
                {ERROR_CODES.map((e) => (
                  <tr key={e.code} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '14px 20px' }}>
                      <span
                        style={{
                          padding: '3px 10px',
                          borderRadius: 6,
                          background: e.code >= 500 ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)',
                          color: e.code >= 500 ? 'var(--danger)' : 'var(--warning)',
                          fontWeight: 600,
                          fontSize: 13,
                        }}
                      >
                        {e.code}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px', fontWeight: 500 }}>{e.desc}</td>
                    <td style={{ padding: '14px 20px', color: 'var(--text-secondary)' }}>{e.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
