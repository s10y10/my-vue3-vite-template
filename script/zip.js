import AdmZip from 'adm-zip'

const zip = new AdmZip()
zip.addLocalFolder('./', '', filename => {
  return !/node_modules|dist|^script|\.git|\.zip/.test(filename)
})
zip.writeZip('./vue3-vite-template.zip')
