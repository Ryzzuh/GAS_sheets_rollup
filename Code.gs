// gather all the communities summary sheets and put them in a roll up data sheet

const main = () => {
  SpreadsheetApp.getActive().getSheetByName("Summary_v2").clear();
  const sheetsUrls = getSheetsUrls()
  // outputToRollUpSummary(filterSheetSummary(getSheetSummary(...sheetsUrls[0])))
  for(i in sheetsUrls){
  outputToRollUpSummary(appendSourceURL(filterSheetSummaryTable(getSheetSummaryTable(...sheetsUrls[i])), sheetsUrls[i]))
  }
  //sheetsUrls.forEach(sheetURL=>outputToRollUpSummary(filterSheetSummary(getSheetSummary(sheetURL))))
}

const getSheetSummaryTable = (sheetURL) => {
  // gets Summary information of the specified sheet (taken from URL)
  const sheet = SpreadsheetApp.openByUrl(sheetURL).getSheetByName("Summary");
  return sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn()).getValues();
}

const filterSheetSummaryTable = (table) => {
  // remove row if column number is blank
  const colNum = 6 // SETTING
  return table.filter(row => row[colNum]!='')
}
  
const removeHeaderRow = (table) => {
  return table.filter( (item,index) => index>0)
}

const outputToRollUpSummary = (table) => {
  // outputs a table to Summary tab for the roll up
  const sheet = SpreadsheetApp.getActive().getSheetByName("Summary_v2");
  sheet.getRange(sheet.getLastRow()+1, 1, table.length, table[0].length).setValues(table);
}

const getSheetsUrls = () => {
  // gets the urls of all sheets in the datasheets tab
  const sheet = SpreadsheetApp.getActive().getSheetByName("communities_datasheets");
  return sheet.getRange(2,1,sheet.getLastRow()-1).getValues()
}

const appendSourceURL = (table, sourceURL) => {
  return table.map(row => [...row, sourceURL])
}

///////////////////////////////
//////////// TESTS ////////////
///////////////////////////////
const test_appendSourceURL = () => {
  const table = 
  [['one','two','three'],
  ['foo','bar','baz']];
  const sourceURL = 'www.abc.com';
  const res = appendSourceURL(table, sourceURL)
  Logger.log(res)
}

const test_removeHeaderRow = () => {
  const res = removeHeaderRow(
  [['one','two','three'],
  ['foo','bar','baz']]
  );
  Logger.log(res)
}
  
const test_outputToRollUpSummary = () => {
  outputToRollUpSummary(
  [['one','two','three'],
  ['foo','bar','baz']]
  );
}
  
const test_getSheetsUrls = () => { Logger.log(getSheetsUrls()) }

const test_getSheetSummary = () => {
  const x = getSheetSummary('https://docs.google.com/spreadsheets/d/12KMupt5w-B14GxNgmhRlIFEfiN1H55WUKZN5fvPCvmQ/');
  Logger.log(x);
}
  
const test_filterSheetSummaryTable = () => {
  const filtered = filterSheetSummary(
  [['one','two','three', 'four'],
  ['foo','bar','baz', '']]
  );
  Logger.log(filtered)
}
///////////////////////////////
////////// END TESTS //////////
///////////////////////////////