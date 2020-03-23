const tabletop = require('tabletop')

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/12dd_ca98vd07jC6BcExjDOH3GlUuw0lCunjOIx8wjxI/edit'

const getSheet = () => new Promise(async (resolve, reject) => {
  tabletop.init({ key: SHEET_URL, simpleSheet: true, callback: (data, tabletop) => resolve({data, tabletop}), error: reject })
})

// if simpleSheet === true, data is an array of row objects
// if simpleSheet === false, data is a collection of sheet names
const { tabletop, data } = await getSheet()

result: {
  data: {
    Sheet1: {
      columnNames: [Array],
      column_names: [Array],
      name: 'Sheet1',
      tabletop: [Object],
      elements: [Array],
      onReady: [Function: onReady],
      raw: [Object],
      originalColumns: [Array],
      original_columns: [Array],
      prettyColumns: [Object],
      pretty_columns: [Object]
    }
  },
  tabletop: {
    callback: [Function: callback],
    error: [Function (anonymous)],
    wanted: [],
    key: '12dd_ca98vd07jC6BcExjDOH3GlUuw0lCunjOIx8wjxI',
    simpleSheet: false,
    parseNumbers: false,
    wait: false,
    reverse: false,
    postProcess: undefined,
    debug: false,
    query: '',
    orderby: undefined,
    endpoint: 'https://spreadsheets.google.com',
    singleton: false,
    simpleUrl: false,
    authkey: undefined,
    sheetPrivacy: 'public',
    callbackContext: undefined,
    prettyColumnNames: true,
    parameterize: false,
    models: { Sheet1: [Object] },
    modelNames: [ 'Sheet1' ],
    model_names: [ 'Sheet1' ],
    baseJsonPath: '/feeds/worksheets/12dd_ca98vd07jC6BcExjDOH3GlUuw0lCunjOIx8wjxI/public/basic?alt=json',
    encounteredError: false,
    googleSheetName: 'Map from Sheet demo',
    foundSheetNames: [ 'Sheet1' ],
    sheetsToLoad: 0
  }
}
