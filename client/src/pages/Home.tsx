/*
 * Home — Dashboard ASCII 2025 (Creative Design)
 * Style: Glassmorphism + Gradient Accents + Asymmetric Layout
 * Palette: Deep navy + purple/pink gradients + neon glow
 * Fonts: Space Grotesk (títulos) + Inter (corpo)
 */

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Briefcase,
  CheckCircle,
  Clock,
  FileText,
  AlertTriangle,
  Award,
  Users,
  BarChart2,
  Activity,
  PieChart as PieChartIcon,
  Layers,
  ChevronRight,
  Building2,
  Zap,
} from 'lucide-react';
import { KPICard } from '@/components/KPICard';
import {
  totalEntradas,
  totalSaidas,
  saldoFinal,
  atrasoTotal,
  dadosAdministrativos,
  projetos,
  categoriaGastos,
  dadosBarras,
  dadosLinha,
  insights,
  statusEJ,
} from '@/lib/dashboardData';

// Custom tooltip para gráficos
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-xl p-3 border border-purple-400/30">
        <p className="text-xs font-semibold text-purple-300 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-gray-400">{entry.name}:</span>
            <span className="font-semibold text-white">
              R$ {Number(entry.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    const total = categoriaGastos.reduce((s, c) => s + c.valor, 0);
    const pct = ((item.value / total) * 100).toFixed(1);
    return (
      <div className="glass-card rounded-xl p-3 border border-purple-400/30">
        <p className="text-xs font-semibold text-white">{item.name}</p>
        <p className="text-xs text-gray-400 mt-1">
          R$ {Number(item.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
        <p className="text-xs text-purple-300 font-medium">{pct}% do total</p>
      </div>
    );
  }
  return null;
};

// Sidebar
function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-56 min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-purple-900/20 border-r border-purple-400/20 fixed left-0 top-0 z-20">
      {/* Logo */}
      <div className="p-6 border-b border-purple-400/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
            <span className="text-white font-bold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>A</span>
          </div>
          <div>
            <p className="text-sm font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>ASCII</p>
            <p className="text-[10px] text-purple-300">Soluções em Tecnologia</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        <p className="text-[10px] font-semibold text-purple-400 uppercase tracking-widest px-3 mb-3">Menu</p>
        {[
          { icon: BarChart2, label: 'Dashboard', active: true }
          /*{ icon: DollarSign, label: 'Financeiro', active: false },
          { icon: Briefcase, label: 'Projetos', active: false },
          { icon: Users, label: 'Membros', active: false },
          { icon: FileText, label: 'Documentos', active: false },*/
        ].map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
              active
                ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 font-medium border border-purple-400/30'
                : 'text-gray-400 hover:text-purple-300 hover:bg-purple-500/10'
            }`}
          >
            <Icon size={16} />
            {label}
            {active && <ChevronRight size={12} className="ml-auto" />}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-purple-400/20">
        <div className="rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/30 p-3">
          <p className="text-xs font-semibold text-purple-300">Período</p>
          <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>2025</p>
          <p className="text-[10px] text-gray-500 mt-1">Jan — Dez</p>
        </div>
      </div>
    </aside>
  );
}

// Header
function Header() {
  return (
    <header className="sticky top-0 z-10 bg-gradient-to-r from-slate-900/80 to-purple-900/40 backdrop-blur-xl border-b border-purple-400/20">
      <div className="accent-line h-1 w-full" />
      <div className="flex items-center justify-between px-6 py-4 lg:ml-56">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Dashboard ASCII 2025
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">Visão administrativa e financeira da EJ</p>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-xs text-purple-300 bg-purple-500/10 rounded-lg px-3 py-2 border border-purple-400/30">
          <Zap size={12} className="text-pink-400" />
          <span>Atualizado em Jan–Dez 2025</span>
        </div>
      </div>
    </header>
  );
}

// KPI Cards
function KPISection() {
  const saldoLiquido = totalEntradas - totalSaidas;
  const margemLiquida = ((saldoLiquido / totalEntradas) * 100).toFixed(1);

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
      <KPICard
        titulo="Faturamento"
        valor={totalEntradas}
        prefixo="R$"
        icone={TrendingUp}
        corIcone="text-emerald-400"
        descricao="Total 2025"
        delay={0}
        isCurrency
      />
      <KPICard
        titulo="Despesas"
        valor={totalSaidas}
        prefixo="R$"
        icone={TrendingDown}
        corIcone="text-red-400"
        descricao="Total 2025"
        delay={80}
        isCurrency
      />
      <KPICard
        titulo="Saldo"
        valor={saldoFinal}
        prefixo="R$"
        icone={DollarSign}
        corIcone="text-cyan-400"
        descricao={`Margem ${margemLiquida}%`}
        delay={160}
        isCurrency
      />
      <KPICard
        titulo="Projetos"
        valor={dadosAdministrativos.totalContratos}
        icone={Briefcase}
        corIcone="text-yellow-400"
        descricao="Contratos"
        delay={240}
      />
      <KPICard
        titulo="Ativos"
        valor={dadosAdministrativos.contratosAtivos}
        icone={Activity}
        corIcone="text-orange-400"
        descricao="Em andamento"
        delay={320}
      />
      <KPICard
        titulo="Concluídos"
        valor={dadosAdministrativos.projetosConcluidos}
        icone={CheckCircle}
        corIcone="text-emerald-400"
        descricao="Entregues"
        delay={400}
      />
    </section>
  );
}

// Seção de gráficos
function ChartsSection() {
  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      {/* Entradas x Saídas */}
      <div className="glass-card rounded-2xl border border-purple-400/20 p-5 fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
        <div className="flex items-center gap-2 mb-5">
          <BarChart2 size={16} className="text-purple-400" />
          <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Entradas × Saídas
          </h3>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={dadosBarras} barGap={4} barCategoryGap="25%">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(168, 85, 247, 0.1)" vertical={false} />
            <XAxis dataKey="mes" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `R$${(v/1000).toFixed(0)}k`} width={48} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(168, 85, 247, 0.05)' }} />
            <Legend wrapperStyle={{ fontSize: '11px', color: '#9ca3af', paddingTop: '12px' }} />
            <Bar dataKey="entradas" name="Entradas" fill="url(#gradEntradas)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="saidas" name="Saídas" fill="url(#gradSaidas)" radius={[6, 6, 0, 0]} />
            <defs>
              <linearGradient id="gradEntradas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0.3} />
              </linearGradient>
              <linearGradient id="gradSaidas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0.3} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Evolução do Caixa */}
      <div className="glass-card rounded-2xl border border-purple-400/20 p-5 fade-in-up" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
        <div className="flex items-center gap-2 mb-5">
          <Activity size={16} className="text-cyan-400" />
          <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Evolução do Caixa
          </h3>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={dadosLinha}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(168, 85, 247, 0.1)" vertical={false} />
            <XAxis dataKey="mes" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `R$${(v/1000).toFixed(1)}k`} width={52} />
            <Tooltip content={<CustomTooltip />} />
            <defs>
              <linearGradient id="caixaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Line type="monotone" dataKey="caixa" name="Caixa" stroke="#06b6d4" strokeWidth={3} dot={{ fill: '#06b6d4', r: 4, strokeWidth: 0 }} activeDot={{ r: 6, fill: '#06b6d4' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Distribuição de Gastos */}
      <div className="glass-card rounded-2xl border border-purple-400/20 p-5 fade-in-up" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
        <div className="flex items-center gap-2 mb-5">
          <PieChartIcon size={16} className="text-pink-400" />
          <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Distribuição dos Gastos
          </h3>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categoriaGastos} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="valor" nameKey="nome">
                {categoriaGastos.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.cor} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip content={<CustomPieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="w-full sm:w-auto space-y-2 shrink-0">
            {categoriaGastos.map((cat) => (
              <div key={cat.nome} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: cat.cor }} />
                <span className="text-[11px] text-gray-400 truncate max-w-[140px]">{cat.nome}</span>
                <span className="text-[11px] font-semibold text-white ml-auto">
                  {((cat.valor / totalSaidas) * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Projetos por Faturamento */}
      <div className="glass-card rounded-2xl border border-purple-400/20 p-5 fade-in-up" style={{ animationDelay: '500ms', animationFillMode: 'both' }}>
        <div className="flex items-center gap-2 mb-4">
          <Layers size={16} className="text-purple-400" />
          <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Projetos Realizados
          </h3>
        </div>
        <div className="space-y-4">
          {projetos.map((proj, i) => {
            const maxValor = Math.max(...projetos.map(p => p.recebido || p.valor));
            return (
              <div key={proj.nome}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 font-medium w-4">{i + 1}.</span>
                    <span className="text-sm font-medium text-white">{proj.nome}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-lg font-medium ${proj.status === 'Concluído' ? 'status-green' : 'status-yellow'}`}>
                    {proj.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-500">Recebido: R$ {(proj.recebido || proj.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  {proj.atraso > 0 && <span className="text-red-400 font-medium">Atraso: R$ {proj.atraso.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>}
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${((proj.recebido || proj.valor) / maxValor) * 100}%`,
                      background: `linear-gradient(90deg, ${['#a855f7', '#ec4899', '#f59e0b', '#06b6d4', '#6b7280'][i % 5]}, ${['#d946ef', '#f43f5e', '#fbbf24', '#22d3ee', '#9ca3af'][i % 5]})`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Painel Administrativo
function AdminPanel() {
  const items = [
    { label: 'Total de Contratos', valor: dadosAdministrativos.totalContratos, icone: FileText, cor: 'text-purple-400' },
    { label: 'Contratos Ativos', valor: dadosAdministrativos.contratosAtivos, icone: Briefcase, cor: 'text-pink-400' },
    { label: 'Projetos Concluídos', valor: dadosAdministrativos.projetosConcluidos, icone: CheckCircle, cor: 'text-emerald-400' },
    { label: 'Projetos Atrasados', valor: dadosAdministrativos.projetosAtrasados, icone: Clock, cor: 'text-red-400' },
    { label: 'Docs. Emitidos', valor: dadosAdministrativos.documentosEmitidos, icone: FileText, cor: 'text-cyan-400' },
    { label: 'Membros Ativos', valor: dadosAdministrativos.membrosAtivos, icone: Users, cor: 'text-yellow-400' },
  ];

  return (
    <div className="glass-card rounded-2xl border border-purple-400/20 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Building2 size={16} className="text-purple-400" />
        <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Painel Administrativo
        </h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        {items.map(({ label, valor, icone: Icon, cor }) => (
          <div key={label} className="rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20 p-3 flex flex-col gap-2 hover:border-purple-400/40 transition-all">
            <div className={`${cor}`}>
              <Icon size={14} />
            </div>
            <p className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{valor}</p>
            <p className="text-[10px] text-gray-500 leading-tight">{label}</p>
          </div>
        ))}
      </div>

      {/* Selo EJ */}
      <div className="rounded-xl border border-emerald-400/30 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 p-3 flex items-center gap-3">
        <Award size={18} className="text-emerald-400 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-emerald-300">Selo EJ — Ativo</p>
          <p className="text-[10px] text-gray-500 mt-0.5">Certificação Brasil Júnior vigente em 2025</p>
        </div>
      </div>
    </div>
  );
}

// Status da EJ
function StatusSection() {
  return (
    <div className="glass-card rounded-2xl border border-purple-400/20 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Activity size={16} className="text-cyan-400" />
        <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Status da EJ
        </h3>
      </div>
      <div className="space-y-3">
        {statusEJ.map((item) => (
          <div key={item.area} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${item.cor === 'green' ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' : item.cor === 'yellow' ? 'bg-amber-400 shadow-lg shadow-amber-400/50' : 'bg-red-400 shadow-lg shadow-red-400/50'}`} />
              <span className="text-sm text-white font-medium">{item.area}</span>
            </div>
            <span className={`text-xs px-2 py-1 rounded-lg font-medium ${
              item.cor === 'green' ? 'status-green' : item.cor === 'yellow' ? 'status-yellow' : 'status-red'
            }`}>
              {item.cor === 'green' ? '● Saudável' : item.cor === 'yellow' ? '● Atenção' : '● Crítico'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Insights
function InsightsSection() {
  const iconMap: Record<string, any> = {
    AlertTriangle,
    TrendingUp,
    CheckCircle,
  };

  const corMap: Record<string, { border: string; bg: string }> = {
    alerta: { border: 'border-amber-400/30', bg: 'bg-amber-500/10' },
    info: { border: 'border-blue-400/30', bg: 'bg-blue-500/10' },
    sucesso: { border: 'border-emerald-400/30', bg: 'bg-emerald-500/10' },
  };

  const iconCorMap: Record<string, string> = {
    alerta: 'text-amber-400',
    info: 'text-blue-400',
    sucesso: 'text-emerald-400',
  };

  return (
    <div className="glass-card rounded-2xl border border-purple-400/20 p-5">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={16} className="text-purple-400" />
        <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Insights da EJ
        </h3>
        <span className="ml-auto text-[10px] text-gray-500 bg-purple-500/10 px-2 py-0.5 rounded-lg border border-purple-400/20">Análise 2025</span>
      </div>
      <div className="space-y-3">
        {insights.map((insight, i) => {
          const Icon = iconMap[insight.icone] || AlertTriangle;
          return (
            <div
              key={i}
              className={`rounded-lg border p-3 flex gap-3 fade-in-up ${corMap[insight.tipo]?.border ?? 'border-purple-400/20'} ${corMap[insight.tipo]?.bg ?? 'bg-purple-500/5'}`}
              style={{ animationDelay: `${i * 100 + 600}ms`, animationFillMode: 'both' }}
            >
              <div className={`shrink-0 mt-0.5 ${iconCorMap[insight.tipo]}`}>
                <Icon size={15} />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">{insight.titulo}</p>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">{insight.descricao}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      {/* Main content */}
      <div className="lg:ml-56">
        <Header />

        <main className="p-4 sm:p-6 space-y-6 pb-12">
          {/* KPI Cards */}
          <KPISection />

          {/* Charts */}
          <ChartsSection />

          {/* Admin + Status */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <AdminPanel />
            </div>
            <div className="space-y-4">
              <StatusSection />
            </div>
          </section>

          {/* Insights */}
          <InsightsSection />

          {/* Footer */}
          <footer className="text-center pt-4 border-t border-purple-400/20">
            <p className="text-xs text-gray-500">
              ASCII Soluções em Tecnologia — Dashboard 2025 · Dados extraídos do Fluxo de Caixa oficial
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
