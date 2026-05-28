// ═══════════════════════════════════════════════════════════
//  KickerInter · Umfrage Backend · Google Apps Script
//  Anleitung: siehe Kommentare unten
// ═══════════════════════════════════════════════════════════

// EINRICHTEN (einmalig, ~5 Minuten):
//
// 1. Erstelle eine neue Google Tabelle (sheets.google.com → Neu)
// 2. Öffne Erweiterungen → Apps Script
// 3. Lösche den vorhandenen Code, füge DIESEN Code ein, speichern (Strg+S)
// 4. Klicke auf "Bereitstellen" → "Neue Bereitstellung"
//    - Typ: Web-App
//    - Ausführen als: Ich (deine Google-Konto)
//    - Zugriff: Jeder (anonym)
// 5. Autorisierung bestätigen (einmalig, dein Google-Konto)
// 6. Kopiere die angezeigte URL
// 7. In portal.html ersetze 'DEINE_APPS_SCRIPT_URL_HIER' durch diese URL
//
// ERGEBNISSE ABRUFEN:
// → Öffne die Google Tabelle, Tabellenblatt "Abstimmungen"
// → Datei → Herunterladen → Microsoft Excel (.xlsx)

function doPost(e) {
  try {
    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Abstimmungen');

    // Tabellenblatt erstellen falls nicht vorhanden
    if (!sheet) {
      sheet = ss.insertSheet('Abstimmungen');
      sheet.appendRow(['Zeitstempel', 'Umfrage', 'Auswahl']);
      sheet.getRange(1, 1, 1, 3).setFontWeight('bold');
    }

    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      new Date(),
      data.umfrage || '',
      data.auswahl || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Einfacher GET-Test: rufe die Web-App-URL im Browser auf → sollte "OK" anzeigen
function doGet(e) {
  return ContentService.createTextOutput('KickerInter Umfrage · OK');
}
