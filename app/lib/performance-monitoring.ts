// Usage in your app - add to layout or _app.tsx
// Import this file and call initWebVitals() on app initialization

interface WebVitalsPayload {
  name: string;
  value: number;
  rating?: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  url?: string;
  timestamp?: string;
}

export function reportWebVitals(metric: WebVitalsPayload) {
  // Console logging in development
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    const vitalsColors: Record<string, string> = {
      'LCP': '#3b82f6', // Blue
      'FCP': '#8b5cf6', // Purple
      'FID': '#f59e0b', // Amber
      'INP': '#f59e0b', // Amber
      'CLS': '#ef4444', // Red
      'TTFB': '#10b981', // Green
    };
    const color = vitalsColors[metric.name] || '#9ca3af';
    console.log(
      `%c Web Vital: ${metric.name}`,
      `color: ${color}; font-weight: bold;`,
      {
        value: `${metric.value.toFixed(2)}ms`,
        rating: metric.rating || 'N/A',
        delta: `${metric.delta.toFixed(2)}ms`,
      }
    );
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === 'production') {
    sendToAnalytics(metric);
  }
}

function sendToAnalytics(payload: WebVitalsPayload) {
  const body = JSON.stringify(payload);

  // Use sendBeacon for reliability
  if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
    navigator.sendBeacon('/api/web-vitals', body);
  } else if (typeof fetch !== 'undefined') {
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

  // Performance observer for more detailed metrics
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
