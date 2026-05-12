// ASCII Dashboard 2025 — Dados reais extraídos da planilha de Fluxo de Caixa
// Fonte: Fluxodecaixade2025.xlsx

export const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

export const entradasPorMes = [100.00, 1276.09, 1680.00, 40.01, 204.01, 1980.00, 990.00, 990.01, 990.02, 1045.02, 720.02, 990.01];

export const saidasPorMes = [314.00, 715.25, 1163.55, 500.42, 441.05, 1997.87, 857.55, 165.99, 921.59, 823.99, 1234.12, 55.99];

export const caixaAcumulado = [600.06, 1160.90, 1677.35, 1216.94, 979.90, 962.03, 1094.48, 1918.50, 1986.93, 2207.96, 1693.86, 2627.88];

// Corrigido: Germinar tem apenas 1.800 recebido (não 1.600)
export const totalEntradas = 11005.19 - 1600 + 1800; // 11.205,19
export const totalSaidas = 9191.37;
export const saldoFinal = 2627.88 + 200; // 2.827,88
export const caixaInicial = 814.06;
export const atrasoTotal = 1800.00; // Germinar segunda parcela

// Projetos com maior faturamento
export const projetos = [
  { nome: 'IntegAtiva', valor: 6930.00, status: 'Concluído', cliente: 'Heliane', recebido: 6930.00, atraso: 0 },
  { nome: 'Germinar', valor: 3600.00, status: 'Em andamento', cliente: 'Germinar', recebido: 1800.00, atraso: 1800.00 },
  { nome: 'Trupe dos Tuões', valor: 1200.00, status: 'Concluído', cliente: 'Estrupicios Produções', recebido: 1200.00, atraso: 0 },
  { nome: 'GeoPhotos', valor: 495.90, status: 'Concluído', cliente: 'GeoPhotos', recebido: 495.90, atraso: 0 },
  { nome: 'Wattworks', valor: 55.00, status: 'Em andamento', cliente: 'SDM Soluções', recebido: 55.00, atraso: 0 },
];

// Distribuição de gastos por categoria
export const categoriaGastos = [
  { nome: 'Eventos e Confraternizações', valor: 2875.98, cor: '#3B82F6' },
  { nome: 'Contabilidade e Jurídico', valor: 1804.00, cor: '#10B981' },
  { nome: 'Federação e Núcleo', valor: 1525.87, cor: '#F59E0B' },
  { nome: 'Marketing e Identidade', valor: 1361.10, cor: '#8B5CF6' },
  { nome: 'Impostos e Tributos', valor: 746.27, cor: '#EF4444' },
  { nome: 'Infraestrutura e Salinha', valor: 647.35, cor: '#06B6D4' },
  { nome: 'Outros', valor: 230.80, cor: '#6B7280' },
];

// Dados administrativos
export const dadosAdministrativos = {
  totalContratos: 5,
  contratosAtivos: 1,
  projetosConcluidos: 4,
  projetosAtrasados: 1,
  documentosEmitidos: 12,
  seloEJ: 'Ativo',
  membrosAtivos: 14,
  totalArrecadadoMembros: 405.00,
};

// Insights estratégicos
export const insights = [
  {
    tipo: 'alerta',
    titulo: 'Concentração de receita',
    descricao: 'Mais de 63% do faturamento total veio de um único projeto (IntegAtiva), criando dependência de poucos clientes.',
    icone: 'AlertTriangle',
  },
  {
    tipo: 'info',
    titulo: 'Gastos com eventos e confraternizações',
    descricao: 'Eventos e confraternizações representaram o maior bloco de despesas (31%), refletindo a cultura ativa da EJ.',
    icone: 'TrendingUp',
  },
  {
    tipo: 'sucesso',
    titulo: 'Caixa crescente no segundo semestre',
    descricao: 'O saldo do caixa cresceu consistentemente de julho a outubro, atingindo o pico em R$ 2.207,96.',
    icone: 'CheckCircle',
  },
  {
    tipo: 'alerta',
    titulo: 'Queda no caixa em novembro',
    descricao: 'Novembro registrou queda de R$ 514,10 no caixa, impactada por gastos com camisetas (R$ 1.196,00) e ingresso RR.',
    icone: 'AlertTriangle',
  },
];

// Status geral da EJ
export const statusEJ = [
  { area: 'Financeiro', status: 'saudavel', descricao: 'Saldo positivo e crescente', cor: 'green' },
  { area: 'Projetos', status: 'atencao', descricao: '1 projeto com atraso identificado', cor: 'yellow' },
  { area: 'Administrativo', status: 'saudavel', descricao: 'Documentação regularizada', cor: 'green' },
];

// Dados para gráfico de barras mensal (corrigido com Germinar 1.800 em Mar)
const entradasCorrigidas = [...entradasPorMes];
entradasCorrigidas[2] = entradasCorrigidas[2] - 1600 + 1800; // Mar: -1600 (Germinar errado) +1800 (correto)
export const dadosBarras = meses.map((mes, i) => ({
  mes,
  entradas: entradasCorrigidas[i],
  saidas: saidasPorMes[i],
  saldo: entradasCorrigidas[i] - saidasPorMes[i],
}));

// Caixa acumulado corrigido
const caixaAcumuladoCorrigido: number[] = [];
let saldo = caixaInicial;
for (let i = 0; i < 12; i++) {
  saldo = saldo + entradasCorrigidas[i] - saidasPorMes[i];
  caixaAcumuladoCorrigido.push(Math.round(saldo * 100) / 100);
}
export const dadosLinhaCorrigido = meses.map((mes, i) => ({
  mes,
  caixa: caixaAcumuladoCorrigido[i],
}));

// Dados para gráfico de linha (evolução do caixa) - usar versão corrigida
// Mantém compatibilidade com código existente
export const dadosLinha = dadosLinhaCorrigido;
