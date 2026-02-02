import { type CLS, type FCP, type FID, type LCP, type TTFB, getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals';

type Metric = LCP | FCP | FID | CLS | TTFB;

export function reportWebVitals(metric: Metric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vitals:', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
    });
  }

  // Send to analytics service (Vercel Analytics, Google Analytics, etc.)
  if (window.location.pathname !== '/_next/') {
    // Replace with your analytics endpoint
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
      url: window.location.pathname,
      timestamp: new Date().toISOString(),
    });

    // Use `navigator.sendBeacon()` if available, falling back to `fetch()`
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/web-vitals', body);
    } else {
      fetch('/api/web-vitals', { body, method: 'POST', keepalive: true }).catch(
        () => {} // Silently fail if analytics is unavailable
      );
    }
  }
}

export function initWebVitals() {
  getCLS(reportWebVitals);
  getFCP(reportWebVitals);
  getFID(reportWebVitals);
  getLCP(reportWebVitals);
  getTTFB(reportWebVitals);
}
