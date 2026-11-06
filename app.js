import { days, bookings } from './trip.js';
import { categories, firstDay, lastDay, ledgerKey, japanDate, validExpense, parseBackup, csvFor } from './ledger.js';

const main = document.querySelector('#main');
const form = document.querySelector('#expense-form');
const dialog = document.querySelector('#expense');
const notice = document.querySelector('#notice');
const pageButtons = document.querySelectorAll('[data-page]');
const tabs = ['trip','bookings','ledger'];
const weekdays = ['日','一','二','三','四','五','六'];
const regions = {
  神户: ['kobe','⚓'], 大阪: ['osaka','🛍️'], 京都: ['kyoto','🍁'],
  宇治: ['uji','🍵'], 返程: ['return','✈️']
};
const categoryIcons = {'餐饮':'🍴','交通':'🚃','购物':'🛍️','住宿':'🛏️','门票／体验':'🎟️','其他':'🌷'};
const currency = new Intl.NumberFormat('ja-JP', {style:'currency', currency:'JPY'});
const iso = day => '2026-11-' + day;
const tripDate = () => Math.max(11,Math.min(20,Number(japanDate().slice(-2)) || 11));
const defaultDay = () => japanDate() < firstDay ? 11 : japanDate() > lastDay ? 20 : tripDate();
const params = () => new URLSearchParams(location.search);
let day = defaultDay();
let page = 'trip';
let ledgerDay = day;
let editId = null;
let noticeTimeout;

function readLocation() {
  const url = params();
  const selected = url.get('day');
  day = /^2026-11-(1[1-9]|20)$/.test(selected) ? Number(selected.slice(-2)) : defaultDay();
  page = tabs.includes(url.get('tab')) ? url.get('tab') : 'trip';
}

function navigate(nextPage, nextDay = day, bookingId) {
  const url = new URL(location.href);
  url.searchParams.set('day',iso(nextDay));
  if (nextPage === 'trip') url.searchParams.delete('tab');
  else url.searchParams.set('tab',nextPage);
  url.hash = bookingId || '';
  history.pushState(null,'',url);
  readLocation();
  if (page === 'ledger') ledgerDay = day;
  render();
  window.scrollTo(0,0);
  if (bookingId) document.getElementById(bookingId)?.scrollIntoView({block:'start'});
}

function escape(value) {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[char]);
}

function actions(items = []) {
  return items.map(([label,url]) => {
    const isMap = url.startsWith('https://www.google.com/maps/');
    return '<a class="chip '+(isMap ? 'map-btn' : '')+'" href="'+escape(url)+'" target="_blank" rel="noopener noreferrer">'+
      (isMap ? '<span aria-hidden="true">📍</span>' : '')+escape(label)+'</a>';
  }).join('');
}

function announce(message) {
  clearTimeout(noticeTimeout);
  notice.textContent = message;
  noticeTimeout = setTimeout(() => { notice.textContent = ''; },3400);
}

function dateLabel(value) {
  return '周' + weekdays[new Date(iso(value) + 'T00:00:00Z').getUTCDay()];
}

function dateGrid(selected, attribute) {
  return '<div class="dates" role="group" aria-label="选择 11 月日期">' + Object.keys(days).map(value =>
    '<button class="date '+regions[days[value].city][0]+'" data-'+attribute+'="'+value+'" aria-label="11 月 '+value+' 日，'+escape(days[value].city)+'" aria-pressed="'+(Number(value) === selected)+'">'+value+'<small>'+escape(days[value].city)+'</small></button>'
  ).join('') + '</div>';
}

function mapCard() {
  if (![14,15].includes(day)) return '';
  const plan = day === 14
    ? '① 阪神 9F → ② 阪急 2F／4F → ③ 友都八喜／LINKS'
    : '① LUCUA 两馆 → ② 阪神 B2 → ③ HEP FIVE／EST';
  const pins = day === 14 ? [[76,88],[77,64],[50,43]] : [[54,61],[76,88]];
  const diagram = '<div class="map"><img src="./assets/umeda-reference.webp" alt="梅田 2F 步道桥连接图，含阪神、阪急、JR 大阪站、大丸、LUCUA、友都八喜和 Grand Front Osaka">'+pins.map(([x,y],i) => '<span class="pin" style="left:'+x+'%;top:'+y+'%">'+(i+1)+'</span>').join('')+'</div>';
  const extra = day === 15 ? '<p>③ HEP FIVE／EST 接阪急侧地面。</p><a class="chip" href="./assets/lucua-reference.webp" target="_blank" rel="noopener">放大 LUCUA 两馆连接图</a> <a class="chip" href="https://www.est-sc.com/floormap/" target="_blank" rel="noopener noreferrer">EST 官方地图</a>' : '';
  return '<article class="card"><div class="meta">梅田 · 11/'+day+'</div><h2>当天步道桥图</h2><p>'+plan+'</p>'+diagram+'<button class="chip" data-zoom>全屏放大</button> '+extra+'<p class="muted">底图来自你提供的小红书「大阪梅田不迷路指南」。</p>'+
    '<dialog class="map-zoom"><div class="row"><strong>11/'+day+' 步道桥图</strong><button class="plain" data-close-map>关闭</button></div>'+diagram+'</dialog></article>';
}

function tripView() {
  const data = days[day];
  const [region, sticker] = regions[data.city];
  return dateGrid(day,'day') + '<section class="hero '+region+'"><span class="sticker" aria-hidden="true">'+sticker+'</span><div class="eyebrow">第 '+(day-10)+' 天 · '+data.city+'</div><h1>'+data.title+'</h1><p>11 月 '+day+' 日 '+dateLabel(day)+' · 当地时间</p></section><p class="callout"><span aria-hidden="true">📌</span> '+data.focus+'</p>' +
    mapCard() + data.cards.map((card,i) =>
      '<article class="card stop '+region+'"><div class="meta"><span class="step">'+String(i+1).padStart(2,'0')+'</span> '+escape(card.time)+'</div><h2><span aria-hidden="true">'+(categoryIcons[card.category] ?? '🌿')+'</span> '+escape(card.title)+'</h2><p>'+escape(card.body)+'</p>' +
      (card.detail ? '<details><summary>展开现场细节</summary><p>'+escape(card.detail)+'</p></details>' : '') +
      '<div class="actions">'+actions(card.links)+(card.category ? '<button class="chip" data-expense="'+i+'">＋ 记一笔</button>' : '')+'</div></article>'
    ).join('') + (day === 16 || day === 20 ? '<button class="chip" data-bus>查看 Lawson 预约号与取票步骤</button>' : '');
}

function bookingView() {
  return '<h1 class="section-title"><span aria-hidden="true">🎟️</span> 预约与凭证</h1><p class="muted">时间按日本当地显示。待确认项以邮件、订单或商家回复为准。</p>' + bookings.map(item =>
    '<article id="'+item.id+'" class="card"><div class="row"><span class="meta">11 月 '+item.day+' 日</span><span class="badge '+(item.status.includes('待')?'pending':'')+'">'+item.status+'</span></div><h2>'+item.title+'</h2><p>'+item.body+'</p>' +
    (item.code ? '<p>预约号 <strong>'+item.code+'</strong> <button class="chip" data-copy="'+item.code+'">复制</button></p>' : '') +
    (item.detail ? '<p>'+item.detail+'</p>' : '') +
    '<div class="actions">'+actions(item.links)+'<button class="chip" data-day="'+item.day+'">当天行程</button></div></article>'
  ).join('');
}

function expenses() {
  const data = localStorage.getItem(ledgerKey);
  return data ? parseBackup(data) : [];
}

function saveExpenses(rows) {
  localStorage.setItem(ledgerKey, JSON.stringify({version:1,expenses:rows}));
}

function total(rows) {
  return rows.reduce((sum,row) => sum+row.amount,0);
}

function ledgerView() {
  let rows;
  try {
    rows = expenses();
  } catch {
    return '<h1 class="section-title">随身账本</h1><p class="callout">当前浏览器无法读取本机账本。请检查网站存储是否可用，避免清理原有网页数据。</p>';
  }
  const today = rows.filter(row => row.date === iso(ledgerDay)).reverse();
  return '<div class="row"><h1 class="section-title"><span aria-hidden="true">🪙</span> 随身账本</h1><button class="primary" data-new>＋ 记一笔</button></div>' +
    '<p class="muted">日本期间的日元消费。保存在当前浏览器，清理网站数据或更换手机前请导出备份。</p>' + dateGrid(ledgerDay,'ledger-day') +
    '<div class="totals"><div class="card"><span class="muted">11/'+ledgerDay+' 小计</span><strong>'+currency.format(total(today))+'</strong></div><div class="card"><span class="muted">全程合计</span><strong>'+currency.format(total(rows))+'</strong></div></div>' +
    '<article class="card"><details><summary>全程分类汇总</summary>'+categories.map(category =>
      '<p>'+category+' · '+currency.format(total(rows.filter(row => row.category === category)))+'</p>'
    ).join('')+'</details></article>' +
    (today.length ? today.map(row => '<article class="card"><div class="row"><h2>'+escape(row.merchant || row.category)+'</h2><strong>'+currency.format(row.amount)+'</strong></div><p>'+escape(row.category)+(row.note ? ' · '+escape(row.note):'')+'</p><div class="actions"><button class="chip" data-edit="'+escape(row.id)+'">编辑</button><button class="chip" data-delete="'+escape(row.id)+'">删除</button></div></article>').join('') : '<p class="card muted">这天还没有消费记录。</p>') +
    '<div class="actions"><button class="chip" data-export="csv">导出 CSV</button><button class="chip" data-export="json">保存备份</button><button class="chip" data-import>恢复备份</button><input type="file" id="backup" accept=".json,application/json" hidden></div>';
}

function render() {
  main.innerHTML = page === 'trip' ? tripView() : page === 'bookings' ? bookingView() : ledgerView();
  for (const button of pageButtons) {
    if (button.dataset.page === page) button.setAttribute('aria-current','page');
    else button.removeAttribute('aria-current');
  }
}

function openExpense(values = {}) {
  editId = values.id ?? null;
  document.querySelector('#form-title').textContent = editId ? '编辑消费' : '记一笔';
  const today = japanDate();
  form.elements.amount.value = values.amount ?? '';
  form.elements.date.value = values.date ?? (today >= firstDay && today <= lastDay ? today : iso(day));
  form.elements.category.value = values.category ?? categories[0];
  form.elements.merchant.value = values.merchant ?? '';
  form.elements.note.value = values.note ?? '';
  dialog.showModal();
}

function download(name, data, type) {
  const url = URL.createObjectURL(new Blob([data],{type}));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url),3000);
}

form.elements.category.innerHTML = categories.map(category => '<option>'+category+'</option>').join('');
document.querySelector('#close-form').addEventListener('click',() => dialog.close());
form.addEventListener('submit',event => {
  event.preventDefault();
  const fields = new FormData(form);
  const expense = {
    id: editId ?? crypto.randomUUID(),
    amount: Number(fields.get('amount')), date: fields.get('date'), category:fields.get('category'),
    merchant:fields.get('merchant').trim(), note:fields.get('note').trim()
  };
  if (!validExpense(expense)) { announce('请填写旅行期间的日期和正整数日元金额。'); return; }
  try {
    const rows = expenses();
    const index = rows.findIndex(row => row.id === expense.id);
    if (index === -1) rows.push(expense);
    else rows[index] = expense;
    saveExpenses(rows);
  } catch {
    announce('保存失败，请确认浏览器允许网站存储。');
    return;
  }
  ledgerDay = Number(expense.date.slice(-2));
  dialog.close();
  render();
  announce('已保存到这部手机');
});

document.addEventListener('click',async event => {
  const button = event.target.closest('button');
  if (!button) return;
  const data = button.dataset;
  try {
    if (data.page) navigate(data.page);
    else if (data.day) {
      navigate('trip',Number(data.day));
      main.querySelector('[data-day="'+day+'"]')?.focus({preventScroll:true});
    }
    else if (data.bus !== undefined) navigate('bookings',day,'bus');
    else if (data.copy) {
      await navigator.clipboard.writeText(data.copy);
      announce('已复制预约号');
    }
    else if (data.zoom !== undefined) main.querySelector('.map-zoom').showModal();
    else if (data.closeMap !== undefined) main.querySelector('.map-zoom').close();
    else if (data.ledgerDay) { ledgerDay = Number(data.ledgerDay); render(); }
    else if (data.expense !== undefined) {
      const card = days[day].cards[Number(data.expense)];
      openExpense({date:iso(day),merchant:card.title.slice(0,100),category:card.category});
    }
    else if (data.new !== undefined) openExpense({date:iso(ledgerDay)});
    else if (data.edit) {
      const row = expenses().find(item => item.id === data.edit);
      if (row) openExpense(row);
    }
    else if (data.delete && confirm('删除这笔消费？')) {
      saveExpenses(expenses().filter(row => row.id !== data.delete));
      render();
      announce('已删除');
    }
    else if (data.export === 'csv') download('关西走你-消费明细.csv',csvFor(expenses()),'text/csv;charset=utf-8');
    else if (data.export === 'json') download('关西走你-账本备份.json',JSON.stringify({version:1,expenses:expenses()},null,2),'application/json');
    else if (data.import !== undefined) main.querySelector('#backup').click();
  } catch {
    announce(data.copy ? '无法自动复制，请长按预约号复制。' : '操作失败，请检查浏览器的网站存储。');
  }
});

main.addEventListener('change',async event => {
  if (event.target.id !== 'backup') return;
  const file = event.target.files[0];
  event.target.value = '';
  if (!file) return;
  try {
    const imported = parseBackup(await file.text());
    const current = expenses();
    const known = new Set(current.map(row => row.id));
    const added = imported.filter(row => !known.has(row.id));
    saveExpenses([...current,...added]);
    render();
    announce('已导入 '+added.length+' 笔，已有记录已跳过');
  } catch {
    announce('无法恢复，请选择此账本导出的 JSON 备份。');
  }
});

window.addEventListener('popstate', () => { readLocation(); ledgerDay = day; render(); });
readLocation();
ledgerDay = day;
render();
if (location.hash === '#bus' && page === 'bookings') document.getElementById('bus').scrollIntoView();
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}
