import download from 'downloadjs'
import JsPDF from 'jspdf'
import 'jspdf-autotable'
import mapValues from 'lodash/mapValues'

export function exportar (data, fields, type = 'xls', name = 'data') {
  name = `${name}.${type}`
  if (type === 'csv') {
    exportCSV(data, fields, type, name)
  }
  if (type === 'pdf') {
    exportPdf(data, fields, name)
  }
  if (type === 'xls') {
    exportXLS(data, fields, type, name)
  }
}

function columns (fields) {
  let columns = {}
  fields.map(item => {
    columns[item.label] = item.field
  })
  return columns
}

function exportPdf (data, fields, name = 'data.pdf') {
  let doc = new JsPDF({
    orientation: 'landscape'
  })
  let columns = fields.map(item => {
    return {title: item.label, dataKey: item.field.split('.', 1)}
  })
  doc.autoTable(columns, flatData(data), {theme: 'striped', styles: {fontSize: 6}})
  doc.save(name)
}

function flatData (data) {
  return data.map(item => {
    return mapValues(item, field => {
      if (typeof field === 'object') return field.name
      return field
    })
  })
}

function exportCSV (data, fields, type = 'csv', name = 'data.xls') {
  generate(data, fields, type, name)
}

function exportXLS (data, fields, type = 'xls', name = 'data.xls') {
  generate(data, fields, type, name)
}

function generate (data, fields, type, name) {
  if (!data.length) {
    return
  }
  let json = getProcessedJson(data, columns(fields))
  if (type === 'csv') {
    return exporte(jsonToCSV(json), name, 'application/csv')
  }
  return exporte(jsonToXLS(json), name, 'application/vnd.ms-excel')
}

function exporte (data, filename, mime) {
  let blob = base64ToBlob(data, mime)
  download(blob, filename, mime)
}

function jsonToXLS (data, title = null) {
  let xlsTemp = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta name="ProgId" content="Excel.Sheet"> <meta name="Generator" content="Microsoft Excel 11"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>${table}</table></body></html>'
  let xlsData = '<thead><tr>'
  if (title != null) {
    if (Array.isArray(title)) {
      for (var i = 0; i < title.length; i++) {
        xlsData += '<th colspan="' + Object.keys(data[0]).length + '">' + title[i] + '<th></tr><tr>'
      }
    } else {
      xlsData += '<th colspan="' + Object.keys(data[0]).length + '">' + title + '<th></tr><tr>'
    }
  }
  for (let key in data[0]) {
    xlsData += '<th>' + key + '</th>'
  }
  xlsData += '</tr></thead>'
  xlsData += '<tbody>'
  data.map(function (item, index) {
    xlsData += '<tbody><tr>'
    for (let key in item) {
      xlsData += '<td>' + item[key] + '</td>'
    }
    xlsData += '</tr></tbody>'
  })
  return xlsTemp.replace('${table}', xlsData)
}

function jsonToCSV (data, title = null) {
  var csvData = ''
  if (title != null) {
    if (Array.isArray(title)) {
      for (var i = 0; i < title.length; i++) {
        csvData += title[i] + '\r\n'
      }
    } else {
      csvData += title + '\r\n'
    }
  }
  for (let key in data[0]) {
    csvData += key + ','
  }
  csvData = csvData.slice(0, csvData.length - 1)
  csvData += '\r\n'
  data.map(function (item) {
    for (let key in item) {
      let escapedCSV = item[key] + '' // cast Numbers to string
      if (escapedCSV.match(/[,"\n]/)) {
        escapedCSV = '"' + escapedCSV.replace(/\"/g, '""') + '"'
      }
      csvData += escapedCSV + ','
    }
    csvData = csvData.slice(0, csvData.length - 1)
    csvData += '\r\n'
  })
  return csvData
}

function getProcessedJson (data, header) {
  let keys = getKeys(data, header)
  let newData = []
  data.map(function (item) {
    let newItem = {}
    for (let label in keys) {
      let property = keys[label]
      newItem[label] = getNestedData(property, item)
    }
    newData.push(newItem)
  })
  return newData
}

function getKeys (data, header) {
  if (header) {
    return header
  }
  let keys = {}
  for (let key in data[0]) {
    keys[key] = key
  }
  return keys
}

function callItemCallback (field, itemValue) {
  if (typeof field === 'object' && typeof field.callback === 'function') {
    return field.callback(itemValue)
  }
  return itemValue
}

function getNestedData (key, item) {
  const field = (typeof key === 'object') ? key.field : key
  let keyNestedSplit = field.split('.')
  let valueFromNestedKey = item[keyNestedSplit[0]]
  for (let j = 1; j < keyNestedSplit.length; j++) {
    valueFromNestedKey = valueFromNestedKey[keyNestedSplit[j]]
  }
  valueFromNestedKey = callItemCallback(key, valueFromNestedKey)
  return valueFromNestedKey
}

function base64ToBlob (data, mime) {
  let base64 = window.btoa(window.unescape(encodeURIComponent(data)))
  let bstr = atob(base64)
  let n = bstr.length
  let u8arr = new Uint8ClampedArray(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], {type: mime})
}
