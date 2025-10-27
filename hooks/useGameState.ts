import { useCallback, useState } from "react";

import { LANGUAGES, loadWords } from "./loadWords";


export type GameStatus = 'playing' | 'won' | 'lost';

export interface GameState {
  words: string[];
  wordToGuess: string;
  status: GameStatus;
  language: LANGUAGES;
  maxAttempts: number;
  wordsLength: number;
}

interface UseGameState {
  gameState: GameState;
  selectNewWord: () => void;
  setGame: ( status: GameStatus ) => void;
  resetGame: () => void;
}

export const useGameState = ( initialLanguage: LANGUAGES = 'es' ): UseGameState => {
  const DEFAULT_ATTEMPTS = 5;
  const DEFAULT_WORD_LENGTH = 5;

  const [ gameState, setGameState ] = useState<GameState>( {
    words: [],
    wordToGuess: '',
    status: 'playing',
    language: initialLanguage,
    maxAttempts: DEFAULT_ATTEMPTS,
    wordsLength: DEFAULT_WORD_LENGTH
  } );

  const selectNewWord = useCallback( () => {
    if ( gameState.words.length === 0 ) {
      loadWords( gameState.language ).then( words => {
        const newWord = words[ Math.floor( Math.random() * words.length ) ];
        setGameState( prev => ( {
          ...prev,
          words,
          wordToGuess: newWord,
          status: 'playing',
          wordsLength: newWord.length
        } ) );
      } );
    } else {
      const newWord = gameState.words[ Math.floor( Math.random() * gameState.words.length ) ];
      setGameState( prev => ( {
        ...prev,
        wordToGuess: newWord,
        status: 'playing',
        wordsLength: newWord.length
      } ) );
    }
  }, [ gameState.language, gameState.words ] );

  const setGame = useCallback( ( status: GameStatus ) => {
    setGameState( prev => ( {
      ...prev,
      status: status
    } ) );
  }, [] );

  const resetGame = useCallback( () => {
    selectNewWord();
  }, [ selectNewWord ] );

  return {
    // params
    gameState,

    // methods
    selectNewWord,
    setGame,
    resetGame
  };
};
