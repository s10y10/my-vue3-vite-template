const AdmZip = require('adm-zip')

const zip = new AdmZip()
zip.addLocalFolder('./', '', filename => {
  return !/node_modules|\.vscode|dist|^script|\.git|\.zip/.test(filename)
})
zip.writeZip('./vue3-vite-template.zip')
