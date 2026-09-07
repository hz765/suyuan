export interface AnalysisResult {
  id: string;
  fileName: string;
  fileType: 'image' | 'video';
  timestamp: number;
  isFake: boolean;
  confidence: number;
  attributionType: string;
  attributionConfidence: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  details: {
    faceIntegrity: number;
    noisePattern: number;
    temporalConsistency: number;
    artifactScore: number;
  };
  thumbnail?: string;
}

const FORGERY_TYPES = [
  '人脸替换 (Face Swap)',
  '表情驱动 (Expression Driving)',
  '属性编辑 (Attribute Editing)',
  '全脸生成 (Full Face Generation)',
  'GAN 合成 (GAN Synthesis)',
  '扩散模型生成 (Diffusion Model)',
  '深度伪造视频 (Deepfake Video)',
  '音频克隆 (Audio Cloning)',
];

function randomBetween(min: number, max: number): number {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

export function simulateAnalysis(fileName: string, fileType: 'image' | 'video', thumbnail?: string): Promise<AnalysisResult> {
  return new Promise((resolve) => {
    const delay = 2000 + Math.random() * 3000;
    setTimeout(() => {
      const isFake = Math.random() > 0.35;
      const confidence = isFake ? randomBetween(72, 99) : randomBetween(85, 99);
      const attributionType = isFake
        ? FORGERY_TYPES[Math.floor(Math.random() * FORGERY_TYPES.length)]
        : '真实内容 (Authentic)';
      const attributionConfidence = isFake ? randomBetween(65, 95) : 0;

      let riskLevel: 'low' | 'medium' | 'high' | 'critical';
      if (!isFake) riskLevel = 'low';
      else if (confidence < 80) riskLevel = 'medium';
      else if (confidence < 92) riskLevel = 'high';
      else riskLevel = 'critical';

      const result: AnalysisResult = {
        id: `rg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        fileName,
        fileType,
        timestamp: Date.now(),
        isFake,
        confidence,
        attributionType,
        attributionConfidence,
        riskLevel,
        details: {
          faceIntegrity: isFake ? randomBetween(20, 60) : randomBetween(85, 99),
          noisePattern: isFake ? randomBetween(25, 55) : randomBetween(80, 98),
          temporalConsistency: fileType === 'video'
            ? (isFake ? randomBetween(30, 65) : randomBetween(85, 99))
            : randomBetween(70, 95),
          artifactScore: isFake ? randomBetween(60, 95) : randomBetween(5, 25),
        },
        thumbnail,
      };

      // Save to localStorage
      const history = JSON.parse(localStorage.getItem('rg_history') || '[]');
      history.unshift(result);
      localStorage.setItem('rg_history', JSON.stringify(history.slice(0, 50)));

      resolve(result);
    }, delay);
  });
}

export function getHistory(): AnalysisResult[] {
  return JSON.parse(localStorage.getItem('rg_history') || '[]');
}

export function getResultById(id: string): AnalysisResult | undefined {
  return getHistory().find((r) => r.id === id);
}

export function getRiskColor(level: string): string {
  switch (level) {
    case 'low': return 'var(--success)';
    case 'medium': return 'var(--warning)';
    case 'high': return '#f97316';
    case 'critical': return 'var(--danger)';
    default: return 'var(--text-secondary)';
  }
}

export function getRiskLabel(level: string): string {
  switch (level) {
    case 'low': return '安全';
    case 'medium': return '低风险';
    case 'high': return '高风险';
    case 'critical': return '严重风险';
    default: return '未知';
  }
}
