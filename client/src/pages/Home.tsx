import { useLiveStats, useDailyStats, useQualityMetrics, useCountriesData, useTimeSeriesData, useCDRRecords } from '@/hooks/useJingleAPI';
import MetricCard from '@/components/MetricCard';
import { Phone, Users, Clock, DollarSign, Globe, BarChart3, Activity } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card } from '@/components/ui/card';

/**
 * Jingle Dashboard - Real-time telecom analytics
 * Design: Dark theme with magenta accents, modern SaaS aesthetic
 * Typography: Sora for headers, Inter for body
 * Color: #0f0f1e background, #ff1493 magenta accent, #00d4ff cyan secondary
 */

export default function Home() {
  const liveStats = useLiveStats();
  const dailyStats = useDailyStats();
  const qualityMetrics = useQualityMetrics();
  const countriesData = useCountriesData();
  const timeSeriesData = useTimeSeriesData('hourly');
  const cdrRecords = useCDRRecords(10);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Format percentage
  const formatPercent = (value: number) => {
    return (value * 100).toFixed(2);
  };

  // Top 5 countries for pie chart
  const topCountries = countriesData.data
    ? countriesData.data.sort((a, b) => b.calls - a.calls).slice(0, 5)
    : [];

  const COLORS = ['#ff1493', '#00d4ff', '#a78bfa', '#6366f1', '#4f46e5'];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-cyan-500 flex items-center justify-center">
                <Activity className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Jingle Dashboard</h1>
                <p className="text-sm text-muted-foreground">Real-time Network Analytics</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Last updated</p>
              <p className="text-sm font-medium">
                {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        {/* KPI Cards - Top Section */}
        <section className="mb-8 animate-fadeInUp">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BarChart3 size={24} className="text-accent" />
            Live Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Active Calls"
              value={liveStats.data?.liveCalls ?? 0}
              unit="calls"
              loading={liveStats.loading}
              icon={<Phone size={20} />}
              className="animate-fadeInUp"
            />
            <MetricCard
              title="Users Online"
              value={liveStats.data?.usersOnline ?? 0}
              unit="users"
              loading={liveStats.loading}
              icon={<Users size={20} />}
              className="animate-fadeInUp"
              style={{ animationDelay: '0.1s' }}
            />
            <MetricCard
              title="Daily Minutes"
              value={dailyStats.data?.minutes ?? 0}
              unit="min"
              loading={dailyStats.loading}
              icon={<Clock size={20} />}
              className="animate-fadeInUp"
              style={{ animationDelay: '0.2s' }}
            />
            <MetricCard
              title="Service Fees"
              value={formatCurrency(dailyStats.data?.fees ?? 0)}
              loading={dailyStats.loading}
              icon={<DollarSign size={20} />}
              className="animate-fadeInUp"
              style={{ animationDelay: '0.3s' }}
            />
          </div>
        </section>

        {/* Quality Metrics */}
        <section className="mb-8 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Activity size={24} className="text-accent" />
            Quality Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-card border border-border p-6">
              <p className="metric-label mb-2">ASR (Answer-Seizure Ratio)</p>
              <p className="metric-value text-accent">
                {qualityMetrics.loading ? '—' : formatPercent(qualityMetrics.data?.asr ?? 0)}%
              </p>
              <p className="text-xs text-muted-foreground mt-2">Call completion rate</p>
            </Card>
            <Card className="bg-card border border-border p-6">
              <p className="metric-label mb-2">NER (Network Effectiveness)</p>
              <p className="metric-value text-cyan-400">
                {qualityMetrics.loading ? '—' : formatPercent(qualityMetrics.data?.ner ?? 0)}%
              </p>
              <p className="text-xs text-muted-foreground mt-2">Network efficiency</p>
            </Card>
            <Card className="bg-card border border-border p-6">
              <p className="metric-label mb-2">PDD (Post-Dial Delay)</p>
              <p className="metric-value text-purple-400">
                {qualityMetrics.loading ? '—' : qualityMetrics.data?.pdd ?? 0}ms
              </p>
              <p className="text-xs text-muted-foreground mt-2">Connection latency</p>
            </Card>
          </div>
        </section>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Time Series Chart */}
          <div className="lg:col-span-2 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
            <Card className="bg-card border border-border p-6">
              <h3 className="text-lg font-semibold mb-4">24-Hour Trends</h3>
              {timeSeriesData.loading ? (
                <div className="h-80 flex items-center justify-center text-muted-foreground">
                  Loading chart...
                </div>
              ) : timeSeriesData.data && timeSeriesData.data.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={timeSeriesData.data}>
                    <defs>
                      <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ff1493" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#ff1493" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2d2d44" />
                    <XAxis
                      dataKey="timestamp"
                      stroke="#9ca3af"
                      style={{ fontSize: '12px' }}
                      tickFormatter={(value) => new Date(value).getHours() + ':00'}
                    />
                    <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1a1a2e',
                        border: '1px solid #2d2d44',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ color: '#e5e7eb' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="calls"
                      stroke="#ff1493"
                      fillOpacity={1}
                      fill="url(#colorCalls)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-80 flex items-center justify-center text-muted-foreground">
                  No data available
                </div>
              )}
            </Card>
          </div>

          {/* Top Countries Pie Chart */}
          <div className="animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <Card className="bg-card border border-border p-6">
              <h3 className="text-lg font-semibold mb-4">Top Countries</h3>
              {countriesData.loading ? (
                <div className="h-80 flex items-center justify-center text-muted-foreground">
                  Loading...
                </div>
              ) : topCountries.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={topCountries}
                      dataKey="calls"
                      nameKey="country"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ country, percent }) =>
                        `${country} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {topCountries.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1a1a2e',
                        border: '1px solid #2d2d44',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ color: '#e5e7eb' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-80 flex items-center justify-center text-muted-foreground">
                  No data available
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Recent Calls Table */}
        <section className="animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Phone size={24} className="text-accent" />
            Recent Calls
          </h2>
          <Card className="bg-card border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-muted-foreground">From</th>
                    <th className="px-6 py-3 text-left font-semibold text-muted-foreground">To</th>
                    <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Duration</th>
                    <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Time</th>
                    <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {cdrRecords.loading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                        Loading records...
                      </td>
                    </tr>
                  ) : cdrRecords.data && cdrRecords.data.length > 0 ? (
                    cdrRecords.data.map((record, idx) => (
                      <tr
                        key={record.id || idx}
                        className="border-b border-border hover:bg-secondary/30 transition-colors"
                      >
                        <td className="px-6 py-4 font-mono text-xs">{record.from}</td>
                        <td className="px-6 py-4 font-mono text-xs">{record.to}</td>
                        <td className="px-6 py-4">{record.duration}s</td>
                        <td className="px-6 py-4 text-xs text-muted-foreground">
                          {new Date(record.timestamp).toLocaleTimeString()}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              record.status === 'completed'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}
                          >
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                        No records available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-12">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          <p>Jingle Dashboard • Powered by Minutes Network</p>
          <p className="mt-2 text-xs">Data updates automatically every 10-60 seconds</p>
        </div>
      </footer>
    </div>
  );
}
