import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './vendor/laravel/jetstream/**/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],

    theme: {
        extend: {

            colors: {
                        'mantis': {
            '50': '#f5faf3',
            '100': '#e7f5e3',
            '200': '#d0eac8',
            '300': '#aad89d',
            '400': '#6eb75a',
            '500': '#59a245',
            '600': '#458534',
            '700': '#38692c',
            '800': '#305427',
            '900': '#284522',
            '950': '#11250e',
        },
            },

            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms, typography],
};
