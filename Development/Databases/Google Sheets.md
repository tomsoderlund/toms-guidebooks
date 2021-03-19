https://github.com/jsoma/tabletop

    const tabletop = require('tabletop')

    const getGoogleSheet = (sheetUrl, multipleTabs = true) => new Promise((resolve, reject) => {
      tabletop.init({ key: sheetUrl, simpleSheet: !multipleTabs, callback: (data, tabletop) => resolve({data, tabletop}), error: reject })
    })

    // if simpleSheet === true, data is an array of row objects
    // if simpleSheet === false, data is a collection of sheet names
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/12dd_ca98vd07jC6BcExjDOH3GlUuw0lCunjOIx8wjxI/edit'
    const { data, tabletop } = await getGoogleSheet(sheetUrl)
    console.log(`Tab data:`, data['Tab name'])
    console.log(`Columns:`, data['Tab name'].columnNames) // or lower-case: '.column_names'
    console.log(`Rows:`, data['Tab name'].elements)

## Example results

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
