import { useCallback, useState } from "react";

import { LANGUAGES, loadWords } from "./loadWords";


type GameStatus = 'playing' | 'won' | 'lost';

interface GameState {
  words: string[];
  wordToGuess: string;
  status: GameStatus;
  language: LANGUAGES;
}

interface UseGameState {
  gameState: GameState;
  selectNewWord: () => void;
  setGame: ( status: GameStatus ) => void;
  resetGame: () => void;
}

export const useGameState = ( initialLanguage: LANGUAGES = 'es' ): UseGameState => {

  const [ gameState, setGameState ] = useState<GameState>( {
    words: [],
    wordToGuess: '',
    status: 'playing',
    language: initialLanguage
  } );

  const selectNewWord = useCallback( () => {
    if ( gameState.words.length === 0 ) {
      loadWords( gameState.language ).then( words => {
        const newWord = words[ Math.floor( Math.random() * words.length ) ];
        setGameState( prev => ( {
          ...prev,
          words,
          wordToGuess: newWord,
          status: 'playing'
        } ) );
      } );
    } else {
      const newWord = gameState.words[ Math.floor( Math.random() * gameState.words.length ) ];
      setGameState( prev => ( {
        ...prev,
        wordToGuess: newWord,
        status: 'playing'
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
