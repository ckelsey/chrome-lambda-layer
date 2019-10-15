const getSVG = (svg, page, styles, data) => {
    let startOfSVG = svg.split(`</svg>`).filter(b => !!b).join(`</svg>`)
    Object.keys(page.elements).forEach(elementKey => {
        const element = page.elements[elementKey]
        const attributes = []

        attributes.push(`x="${element.x}"`)

        if (element.tag === `text`) {
            attributes.push(`y="${element.y}"`)
            Object.keys(styles).forEach(styleKey => {
                if (styleKey === `fontFamily`) { return }
                const attr = styleKey === `color` ? `fill` : styleKey.replace(/(?:^|\.?)([A-Z])/g, (x, y) => `-${y.toLowerCase()}`).replace(/^_/, ``)
                const valToUse = !!element.styles[styleKey] ? element.styles[styleKey] : styles[styleKey]
                const value = [`letterSpacing`, `fontSize`].indexOf(styleKey) > -1 ? `${valToUse}px` : valToUse
                attributes.push(`${attr}="${value}"`)
            })
        } else {
            attributes.push(`href="${element.href}"`)
            attributes.push(`alignment-baseline="center"`)
            attributes.push(`width="${element.w}"`)
            attributes.push(`height="${element.h}"`)

            // TODO - weird image issue
            attributes.push(`y="${element.y - 45}"`)
        }

        startOfSVG = `${startOfSVG}<${element.tag} ${attributes.join(' ')}>${data[element.text] || element.text || ``}</${element.tag}>`
    })

    return `${startOfSVG}</svg>`
}

module.exports = getSVG