/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#14213D',
                    50: '#E8EBF0',
                    100: '#D1D7E1',
                    200: '#A3AFC3',
                    300: '#7587A5',
                    400: '#475F87',
                    500: '#14213D',
                    600: '#101A31',
                    700: '#0C1425',
                    800: '#080D19',
                    900: '#04070C',
                },
                accent: {
                    DEFAULT: '#FCA311',
                    50: '#FEF3E0',
                    100: '#FEE7C1',
                    200: '#FDCF83',
                    300: '#FDB745',
                    400: '#FCA311',
                    500: '#D88A0E',
                    600: '#B4710B',
                    700: '#905808',
                    800: '#6C3F05',
                    900: '#482602',
                },
            },
        },
    },
    plugins: [],
}
