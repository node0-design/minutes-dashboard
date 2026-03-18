import { useEffect, useState } from 'react';

const API_BASE = 'https://jingle-api.minutesnetwork.io/api/v1';

export interface LiveStats {
  liveCalls: number;
  usersOnline: number;
  timestamp?: string;
}

export interface DailyStats {
  minutes: number;
  fees: number;
  calls: number;
  timestamp?: string;
}

export interface QualityMetrics {
  asr: number;
  ner: number;
  pdd: number;
  timestamp?: string;
}

export interface CountryData {
  country: string;
  calls: number;
  minutes: number;
  users: number;
  coordinates?: [number, number];
}

export interface TimeSeriesData {
  timestamp: string;
  calls: number;
  minutes: number;
  users: number;
}

export interface CDRRecord {
  id: string;
  from: string;
  to: string;
  duration: number;
  timestamp: string;
  status: string;
}

// Hook for live stats (poll every 10s)
export function useLiveStats() {
  const [data, setData] = useState<LiveStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE}/stats/live`);
        if (!response.ok) throw new Error('Failed to fetch live stats');
        const result = await response.json();
        setData({
          ...result,
          timestamp: new Date().toISOString(),
        });
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Poll every 10s

    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
}

// Hook for daily stats (poll every 30s)
export function useDailyStats() {
  const [data, setData] = useState<DailyStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE}/stats/daily`);
        if (!response.ok) throw new Error('Failed to fetch daily stats');
        const result = await response.json();
        setData({
          ...result,
          timestamp: new Date().toISOString(),
        });
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Poll every 30s

    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
}

// Hook for quality metrics (poll every 30s)
export function useQualityMetrics() {
  const [data, setData] = useState<QualityMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE}/stats/quality`);
        if (!response.ok) throw new Error('Failed to fetch quality metrics');
        const result = await response.json();
        setData({
          ...result,
          timestamp: new Date().toISOString(),
        });
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Poll every 30s

    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
}

// Hook for countries data (poll every 60s)
export function useCountriesData() {
  const [data, setData] = useState<CountryData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE}/countries`);
        if (!response.ok) throw new Error('Failed to fetch countries data');
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Poll every 60s

    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
}

// Hook for time series data (poll every 60s)
export function useTimeSeriesData(interval: 'hourly' | 'daily' = 'hourly') {
  const [data, setData] = useState<TimeSeriesData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const now = new Date();
        const from = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
        const to = now.toISOString();

        const response = await fetch(
          `${API_BASE}/timeseries?interval=${interval}&from=${from}&to=${to}`
        );
        if (!response.ok) throw new Error('Failed to fetch time series data');
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const pollInterval = setInterval(fetchData, 60000); // Poll every 60s

    return () => clearInterval(pollInterval);
  }, [interval]);

  return { data, loading, error };
}

// Hook for CDR records (poll every 15s)
export function useCDRRecords(limit: number = 50) {
  const [data, setData] = useState<CDRRecord[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE}/cdr?limit=${limit}`);
        if (!response.ok) throw new Error('Failed to fetch CDR records');
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 15000); // Poll every 15s

    return () => clearInterval(interval);
  }, [limit]);

  return { data, loading, error };
}
