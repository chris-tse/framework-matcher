module.exports = {
    purge: ['./src/**/*.tsx'],
    theme: {
        extend: {
            gridTemplateColumns: {
                easy: 'repeat(3, 250px)',
                medium: 'repeat(4, 200px)',
            },
            gridTemplateRows: {
                easy: 'repeat(2, 250px)',
                medium: 'repeat(3, 200px)',
            },
        },
    },
    variants: {},
    plugins: [],
}
