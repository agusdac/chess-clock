import colors from './colors';

const themes = [
    {
        key: 'darkWithBlue',
        background: colors.darkGrey,
        primary: colors.grey,
        secondary: colors.blueish,
        contrast: colors.white,
    },
    {
        key: 'darkWithRed',
        background: colors.darkGrey,
        primary: colors.grey,
        secondary: colors.redish,
        contrast: colors.white,
    },
    {
        key: 'darkWithGreen',
        background: colors.darkGrey,
        primary: colors.grey,
        secondary: colors.greenish,
        contrast: colors.white,
    },
    {
        key: 'darkWithBrown',
        background: colors.darkGrey,
        primary: colors.grey,
        secondary: colors.brownish,
        contrast: colors.white,
    },
    {
        key: 'lightWithGreen',
        background: colors.white,
        primary: colors.powderBlue,
        secondary: colors.shinyShamrock,
        contrast: colors.black,
    },
    {
        key: 'lightWithOrange',
        background: colors.orangeBackground,
        primary: colors.tumbleweed,
        secondary: colors.terracota,
        contrast: colors.darkSienna,
    },
]

export default themes