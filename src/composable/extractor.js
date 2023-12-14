const XLSX = require('xlsx')
const fs = require('fs')

function recursiveSetObj(baseObj, keys, value, count=0) {
  const key = keys[count]

  if (keys?.length === count) {
    return value?.trim().replace('\b', '')
  } else {
    console.log(baseObj[key], keys.length, count, !baseObj?.[key])
    if (!baseObj?.[key] || typeof(baseObj?.[key]) === 'string') baseObj[key] = {}

    count += 1
    baseObj[key] = recursiveSetObj(baseObj[key], keys, value, count)
  }

  return baseObj
}

function convertData(data) {
  const results = {}

  Object.values(data).forEach(({ sheetName, rows }, sheetIdx) => {
    console.log(sheetName)
    let baseObj = {}

    rows?.map((row, idx) => {
      const keys = Object.keys(row).reduce((acc, item) => {
        if (item.includes('key')) acc.push(row[item])
        return acc
      }, [])
  
      const values = Object.keys(row).reduce((acc, item) => {
        if (item.includes('lang')) acc.push(item)
        return acc
      }, [])

      console.log(keys, values, 'keys, values')
  
      values.map((lang) => {
        if (!baseObj?.[lang]) baseObj[lang] = {}
        console.log(baseObj[lang], [ sheetName, ...keys ].length, [ sheetName, ...keys ])
        const langName = lang.split('_')[1]
        const tmpObj = recursiveSetObj(baseObj[lang], [ sheetName, ...keys ], (row?.[lang] || {}))
        
        results[langName] = { ...tmpObj, ...results[langName] }
      })

      console.log('--------------------------')
    })
  })

  return results
}

function readXLSX(path, filename) {
  let results = {}
  let workBook = XLSX.readFile(path)
  workBook.SheetNames.forEach((sheetName, sheetIdx) => {
    let baseObj = {}
    let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);

    if (!baseObj?.[sheetName]) baseObj[sheetName] = {}

    rows?.map((row, idx) => {
      const keys = Object.keys(row).reduce((acc, item) => {
        if (item.includes('key')) acc.push(row[item])
        return acc
      }, [])

      const values = Object.keys(row).reduce((acc, item) => {
        if (item.includes('lang')) acc.push(item)
        return acc
      }, [])

      values.map((lang) => {
        if (!baseObj?.[lang]) baseObj[lang] = {}
        const langName = lang.split('_')[1]
        const tmpObj = recursiveSetObj(baseObj[lang], [ sheetName, ...keys ], (row?.[lang] || {}))
        
        results[langName] = { ...tmpObj, ...results[langName] }
      })
    })
  })

  if (!fs.existsSync(`./${filename}`)) fs.mkdirSync(`./${filename}`)
  Object.keys(results || {}).map((lang) => {
    fs.writeFileSync(`./${filename}/${lang}.json`, JSON.stringify(results[lang], null, 2), 'utf-8')
  })
}

export {
  recursiveSetObj,
  convertData,
  readXLSX,
}