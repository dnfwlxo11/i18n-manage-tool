const { google } = require('googleapis')

export async function connGoogleApis(spreadsheetId, apiJson) {
  if (!spreadsheetId || !apiJson?.client_email || !apiJson.private_key) return

  const sheetData = []
  const CLIENT_EMAIL = apiJson.client_email
  const PRIVATE_KEY = apiJson.private_key

  const auth = new google.auth.JWT(
    CLIENT_EMAIL,
    null,
    PRIVATE_KEY,
    [ 'https://www.googleapis.com/auth/spreadsheets' ]
  )

  const googleSheet = google.sheets({
    version: "v4",
    auth: auth
  })

  const content = await googleSheet.spreadsheets.get({ 
    spreadsheetId
  })

  const sheets = content.data.sheets
  console.log(sheets, 'sheets')
  for await (let sheet of sheets) {
    const sheetName = sheet.properties.title
    const sheetId = sheet.properties.sheetId

    const rows = await googleSheet.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A1:ZZ`
    })

    const keys = rows.data.values[0]
    const data = rows.data.values.slice(1).reduce((acc, item) => {
      const tmpObj = {}
      item.map((value, idx) => tmpObj[keys[idx]] = value)

      acc.push(tmpObj)

      return acc
    }, [])

    sheetData.push({ 
      sheetName, 
      rows: data
    })

    return sheetData
  }
}