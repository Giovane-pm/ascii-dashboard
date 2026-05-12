/*
 * Home — Dashboard ASCII 2025 (Simplified & Clean)
 * Style: Minimalist Corporate — Light bg, subtle borders, ample whitespace
 * Layout: Sidebar fixa + grid responsivo
 * Fonts: Space Grotesk (títulos) + Inter (corpo)
 * Palette: White, light gray, blue accent, minimal shadows
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
  AlertCircle,
  CheckCircle2,
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
      <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-md">
        <p className="text-xs font-semibold text-gray-700 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-gray-600">{entry.name}:</span>
            <span className="font-semibold text-gray-900">
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
      <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-md">
        <p className="text-xs font-semibold text-gray-900">{item.name}</p>
        <p className="text-xs text-gray-600 mt-1">
          R$ {Number(item.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
        <p className="text-xs text-blue-600 font-medium">{pct}% do total</p>
      </div>
    );
  }
  return null;
};

// Sidebar
function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-56 min-h-screen bg-white border-r border-gray-200 fixed left-0 top-0 z-20">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>A</span>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>ASCII</p>
            <p className="text-[10px] text-gray-500">Soluções em Tecnologia</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest px-3 mb-3">Menu</p>
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
                ? 'bg-blue-50 text-blue-600 font-medium'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Icon size={16} />
            {label}
            {active && <ChevronRight size={12} className="ml-auto" />}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-xs font-semibold text-gray-900">Período</p>
          <p className="text-2xl font-bold text-blue-600 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>2025</p>
          <p className="text-[10px] text-gray-500 mt-1">Jan — Dez</p>
        </div>
      </div>
    </aside>
  );
}

// Header
function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="accent-line h-1 w-full" />
      <div className="flex items-center justify-between px-6 py-4 lg:ml-56">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Dashboard ASCII 2025
          </h1>
          <p className="text-sm text-gray-600 mt-0.5">Visão administrativa e financeira da EJ</p>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
          <Activity size={12} className="text-emerald-600" />
          <span>Atualizado em Jan–Dez 2025</span>
        </div>
      </div>
    </header>
  );
}

// Alerta de atraso
function AlertaAtraso() {
  if (atrasoTotal <= 0) return null;
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 flex gap-3 lg:ml-56 fade-in-up">
      <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-semibold text-amber-900">Atenção: Recebimento em atraso</p>
        <p className="text-sm text-amber-800 mt-1">
          Projeto <strong>Germinar</strong> com segunda parcela em atraso: <strong>R$ {atrasoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
        </p>
      </div>
    </div>
  );
}

// Status da EJ
function StatusEJ() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <div className="flex items-center gap-2 mb-4">
        <Activity size={16} className="text-blue-600" />
        <h3 className="text-sm font-semibold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Status da EJ
        </h3>
      </div>
      <div className="space-y-3">
        {statusEJ.map((item) => (
          <div key={item.area} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${item.cor === 'green' ? 'bg-emerald-600' : item.cor === 'yellow' ? 'bg-amber-600' : 'bg-red-600'}`} />
              <span className="text-sm text-gray-900 font-medium">{item.area}</span>
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

// Projetos com atraso
function ProjetosAtraso() {
  const comAtraso = projetos.filter(p => p.atraso > 0);
  if (comAtraso.length === 0) return null;

  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Clock size={16} className="text-red-600" />
        <h3 className="text-sm font-semibold text-red-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Projetos com Atraso
        </h3>
      </div>
      <div className="space-y-3">
        {comAtraso.map((proj) => (
          <div key={proj.nome} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">{proj.nome}</p>
              <p className="text-xs text-red-700 mt-0.5">Pendente: R$ {proj.atraso.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-red-200 text-red-700 font-medium">Atraso</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Projetos por faturamento
function ProjetosFaturamento() {
  const maxValor = Math.max(...projetos.map(p => p.recebido));
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <div className="flex items-center gap-2 mb-4">
        <Layers size={16} className="text-blue-600" />
        <h3 className="text-sm font-semibold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Projetos Realizados
        </h3>
      </div>
      <div className="space-y-4">
        {projetos.map((proj, i) => (
          <div key={proj.nome}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-medium w-4">{i + 1}.</span>
                <span className="text-sm font-medium text-gray-900">{proj.nome}</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${proj.status === 'Concluído' ? 'status-green' : 'status-yellow'}`}>
                {proj.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-gray-600">Recebido: R$ {proj.recebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              {proj.atraso > 0 && <span className="text-red-600 font-medium">Atraso: R$ {proj.atraso.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>}
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${(proj.recebido / maxValor) * 100}%`,
                  background: i === 0 ? 'linear-gradient(90deg, #2563eb, #3b82f6)' : i === 1 ? 'linear-gradient(90deg, #f59e0b, #fbbf24)' : i === 2 ? 'linear-gradient(90deg, #8b5cf6, #a78bfa)' : i === 3 ? 'linear-gradient(90deg, #06b6d4, #22d3ee)' : 'linear-gradient(90deg, #6b7280, #9ca3af)',
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
    { label: 'Total de Contratos', valor: dadosAdministrativos.totalContratos, icone: FileText, cor: 'text-blue-600' },
    { label: 'Contratos Ativos', valor: dadosAdministrativos.contratosAtivos, icone: Briefcase, cor: 'text-amber-600' },
    { label: 'Projetos Concluídos', valor: dadosAdministrativos.projetosConcluidos, icone: CheckCircle, cor: 'text-emerald-600' },
    { label: 'Projetos Atrasados', valor: dadosAdministrativos.projetosAtrasados, icone: Clock, cor: 'text-red-600' },
    { label: 'Docs. Emitidos', valor: dadosAdministrativos.documentosEmitidos, icone: FileText, cor: 'text-purple-600' },
    { label: 'Membros Ativos', valor: dadosAdministrativos.membrosAtivos, icone: Users, cor: 'text-cyan-600' },
  ];

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <div className="flex items-center gap-2 mb-4">
        <Building2 size={16} className="text-blue-600" />
        <h3 className="text-sm font-semibold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Painel Administrativo
        </h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        {items.map(({ label, valor, icone: Icon, cor }) => (
          <div key={label} className="rounded-lg bg-gray-50 border border-gray-200 p-3 flex flex-col gap-2">
            <div className={`${cor}`}>
              <Icon size={14} />
            </div>
            <p className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{valor}</p>
            <p className="text-[10px] text-gray-600 leading-tight">{label}</p>
          </div>
        ))}
      </div>

      {/* Selo EJ */}
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 flex items-center gap-3">
        <Award size={18} className="text-emerald-600 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-emerald-900">Selo EJ — Ativo</p>
          <p className="text-[10px] text-emerald-700 mt-0.5">Certificação Brasil Júnior vigente em 2025</p>
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
    CheckCircle: CheckCircle2,
  };

  const corMap: Record<string, { border: string; bg: string }> = {
    alerta: { border: 'border-amber-200', bg: 'bg-amber-50' },
    info: { border: 'border-blue-200', bg: 'bg-blue-50' },
    sucesso: { border: 'border-emerald-200', bg: 'bg-emerald-50' },
  };

  const iconCorMap: Record<string, string> = {
    alerta: 'text-amber-600',
    info: 'text-blue-600',
    sucesso: 'text-emerald-600',
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={16} className="text-blue-600" />
        <h3 className="text-sm font-semibold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Insights da EJ
        </h3>
        <span className="ml-auto text-[10px] text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">Análise 2025</span>
      </div>
      <div className="space-y-3">
        {insights.map((insight, i) => {
          const Icon = iconMap[insight.icone] || AlertTriangle;
          return (
            <div
              key={i}
              className={`rounded-lg border p-3 flex gap-3 fade-in-up ${corMap[insight.tipo]?.border ?? 'border-gray-200'} ${corMap[insight.tipo]?.bg ?? 'bg-gray-50'}`}
              style={{ animationDelay: `${i * 100 + 300}ms`, animationFillMode: 'both' }}
            >
              <div className={`shrink-0 mt-0.5 ${iconCorMap[insight.tipo]}`}>
                <Icon size={15} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900">{insight.titulo}</p>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">{insight.descricao}</p>
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
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      {/* Main content */}
      <div className="lg:ml-56">
        <Header />

        <main className="p-4 sm:p-6 space-y-6 pb-12">

          {/* Alerta de atraso */}
          <AlertaAtraso />

          {/* KPI Cards */}
          <section>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
              <KPICard
                titulo="Faturamento"
                valor={totalEntradas}
                prefixo="R$"
                icone={TrendingUp}
                corIcone="text-blue-600"
                descricao="Total 2025"
                delay={0}
                isCurrency
              />
              <KPICard
                titulo="Despesas"
                valor={totalSaidas}
                prefixo="R$"
                icone={TrendingDown}
                corIcone="text-red-600"
                descricao="Total 2025"
                delay={80}
                isCurrency
              />
              <KPICard
                titulo="Saldo Final"
                valor={saldoFinal}
                prefixo="R$"
                icone={DollarSign}
                corIcone="text-emerald-600"
                descricao={`Margem ${margemLiquida}%`}
                delay={160}
                isCurrency
              />
              <KPICard
                titulo="Projetos"
                valor={dadosAdministrativos.totalContratos}
                icone={Briefcase}
                corIcone="text-purple-600"
                descricao="Contratos"
                delay={240}
              />
              <KPICard
                titulo="Ativos"
                valor={dadosAdministrativos.contratosAtivos}
                icone={Activity}
                corIcone="text-amber-600"
                descricao="Em andamento"
                delay={320}
              />
              <KPICard
                titulo="Concluídos"
                valor={dadosAdministrativos.projetosConcluidos}
                icone={CheckCircle}
                corIcone="text-emerald-600"
                descricao="Entregues"
                delay={400}
              />
            </div>
          </section>

          {/* Gráficos principais */}
          <section className="grid grid-cols-1 xl:grid-cols-2 gap-4">

            {/* Entradas x Saídas por mês */}
            <div className="rounded-lg border border-gray-200 bg-white p-5 fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
              <div className="flex items-center gap-2 mb-5">
                <BarChart2 size={16} className="text-blue-600" />
                <h3 className="text-sm font-semibold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Entradas × Saídas
                </h3>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={dadosBarras} barGap={4} barCategoryGap="25%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis
                    dataKey="mes"
                    tick={{ fill: '#6b7280', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#6b7280', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `R$${(v/1000).toFixed(0)}k`}
                    width={48}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }} />
                  <Legend wrapperStyle={{ fontSize: '11px', color: '#6b7280', paddingTop: '12px' }} />
                  <Bar dataKey="entradas" name="Entradas" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="saidas" name="Saídas" fill="#dc2626" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Evolução do caixa */}
            <div className="rounded-lg border border-gray-200 bg-white p-5 fade-in-up" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
              <div className="flex items-center gap-2 mb-5">
                <Activity size={16} className="text-emerald-600" />
                <h3 className="text-sm font-semibold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Evolução do Caixa
                </h3>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={dadosLinha}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis
                    dataKey="mes"
                    tick={{ fill: '#6b7280', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#6b7280', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `R$${(v/1000).toFixed(1)}k`}
                    width={52}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <defs>
                    <linearGradient id="caixaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Line
                    type="monotone"
                    dataKey="caixa"
                    name="Caixa"
                    stroke="#059669"
                    strokeWidth={2.5}
                    dot={{ fill: '#059669', r: 3, strokeWidth: 0 }}
                    activeDot={{ r: 5, fill: '#059669', strokeWidth: 2, stroke: '#f3f4f6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Distribuição de gastos */}
            <div className="rounded-lg border border-gray-200 bg-white p-5 fade-in-up" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
              <div className="flex items-center gap-2 mb-5">
                <PieChartIcon size={16} className="text-purple-600" />
                <h3 className="text-sm font-semibold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
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
                      <span className="text-[11px] text-gray-600 truncate max-w-[140px]">{cat.nome}</span>
                      <span className="text-[11px] font-semibold text-gray-900 ml-auto">
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

          {/* Área administrativa + Status + Atrasos */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <AreaAdministrativa />
            </div>
            <div className="space-y-4">
              <StatusEJ />
              <ProjetosAtraso />
            </div>
          </section>

          {/* Insights */}
          <section>
            <InsightsEJ />
          </section>

          {/* Footer */}
          <footer className="text-center pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-600">
              ASCII Soluções em Tecnologia — Dashboard 2025 · Dados extraídos do Fluxo de Caixa oficial
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
