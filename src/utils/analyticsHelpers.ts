interface MetricChange {
  value: string;
  isPositive: boolean;
  isNegative: boolean;
}

export const getMetricChange = (current: number, previous: number): MetricChange => {
  const change = ((current - previous) / previous) * 100;
  return {
    value: Math.abs(change).toFixed(1),
    isPositive: change > 0,
    isNegative: change < 0
  };
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

export const formatPercentage = (num: number): string => {
  return `${num.toFixed(1)}%`;
};

export const formatDuration = (hours: number): string => {
  if (hours < 1) {
    return `${Math.round(hours * 60)}m`;
  }
  return `${hours.toFixed(1)}h`;
};

export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    'Online': 'bg-green-500',
    'Away': 'bg-yellow-500',
    'Busy': 'bg-red-500',
    'Offline': 'bg-gray-500'
  };
  return colors[status] || 'bg-gray-500';
};

export const exportToCSV = (data: any[], filename: string): void => {
  if (!data.length) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => row[header]).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.csv`;
  link.click();
  window.URL.revokeObjectURL(url);
};