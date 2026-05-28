// ═══════════════════════════════════════════════════════════
//  KickerInter · Umfrage Backend · Google Apps Script
// ═══════════════════════════════════════════════════════════

function doGet(e) {
  // Stimme empfangen (Parameter in der URL)
  if (e.parameter && e.parameter.auswahl) {
    try {
      var ss    = SpreadsheetApp.getActiveSpreadsheet();
      var sheet = ss.getSheetByName('Abstimmungen');

      if (!sheet) {
        sheet = ss.insertSheet('Abstimmungen');
        sheet.appendRow(['Zeitstempel', 'Umfrage', 'Auswahl']);
        sheet.getRange(1, 1, 1, 3).setFontWeight('bold');
      }

      sheet.appendRow([
        new Date(),
        e.parameter.umfrage || '',
        e.parameter.auswahl || ''
      ]);
    } catch (err) {
      // Fehler still schlucken
    }
  }

  // Immer "OK" zurückgeben (auch beim Browser-Test)
  return ContentService.createTextOutput('KickerInter Umfrage · OK');
}

// doPost nicht mehr benötigt, bleibt aber als Fallback
function doPost(e) {
  return ContentService.createTextOutput('OK');
}
