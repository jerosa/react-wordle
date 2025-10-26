export type LANGUAGES = 'es' | 'en';

interface WordList {
  words: string[];
}

export const loadWords = async ( language: LANGUAGES ): Promise<string[]> => {
  try {
    console.info( `Loading words for language: ${ language }` );
    let wordList: WordList;

    // Import JSON files directly to work with web
    if ( language === 'en' ) {
      wordList = require( '../assets/json/words-en.json' );
    } else {
      wordList = require( '../assets/json/words-es.json' );
    }

    return wordList.words;
  } catch ( error ) {
    console.error( 'Error loading words:', error );
    return language === 'en'
      ? [ 'banal', 'proxy', 'siege' ]
      : [ 'gatos', 'perro', 'playa' ];
  }
};
