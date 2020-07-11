module.exports = {
    purge: ['./src/**/*.tsx'],
    theme: {
        extend: {
            gridTemplateColumns: {
                easyMobile: 'repeat(2, 150px)',
                easy: 'repeat(3, 250px)',
                medium: 'repeat(4, 200px)',
            },
            gridTemplateRows: {
                easyMobile: 'repeat(3, 150px)',
                easy: 'repeat(2, 250px)',
                medium: 'repeat(3, 200px)',
            },
        },
    },
    variants: {},
    plugins: [],
}
