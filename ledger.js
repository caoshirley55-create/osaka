export const categories = ['餐饮','交通','购物','住宿','门票／体验','其他'];
export const firstDay = '2026-11-11';
export const lastDay = '2026-11-20';
export const ledgerKey = 'kansai.ledger.v1';

export function japanDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat('ja-JP', {
    timeZone:'Asia/Tokyo', year:'numeric', month:'2-digit', day:'2-digit'
  }).formatToParts(now);
  const get = type => parts.find(part => part.type === type).value;
  return [get('year'),get('month'),get('day')].join('-');
}

export function validExpense(row) {
  return row && typeof row.id === 'string' && row.id.length > 0 && row.id.length <= 120
    && typeof row.date === 'string' && /^2026-11-(1[1-9]|20)$/.test(row.date)
    && Number.isSafeInteger(row.amount) && row.amount > 0 && row.amount <= 999999999
    && categories.includes(row.category) && typeof row.merchant === 'string' && row.merchant.length <= 100
    && typeof row.note === 'string' && row.note.length <= 200;
}

export function parseBackup(source) {
  const data = JSON.parse(source);
  if (!data || data.version !== 1 || !Array.isArray(data.expenses)
      || !data.expenses.every(validExpense)
      || new Set(data.expenses.map(row => row.id)).size !== data.expenses.length) {
    throw new Error('无法识别账本备份');
  }
  return data.expenses;
}

export function csvFor(rows) {
  function cell(value) {
    const str = String(value);
    const safe = typeof value === 'string' && /^[\s\uFEFF]*[=+@-]|^[\t\r\n]/.test(str) ? "'" + str : str;
    return '"' + safe.replaceAll('"','""') + '"';
  }
  return '\uFEFF' + [
    ['日期','金额（JPY）','分类','商家','备注'],
    ...rows.map(row => [row.date,row.amount,row.category,row.merchant,row.note])
  ].map(row => row.map(cell).join(',')).join('\r\n');
}
