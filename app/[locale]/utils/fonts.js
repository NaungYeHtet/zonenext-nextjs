import { Noto_Sans, Poppins } from 'next/font/google';

export const noto_sans_init = Noto_Sans({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-noto_sans',
    weight: ['300', '600'],
});

export const poppins_init = Poppins({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    weight: ['300', '600'],
});

export const noto_sans = noto_sans_init.variable;
export const poppins = poppins_init.variable;