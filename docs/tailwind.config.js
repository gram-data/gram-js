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
                "serif": ['"Cormorant Garamond"', ...defaultTheme.fontFamily.serif],
                "mono": ['"Fira Code"', ...defaultTheme.fontFamily.mono]
            },
            typography: {
              DEFAULT: {
                css: {
                  'h1,h2,h3,h4': {
                    fontWeight: 'inherit',
                  },
                  code: {
                    backgroundColor: defaultTheme.colors.gray[100],
                  },
                  'code::before': {
                    content: '""',
                  },
                  'code::after': {
                    content: '""',
                  },
                },
              },
            },
        },
    },
    variants: {},
    plugins: [
        require('@tailwindcss/typography'),
    ],
};

