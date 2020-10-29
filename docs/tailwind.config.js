const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    future: {
        // removeDeprecatedGapUtilities: true,
        // purgeLayersByDefault: true,
        // defaultLineHeights: true,
        // standardFontWeights: true
    },
    purge: [],
    important: false,
    theme: {
        extend: {
            fontFamily: {
                "sans": ['"Open Sans"', ...defaultTheme.fontFamily.sans],
                "mono": ['"Fira Code"', ...defaultTheme.fontFamily.mono]
              }      
        },
    },
    variants: {},
    plugins: [
        require('@tailwindcss/typography'),
    ],
};

