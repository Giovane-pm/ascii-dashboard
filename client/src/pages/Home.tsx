/*
 * Home — Dashboard ASCII 2025
 * Style: Corporate Tech Minimalism (Dark Mode)
 * Layout: Sidebar fixa + área de conteúdo com grid responsivo
 * Fonts: Space Grotesk (títulos) + Inter (corpo)
 * Palette: #0A0F1E bg, #0F1729 cards, blue-500 primary, emerald-500 success
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
} from 'lucide-react';
import { KPICard } from '@/components/KPICard';
import {
  totalEntradas,
  totalSaidas,
  saldoFinal,
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
      <div className="rounded-lg border border-white/10 bg-card/95 backdrop-blur-sm p-3 shadow-xl">
        <p className="text-xs font-semibold text-muted-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-semibold text-foreground">
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
      <div className="rounded-lg border border-white/10 bg-card/95 backdrop-blur-sm p-3 shadow-xl">
        <p className="text-xs font-semibold text-foreground">{item.name}</p>
        <p className="text-xs text-muted-foreground mt-1">
          R$ {Number(item.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
        <p className="text-xs text-blue-400 font-medium">{pct}% do total</p>
      </div>
    );
  }
  return null;
};

// Sidebar
function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-60 min-h-screen bg-sidebar border-r border-sidebar-border fixed left-0 top-0 z-20">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
            <span className="text-white font-bold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>A</span>
          </div>
          <div>
            <p className="text-sm font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>ASCII</p>
            <p className="text-[10px] text-muted-foreground">Soluções em Tecnologia</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-3 mb-3">Visão Geral</p>
        {[
          { icon: BarChart2, label: 'Dashboard', active: true },
          { icon: DollarSign, label: 'Financeiro', active: false },
          { icon: Briefcase, label: 'Projetos', active: false },
          { icon: Users, label: 'Membros', active: false },
          { icon: FileText, label: 'Documentos', active: false },
        ].map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
              active
                ? 'bg-blue-600/15 text-blue-400 font-medium'
                : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
            }`}
          >
            <Icon size={16} />
            {label}
            {active && <ChevronRight size={12} className="ml-auto" />}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="rounded-lg bg-white/5 p-3">
          <p className="text-xs font-semibold text-foreground">Ano de referência</p>
          <p className="text-2xl font-bold text-blue-400 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>2025</p>
          <p className="text-[10px] text-muted-foreground mt-1">Dados até Dez/2025</p>
        </div>
      </div>
    </aside>
  );
}

// Header
function Header() {
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="accent-line h-0.5 w-full" />
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Dashboard Geral ASCII 2025
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">Visão administrativa e financeira da EJ</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground bg-white/5 rounded-lg px-3 py-2 border border-white/8">
            <Activity size={12} className="text-emerald-400" />
            <span>Atualizado em Jan–Dez 2025</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
            <Building2 size={14} className="text-blue-400" />
          </div>
        </div>
      </div>
    </header>
  );
}

// Status da EJ
function StatusEJ() {
  return (
    <div className="rounded-xl border border-white/8 bg-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Activity size={16} className="text-blue-400" />
        <h3 className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Status da EJ
        </h3>
      </div>
      <div className="space-y-3">
        {statusEJ.map((item) => (
          <div key={item.area} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${item.cor === 'green' ? 'bg-emerald-400' : item.cor === 'yellow' ? 'bg-amber-400' : 'bg-red-400'} shadow-lg ${item.cor === 'green' ? 'shadow-emerald-400/50' : item.cor === 'yellow' ? 'shadow-amber-400/50' : 'shadow-red-400/50'}`} />
              <span className="text-sm text-foreground font-medium">{item.area}</span>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
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

// Projetos por faturamento
function ProjetosFaturamento() {
  const maxValor = Math.max(...projetos.map(p => p.valor));
  return (
    <div className="rounded-xl border border-white/8 bg-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Layers size={16} className="text-blue-400" />
        <h3 className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Projetos por Faturamento
        </h3>
      </div>
      <div className="space-y-3">
        {projetos.map((proj, i) => (
          <div key={proj.nome} className="group">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-4">{i + 1}.</span>
                <span className="text-sm font-medium text-foreground">{proj.nome}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${proj.status === 'Concluído' ? 'status-green' : 'status-yellow'}`}>
                  {proj.status}
                </span>
                <span className="text-sm font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  R$ {proj.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${(proj.valor / maxValor) * 100}%`,
                  background: i === 0 ? 'linear-gradient(90deg, #3B82F6, #60A5FA)' : i === 1 ? 'linear-gradient(90deg, #10B981, #34D399)' : i === 2 ? 'linear-gradient(90deg, #8B5CF6, #A78BFA)' : i === 3 ? 'linear-gradient(90deg, #F59E0B, #FCD34D)' : 'linear-gradient(90deg, #6B7280, #9CA3AF)',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Área administrativa
function AreaAdministrativa() {
  const items = [
    { label: 'Total de Contratos', valor: dadosAdministrativos.totalContratos, icone: FileText, cor: 'text-blue-400' },
    { label: 'Contratos Ativos', valor: dadosAdministrativos.contratosAtivos, icone: Briefcase, cor: 'text-amber-400' },
    { label: 'Projetos Concluídos', valor: dadosAdministrativos.projetosConcluidos, icone: CheckCircle, cor: 'text-emerald-400' },
    { label: 'Projetos Atrasados', valor: dadosAdministrativos.projetosAtrasados, icone: Clock, cor: 'text-red-400' },
    { label: 'Docs. Emitidos', valor: dadosAdministrativos.documentosEmitidos, icone: FileText, cor: 'text-purple-400' },
    { label: 'Membros Ativos', valor: dadosAdministrativos.membrosAtivos, icone: Users, cor: 'text-cyan-400' },
  ];

  return (
    <div className="rounded-xl border border-white/8 bg-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Building2 size={16} className="text-blue-400" />
        <h3 className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Painel Administrativo
        </h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {items.map(({ label, valor, icone: Icon, cor }) => (
          <div key={label} className="rounded-lg bg-white/4 border border-white/6 p-3 flex flex-col gap-2">
            <div className={`${cor}`}>
              <Icon size={14} />
            </div>
            <p className="text-xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{valor}</p>
            <p className="text-[10px] text-muted-foreground leading-tight">{label}</p>
          </div>
        ))}
      </div>

      {/* Selo EJ */}
      <div className="mt-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 flex items-center gap-3">
        <Award size={18} className="text-emerald-400 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-emerald-400">Selo EJ — Ativo</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Certificação Brasil Júnior vigente em 2025</p>
        </div>
      </div>
    </div>
  );
}

// Insights estratégicos
function InsightsEJ() {
  const iconMap: Record<string, any> = {
    AlertTriangle,
    TrendingUp,
    CheckCircle,
  };

  const corMap: Record<string, { border: string; bg: string }> = {
    alerta: { border: 'border-amber-500/20', bg: 'bg-amber-500/5' },
    info: { border: 'border-blue-500/20', bg: 'bg-blue-500/5' },
    sucesso: { border: 'border-emerald-500/20', bg: 'bg-emerald-500/5' },
  };

  const iconCorMap: Record<string, string> = {
    alerta: 'text-amber-400',
    info: 'text-blue-400',
    sucesso: 'text-emerald-400',
  };

  return (
    <div className="rounded-xl border border-white/8 bg-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={16} className="text-blue-400" />
        <h3 className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Insights da EJ
        </h3>
        <span className="ml-auto text-[10px] text-muted-foreground bg-white/5 px-2 py-0.5 rounded-full">Análise 2025</span>
      </div>
      <div className="space-y-3">
        {insights.map((insight, i) => {
          const Icon = iconMap[insight.icone] || AlertTriangle;
          return (
            <div
              key={i}
              className={`rounded-lg border p-3 flex gap-3 fade-in-up ${corMap[insight.tipo]?.border ?? 'border-white/8'} ${corMap[insight.tipo]?.bg ?? 'bg-white/3'}`}
              style={{ animationDelay: `${i * 100 + 600}ms`, animationFillMode: 'both' }}
            >
              <div className={`shrink-0 mt-0.5 ${iconCorMap[insight.tipo]}`}>
                <Icon size={15} />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">{insight.titulo}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{insight.descricao}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Home() {
  const saldoLiquido = totalEntradas - totalSaidas;
  const margemLiquida = ((saldoLiquido / totalEntradas) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      {/* Main content — offset for sidebar */}
      <div className="lg:ml-60">
        <Header />

        <main className="p-4 sm:p-6 space-y-6 pb-12">

          {/* KPI Cards */}
          <section>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
              <KPICard
                titulo="Faturamento Total"
                valor={totalEntradas}
                prefixo="R$"
                icone={TrendingUp}
                corIcone="text-blue-400"
                descricao="Entradas 2025"
                delay={0}
                isCurrency
              />
              <KPICard
                titulo="Despesas Totais"
                valor={totalSaidas}
                prefixo="R$"
                icone={TrendingDown}
                corIcone="text-red-400"
                descricao="Saídas 2025"
                delay={80}
                isCurrency
              />
              <KPICard
                titulo="Saldo Final"
                valor={saldoFinal}
                prefixo="R$"
                icone={DollarSign}
                corIcone="text-emerald-400"
                descricao={`Margem ${margemLiquida}%`}
                delay={160}
                isCurrency
              />
              <KPICard
                titulo="Total de Projetos"
                valor={dadosAdministrativos.totalContratos}
                icone={Briefcase}
                corIcone="text-purple-400"
                descricao="Contratos 2025"
                delay={240}
              />
              <KPICard
                titulo="Contratos Ativos"
                valor={dadosAdministrativos.contratosAtivos}
                icone={Activity}
                corIcone="text-amber-400"
                descricao="Em andamento"
                delay={320}
              />
              <KPICard
                titulo="Concluídos"
                valor={dadosAdministrativos.projetosConcluidos}
                icone={CheckCircle}
                corIcone="text-emerald-400"
                descricao="Projetos entregues"
                delay={400}
              />
            </div>
          </section>

          {/* Gráficos principais */}
          <section className="grid grid-cols-1 xl:grid-cols-2 gap-4">

            {/* Entradas x Saídas por mês */}
            <div className="rounded-xl border border-white/8 bg-card p-5 fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
              <div className="flex items-center gap-2 mb-5">
                <BarChart2 size={16} className="text-blue-400" />
                <h3 className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Entradas × Saídas por Mês
                </h3>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={dadosBarras} barGap={4} barCategoryGap="25%">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis
                    dataKey="mes"
                    tick={{ fill: '#64748B', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#64748B', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `R$${(v/1000).toFixed(0)}k`}
                    width={48}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                  <Legend
                    wrapperStyle={{ fontSize: '11px', color: '#64748B', paddingTop: '12px' }}
                    formatter={(value) => value === 'entradas' ? 'Entradas' : 'Saídas'}
                  />
                  <Bar dataKey="entradas" name="entradas" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="saidas" name="saidas" fill="#EF4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Evolução do caixa */}
            <div className="rounded-xl border border-white/8 bg-card p-5 fade-in-up" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
              <div className="flex items-center gap-2 mb-5">
                <Activity size={16} className="text-emerald-400" />
                <h3 className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Evolução do Caixa
                </h3>
                <span className="ml-auto text-[10px] text-muted-foreground">Caixa inicial: R$ 814,06</span>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={dadosLinha}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis
                    dataKey="mes"
                    tick={{ fill: '#64748B', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#64748B', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `R$${(v/1000).toFixed(1)}k`}
                    width={52}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <defs>
                    <linearGradient id="caixaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Line
                    type="monotone"
                    dataKey="caixa"
                    name="Caixa"
                    stroke="#10B981"
                    strokeWidth={2.5}
                    dot={{ fill: '#10B981', r: 3, strokeWidth: 0 }}
                    activeDot={{ r: 5, fill: '#10B981', strokeWidth: 2, stroke: '#0A0F1E' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Distribuição de gastos */}
            <div className="rounded-xl border border-white/8 bg-card p-5 fade-in-up" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
              <div className="flex items-center gap-2 mb-5">
                <PieChartIcon size={16} className="text-purple-400" />
                <h3 className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Distribuição dos Gastos
                </h3>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={categoriaGastos}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={3}
                      dataKey="valor"
                      nameKey="nome"
                    >
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
                      <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: cat.cor }} />
                      <span className="text-[11px] text-muted-foreground truncate max-w-[140px]">{cat.nome}</span>
                      <span className="text-[11px] font-semibold text-foreground ml-auto">
                        {((cat.valor / totalSaidas) * 100).toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Projetos por faturamento */}
            <ProjetosFaturamento />
          </section>

          {/* Área administrativa + Status + Insights */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <AreaAdministrativa />
            </div>
            <div className="space-y-4">
              <StatusEJ />
            </div>
          </section>

          {/* Insights */}
          <section>
            <InsightsEJ />
          </section>

          {/* Footer */}
          <footer className="text-center pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              ASCII Soluções em Tecnologia — Dashboard 2025 · Dados extraídos do Fluxo de Caixa oficial
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
