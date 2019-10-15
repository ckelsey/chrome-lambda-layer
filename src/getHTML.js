// const fs = require('fs')
// const path = require('path')
const getSVG = require('./getSVG')
const getHTML = (svgs, pages, styles, data) => {
    const svgStrings = svgs.map((svg, index) => getSVG(svg, pages[index], styles, data))
    // const svgMarkup = svgStrings.map((svg, index) => `<div id="svg_containter_${index}">${svg}</div>`)
    // const jsPdfContents = fs.readFileSync(path.resolve(`./src/jspdf.min.txt`), 'utf8')
    // const svg2PdfContents = fs.readFileSync(path.resolve(`./src/svg2pdf.min.txt`), 'utf8')
    // const head = `<head><script>${jsPdfContents}</script><script>${svg2PdfContents}</script></head>`
    // const setSVGVar = i => `window.svg${i} = document.getElementById('svg_containter_${i}');`
    // const setSvgConvert = i => `svg2pdf( window.svg${i}, window.pdf, { xOffset: 0, yOffset: 0, scale: 1 } );`
    // const setNewPage = i => i !== svgStrings.length - 1 ? 'window.pdf.addPage();' : ''
    // const svgCode = svgStrings.map((s, i) => `${setSVGVar(i)}${setSvgConvert(i)}${setNewPage(i)}`).join(' ')
    // const scriptToRun = `<script> window.pdf = new jsPDF('p', 'pt', [792, 612]); ${svgCode} window.PDFExportData = window.pdf.output('datauristring'); </script>`
    // const scriptToRun = `<canvas id="canvas"><script> var canvas=document.getElementById('canvas');canvas.getContext('2d').fillRect(25, 25, 100, 100); window.pdf = new jsPDF('p', 'pt', [792, 612]); window.pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0);</script>`
    return `<!DOCTYPE html><html lang="en"><head><style>body{width:1280px;margin:0;padding:0;}svg,div{width:100%;height:auto;}</style></head><body>${svgStrings[0]}</body></html>`

}

module.exports = getHTML