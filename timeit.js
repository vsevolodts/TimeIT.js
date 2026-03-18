// timeit v5 (modernized)
(() => {
  const SELECTOR = '.timeit';
  const MIN_DELAY = 1000;
  const MAX_DELAY = 1000 * 60 * 60 * 24;

  const now = () => Date.now();

  const parseDate = (input) => {
    if (!input) return null;

    const trimmed = input.trim();

    // If only time provided → assume today
    if (/^\d{1,2}:\d{2}$/.test(trimmed)) {
      const today = new Date();
      const [h, m] = trimmed.split(':').map(Number);
      today.setHours(h, m, 0, 0);
      return today.getTime();
    }

    // If only date → assume midnight
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
      return new Date(`${trimmed}T00:00`).getTime();
    }

    // Full datetime
    const parsed = new Date(trimmed.replace(' ', 'T'));
    return Number.isNaN(parsed.getTime()) ? null : parsed.getTime();
  };

  const isValidTime = (timestamp) =>
    typeof timestamp === 'number' && !Number.isNaN(timestamp);

  const shouldHide = (start, end, current) => {
    if (!start && !end) return false;

    // Normal range
    if (start && end && start <= end) {
      return current < start || current > end;
    }

    // Overnight range (e.g., 22:00 → 06:00)
    if (start && end && start > end) {
      return current > end && current < start;
    }

    // Only start
    if (start && !end) {
      return current < start;
    }

    // Only end
    if (!start && end) {
      return current > end;
    }

    return false;
  };

  const updateElement = (el, currentTime) => {
    const startRaw = el.dataset.start;
    const endRaw = el.dataset.end;

    const start = parseDate(startRaw);
    const end = parseDate(endRaw);

    const valid = (!startRaw || isValidTime(start)) &&
                  (!endRaw || isValidTime(end));

    if (!valid) {
      el.classList.add('error');
      el.title = 'Invalid date format. Use YYYY-MM-DD HH:MM';
      return null;
    }

    const hidden = shouldHide(start, end, currentTime);

    el.classList.toggle('hidden', hidden);
    el.setAttribute('aria-hidden', hidden);

    return [start, end];
  };

  const scheduleNextRun = (times) => {
    const current = now();

    const futureDiffs = times
      .flat()
      .filter(Boolean)
      .map((t) => t - current)
      .filter((diff) => diff > MIN_DELAY && diff < MAX_DELAY);

    if (!futureDiffs.length) return;

    const next = Math.min(...futureDiffs);

    console.log(`timeit → next run in ${Math.round(next / 1000)}s`);
    setTimeout(run, next);
  };

  const run = () => {
    const elements = document.querySelectorAll(SELECTOR);
    const current = now();

    const allTimes = [];

    elements.forEach((el) => {
      const times = updateElement(el, current);
      if (times) allTimes.push(times);
    });

    scheduleNextRun(allTimes);
  };

  // Init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();