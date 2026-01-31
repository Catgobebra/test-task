export function formatDate(dateStr: string): string {
  try {
    const normalized = dateStr
      .replace(/января/i,   '01')
      .replace(/февраля/i,  '02')
      .replace(/марта/i,    '03')
      .replace(/апреля/i,   '04')
      .replace(/мая/i,      '05')
      .replace(/июня/i,     '06')
      .replace(/июля/i,     '07')
      .replace(/августа/i,  '08')
      .replace(/сентября/i, '09')
      .replace(/октября/i,  '10')
      .replace(/ноября/i,   '11')
      .replace(/декабря/i,  '12');

    const [day, month, year] = normalized.split(/\s+/);
    
    const dd = day.padStart(2, '0');
    const mm = month.padStart(2, '0');

    return `${dd}.${mm}.${year}`;
  } catch {
    return dateStr;
  }
}

export default formatDate