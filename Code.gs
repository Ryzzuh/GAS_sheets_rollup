// gather all the communities summary sheets and put them in a roll up data sheet

const getSheetSummary = (sheetURL) => {
  const sheet = SpreadsheetApp.openByUrl(sheetURL).getSheetByName("Summary");
  const values = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn()).getValues();
}

const outputToRollUpSummary = (table) => {
  const sheet = SpreadsheetApp.getActive().getSheetByName("Summary_v2");
  sheet.getRange(sheet.getLastRow()+1, sheet.getLastColumn()+1, table.length, table[0].length).setValues(table);
}


const getSheetsUrls = () => {
  const sheet = SpreadsheetApp.getActive().getSheetByName("communities_datasheets");
  const urls = sheet.getRange(2,1,sheet.getLastColumn()).getValues()
  Logger.log(urls)
}



///////////////////////////////
//////////// TESTS ////////////
///////////////////////////////
const test_outputToRollUpSummary = () => {
  outputToRollUpSummary(
  [['one','two','three'],
  ['foo','bar','baz']]
  );
}

const test_getSheet = () => {
  const x = getSheet('https://docs.google.com/spreadsheets/d/12KMupt5w-B14GxNgmhRlIFEfiN1H55WUKZN5fvPCvmQ/');
  Logger.log(x);
}
///////////////////////////////
////////// END TESTS //////////
///////////////////////////////