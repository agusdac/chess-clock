import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

export const initLocalizable = () => {
    // Set the key-value pairs for the different languages you want to support.
    i18n.translations = {
        en: {
            moves: 'Moves: ',
            timeControl: 'Time Control',
            time: 'Time',
            increment: 'Increment',
            timePlayer1: 'Time for player 1',
            timePlayer2: 'Time for player 2',
            newTimeControl: 'New time control',
            name: 'Name',
            settings: 'Settings',
        },
        es: {
            moves: 'Movimientos: ',
            timeControl: 'Controles de tiempo',
            time: 'Tiempo',
            increment: 'Incremento',
            timePlayer1: 'Tiempo para el jugador 1',
            timePlayer2: 'Tiempo para el jugador 2',
            newTimeControl: 'Nuevo control de tiempo',
            name: 'Nombre',
            settings: 'Ajustes',
        },
        ca: {
            moves: 'Moviments: ',
            timeControl: 'Controls de temps',
            time: 'Temps',
            increment: 'Increment',
            timePlayer1: 'Temps pel jugador 1',
            timePlayer2: 'Temps pel jugador 2',
            newTimeControl: 'Nou control de temps',
            name: 'Nom',
            settings: 'Configuració',
        },
    };
    // Set the locale once at the beginning of your app.
    i18n.locale = Localization.locale;
    // When a value is missing from a language it'll fallback to another language with the key present.
    i18n.fallbacks = true;
}

export const translate = key => {
    return i18n.t(key)
}