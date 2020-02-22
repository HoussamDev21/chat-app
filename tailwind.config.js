module.exports = {
    theme: {
        extend: {
            colors: {
                primary: {
                    100: 'var(--primary-100)',
                    200: 'var(--primary-200)',
                    300: 'var(--primary-300)',
                    400: 'var(--primary-400)',
                    500: 'var(--primary-500)',
                    600: 'var(--primary-600)',
                    700: 'var(--primary-700)',
                    800: 'var(--primary-800)',
                    900: 'var(--primary-900)',
                },
                gray: {
                    100: 'var(--gray-100)',
                    200: 'var(--gray-200)',
                    300: 'var(--gray-300)',
                    400: 'var(--gray-400)',
                    500: 'var(--gray-500)',
                    600: 'var(--gray-600)',
                    700: 'var(--gray-700)',
                    800: 'var(--gray-800)',
                    900: 'var(--gray-900)',
                },
                black: 'var(--black)',
                white: 'var(--white)'
            }
        }
    },
    variants: {
        backgroundColor: ['hover', 'focus', 'focus-within'],
        boxShadow: ['hover', 'focus', 'focus-within'],
        borderColor: ['last', 'focus'],
        margin: ['last'],
    },
    plugins: [],
}