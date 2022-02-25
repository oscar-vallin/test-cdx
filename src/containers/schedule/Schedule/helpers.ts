export const isCurrentViewMonth = (currentView) => currentView !== 'week' && currentView !== 'day';
export const isCurrentViewWeek = (currentView) => (currentView ?? 'week') === 'week';
export const isCurrentViewDay = (currentView) => (currentView ?? 'day') === 'day';
