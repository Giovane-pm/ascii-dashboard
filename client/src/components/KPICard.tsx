/*
 * KPICard — Dashboard ASCII 2025
 * Style: Corporate Tech Minimalism (Dark Mode)
 * Card elevado com hover animation e count-up effect
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
      className="kpi-card fade-in-up rounded-xl border border-white/8 bg-card p-5 flex flex-col gap-3"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{titulo}</span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 ${corIcone}`}>
          <Icon size={16} />
        </div>
      </div>

      <div className="flex items-end gap-1">
        {prefixo && <span className="text-sm text-muted-foreground mb-1">{prefixo}</span>}
        <span className="text-2xl font-bold text-foreground font-[Space_Grotesk]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {displayValue}
        </span>
        {sufixo && <span className="text-sm text-muted-foreground mb-1">{sufixo}</span>}
      </div>

      {(variacao !== undefined || descricao) && (
        <div className="flex items-center gap-2">
          {variacao !== undefined && (
            <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${variacao >= 0 ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'}`}>
              {variacao >= 0 ? '+' : ''}{variacao}%
            </span>
          )}
          {descricao && <span className="text-xs text-muted-foreground">{descricao}</span>}
        </div>
      )}
    </div>
  );
}
