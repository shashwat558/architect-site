// Usage in your app - add to layout or _app.tsx
// Import this file and call initWebVitals() on app initialization

import { type CLS, type FCP, type FID, type LCP, type TTFB, getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals';

type Metric = LCP | FCP | FID | CLS | TTFB;

interface WebVitalsPayload {
  name: string;
  value: number;
  rating?: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  url: string;
  timestamp: string;
}

// Color-coded logging for console
const vitalsColors = {
  'LCP': '#3b82f6', // Blue
  'FCP': '#8b5cf6', // Purple
  'FID': '#f59e0b', // Amber
  'CLS': '#ef4444', // Red
  'TTFB': '#10b981', // Green
};

export function reportWebVitals(metric: Metric) {
  const payload: WebVitalsPayload = {
    name: metric.name,
    value: metric.value,
    rating: (metric as any).rating,
    delta: (metric as any).delta,
    id: metric.id,
    url: window.location.pathname,
    timestamp: new Date().toISOString(),
  };

  // Console logging in development
  if (process.env.NODE_ENV === 'development') {
    const color = vitalsColors[metric.name as keyof typeof vitalsColors] || '#9ca3af';
    console.log(
      `%c Web Vital: ${metric.name}`,
      `color: ${color}; font-weight: bold;`,
      {
        value: `${metric.value.toFixed(2)}ms`,
        rating: (metric as any).rating || 'N/A',
        delta: `${(metric as any).delta.toFixed(2)}ms`,
      }
    );
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === 'production') {
    sendToAnalytics(payload);
  }
}

function sendToAnalytics(payload: WebVitalsPayload) {
  const body = JSON.stringify(payload);

  // Use sendBeacon for reliability
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/web-vitals', body);
  } else {
    // Fallback to fetch
    fetch('/api/web-vitals', {
      body,
      method: 'POST',
      keepalive: true,
    }).catch(() => {
      // Silently fail - don't block user experience
    });
  }
}

export function initWebVitals() {
  // Only initialize in browser
  if (typeof window === 'undefined') return;

  // Get all web vitals
  getCLS(reportWebVitals);
  getFCP(reportWebVitals);
  getFID(reportWebVitals);
  getLCP(reportWebVitals);
  getTTFB(reportWebVitals);

  // Additional: Performance observer for more detailed metrics
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navTiming = entry as PerformanceNavigationTiming;
            if (process.env.NODE_ENV === 'development') {
              console.log('%c Performance Navigation Timing', 'color: #6366f1; font-weight: bold;', {
                'DNS': `${(navTiming.domainLookupEnd - navTiming.domainLookupStart).toFixed(2)}ms`,
                'TCP': `${(navTiming.connectEnd - navTiming.connectStart).toFixed(2)}ms`,
                'TTFB': `${(navTiming.responseStart - navTiming.requestStart).toFixed(2)}ms`,
                'Download': `${(navTiming.responseEnd - navTiming.responseStart).toFixed(2)}ms`,
                'Parse': `${(navTiming.domInteractive - navTiming.domLoading).toFixed(2)}ms`,
                'Total': `${(navTiming.loadEventEnd - navTiming.fetchStart).toFixed(2)}ms`,
              });
            }
          }
        }
      });

      observer.observe({ entryTypes: ['navigation'] });
    } catch (e) {
      // Browser doesn't support PerformanceObserver
    }
  }
}

// Export for manual usage if needed
export const reportPagePerformance = () => {
  if (typeof window === 'undefined') return;

  const perfData = performance.timing;
  const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
  
  if (process.env.NODE_ENV === 'development') {
    console.log('%c Performance Report', 'color: #0ea5e9; font-weight: bold; font-size: 14px;', {
      'Page Load Time': `${pageLoadTime}ms`,
      'DOM Interactive': `${perfData.domInteractive - perfData.navigationStart}ms`,
      'DOM Complete': `${perfData.domComplete - perfData.navigationStart}ms`,
      'Resources': `${performance.getEntriesByType('resource').length} items`,
    });
  }

  return {
    pageLoadTime,
    domInteractive: perfData.domInteractive - perfData.navigationStart,
    domComplete: perfData.domComplete - perfData.navigationStart,
    resourceCount: performance.getEntriesByType('resource').length,
  };
};
