/*
 * KPICard — Dashboard ASCII 2025 (Creative Design)
 * Style: Glassmorphism + Gradient borders + Neon glow
 */
import { useEffect, useRef, useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  titulo: string;
  valor: string | number;
  prefixo?: string;
  sufixo?: string;
  icone: LucideIcon;
  corIcone?: string;
  variacao?: number;
  descricao?: string;
  delay?: number;
  isCurrency?: boolean;
}

function useCountUp(target: number, duration: number = 1200, delay: number = 0) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    const timer = setTimeout(() => {
      startedRef.current = true;
      const start = Date.now();
      const tick = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target * 100) / 100);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timer);
  }, [target, duration, delay]);

  return count;
}

export function KPICard({
  titulo,
  valor,
  prefixo = '',
  sufixo = '',
  icone: Icon,
  corIcone = 'text-blue-400',
  variacao,
  descricao,
  delay = 0,
  isCurrency = false,
}: KPICardProps) {
  const numericValue = typeof valor === 'number' ? valor : parseFloat(String(valor).replace(/[^0-9.-]/g, ''));
  const isNumeric = !isNaN(numericValue);
  const animatedValue = useCountUp(isNumeric ? numericValue : 0, 1200, delay);

  const formatValue = (v: number) => {
    if (isCurrency) {
      return v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return Math.round(v).toString();
  };

  const displayValue = isNumeric ? formatValue(animatedValue) : valor;

  return (
    <div
      className="kpi-card fade-in-up glass-card rounded-2xl p-5 flex flex-col gap-3 group"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{titulo}</span>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30 ${corIcone} group-hover:scale-110 transition-transform`}>
          <Icon size={18} />
        </div>
      </div>

      <div className="flex items-end gap-1">
        {prefixo && <span className="text-sm text-gray-500 mb-1">{prefixo}</span>}
        <span className="text-3xl font-bold text-white neon-glow" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {displayValue}
        </span>
        {sufixo && <span className="text-sm text-gray-500 mb-1">{sufixo}</span>}
      </div>

      {(variacao !== undefined || descricao) && (
        <div className="flex items-center gap-2 text-xs">
          {variacao !== undefined && (
            <span className={`font-medium px-2 py-1 rounded-lg ${variacao >= 0 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50' : 'bg-red-500/20 text-red-300 border border-red-400/50'}`}>
              {variacao >= 0 ? '↑' : '↓'} {Math.abs(variacao)}%
            </span>
          )}
          {descricao && <span className="text-gray-500">{descricao}</span>}
        </div>
      )}
    </div>
  );
}
