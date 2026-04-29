// ════════════════════════════════════════════════════════════════
//  VozTask — Google Apps Script Backend
//  Pega este código en script.google.com y despliega como Web App
// ════════════════════════════════════════════════════════════════

const SHEET_NAME = 'Tareas';
const HEADERS = ['id','title','detail','category','type','priority',
                  'deadline','recurrence','done','createdAt','updatedAt'];

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    const hdr = sheet.getRange(1, 1, 1, HEADERS.length);
    hdr.setFontWeight('bold');
    hdr.setBackground('#1a2535');
    hdr.setFontColor('#e2e8f4');
  }
  return sheet;
}

// GET → cargar todas las tareas
function doGet(e) {
  try {
    const sheet = getSheet();
    const data = sheet.getDataRange().getValues();
    if (data.length <= 1) return jsonOut({ tasks: [] });

    const headers = data[0];
    const tasks = data.slice(1)
      .filter(row => row[0] !== '')
      .map(row => {
        const task = {};
        headers.forEach((h, i) => {
          if (h === 'done') {
            task[h] = (row[i] === true || row[i] === 'TRUE' || row[i] === 'true');
          } else {
            task[h] = (row[i] === '' || row[i] === null) ? null : String(row[i]);
          }
        });
        return task;
      });
    return jsonOut({ tasks });
  } catch (err) {
    return jsonOut({ error: err.message });
  }
}

// POST → mutaciones (add / update / delete / bulkDelete)
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const { action, task, id, ids } = body;
    const sheet = getSheet();

    // ── ADD ──
    if (action === 'add') {
      const row = HEADERS.map(h => {
        if (h === 'done') return false;
        if (h === 'updatedAt') return task.createdAt || new Date().toISOString();
        return task[h] || '';
      });
      sheet.appendRow(row);
      return jsonOut({ ok: true });
    }

    // ── UPDATE ──
    if (action === 'update') {
      const rowIdx = findRow(sheet, id);
      if (rowIdx < 0) return jsonOut({ ok: false, error: 'Not found' });
      const headers = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
      headers.forEach((h, j) => {
        if (task[h] !== undefined) {
          sheet.getRange(rowIdx, j + 1).setValue(
            h === 'done' ? (task[h] === true || task[h] === 'true') : (task[h] || '')
          );
        }
      });
      const updIdx = HEADERS.indexOf('updatedAt') + 1;
      if (updIdx > 0) sheet.getRange(rowIdx, updIdx).setValue(new Date().toISOString());
      return jsonOut({ ok: true });
    }

    // ── DELETE ──
    if (action === 'delete') {
      const rowIdx = findRow(sheet, id);
      if (rowIdx < 0) return jsonOut({ ok: false, error: 'Not found' });
      sheet.deleteRow(rowIdx);
      return jsonOut({ ok: true });
    }

    // ── BULK DELETE ──
    if (action === 'bulkDelete') {
      const data = sheet.getDataRange().getValues();
      const idCol = HEADERS.indexOf('id');
      const rows = [];
      for (let i = 1; i < data.length; i++) {
        if ((ids || []).map(String).includes(String(data[i][idCol]))) {
          rows.push(i + 1);
        }
      }
      rows.sort((a, b) => b - a).forEach(r => sheet.deleteRow(r));
      return jsonOut({ ok: true, deleted: rows.length });
    }

    return jsonOut({ ok: false, error: 'Acción desconocida: ' + action });
  } catch (err) {
    return jsonOut({ ok: false, error: err.message });
  }
}

function findRow(sheet, id) {
  const data = sheet.getDataRange().getValues();
  const idCol = HEADERS.indexOf('id');
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][idCol]) === String(id)) return i + 1;
  }
  return -1;
}

function jsonOut(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
