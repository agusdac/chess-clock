import colors from './colors';

const themes = [
    {
        key: 'darkWithBlue',
        background: colors.darkGrey,
        primary: colors.grey,
        secondary: colors.blueish,
        contrast: colors.white,
        win: colors.shamrockGreen,
        lose: colors.internationalRed
    },
    {
        key: 'darkWithRed',
        background: colors.darkGrey,
        primary: colors.grey,
        secondary: colors.redish,
        contrast: colors.white,
        win: colors.shamrockGreen,
        lose: colors.internationalRed
    },
    {
        key: 'darkWithGreen',
        background: colors.darkGrey,
        primary: colors.grey,
        secondary: colors.greenish,
        contrast: colors.white,
        win: colors.shamrockGreen,
        lose: colors.internationalRed
    },
    {
        key: 'darkWithBrown',
        background: colors.darkGrey,
        primary: colors.grey,
        secondary: colors.brownish,
        contrast: colors.white,
        win: colors.shamrockGreen,
        lose: colors.internationalRed
    },
    {
        key: 'lightWithGreen',
        background: colors.greenishWhite,
        primary: colors.shamrockGreen,
        secondary: colors.shinyShamrock,
        contrast: colors.darkSienna,
        win: colors.lightGreen,
        lose: colors.lightRed
    },
    {
        key: 'lightWithOrange',
        background: colors.orangeBackground,
        primary: colors.tumbleweed,
        secondary: colors.terracota,
        contrast: colors.darkSienna,
        win: colors.lightGreen,
        lose: colors.lightRed
    },
]

export default themes