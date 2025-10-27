import { useEffect, useRef, useState } from "react";
import { TextInput, TextInputKeyPressEvent, View } from "react-native";

import { GameState, GameStatus } from "@/hooks/useGameState";
import Row from "./Row";

interface BoardHistory {
  guess: string[];
  result: string[];
}


interface BoardProps {
  gameState: GameState;
  onGameStatus: ( status: GameStatus ) => void;
}

export default function Board( { gameState, onGameStatus }: BoardProps ) {
  const { wordToGuess, status: gameStatus, maxAttempts, wordsLength } = gameState;

  const [ currentGuess, setCurrentGuess ] = useState<string[]>( [] );
  const [ history, setHistory ] = useState<BoardHistory[]>( [] );
  const input = useRef<TextInput>( null );

  useEffect( () => {
    setHistory( [] );
    setCurrentGuess( [] );
    setTimeout( () => {
      input.current?.focus();
    }, 10 );
  }, [ wordToGuess ] );

  const submitGuess = ( guessArr: string[], target: string ) => {
    const guess = guessArr.join( '' ).toUpperCase();
    const targetUpper = target.toUpperCase();
    const colors: ( 'gray' | 'green' | 'yellow' )[] = Array( guess.length ).fill( 'gray' );
    const letterCount: Record<string, number> = {};

    // count letter ocurrence for yellow check
    for ( let i = 0; i < targetUpper.length; i++ ) {
      letterCount[ targetUpper[ i ] ] = ( letterCount[ targetUpper[ i ] ] || 0 ) + 1;
    }

    // mark greens
    for ( let i = 0; i < guess.length; i++ ) {
      if ( guess[ i ] === targetUpper[ i ] ) {
        colors[ i ] = 'green';
        letterCount[ guess[ i ] ]--;
      }
    }

    // mark yellows
    for ( let i = 0; i < guess.length; i++ ) {
      if ( colors[ i ] === 'gray' && letterCount[ guess[ i ] ] > 0 ) {
        colors[ i ] = 'yellow';
        letterCount[ guess[ i ] ]--;
      }
    }

    const newHistory = [ ...history, { guess: guessArr, result: colors } ];
    setHistory( newHistory );
    const isWin = colors.every( color => color === 'green' );
    if ( isWin ) {
      onGameStatus( 'won' );
    } else if ( newHistory.length === maxAttempts ) {
      onGameStatus( 'lost' );
    }
  };

  const handleGuessSubmission = () => {
    if ( gameStatus !== 'playing' || currentGuess.length !== wordsLength ) return;

    submitGuess( currentGuess, wordToGuess );
    setCurrentGuess( [] );
    setTimeout( () => {
      input.current?.focus();
    }, 100 );
  };

  const handleOnKeyPress = ( e: TextInputKeyPressEvent ) => {
    if ( gameStatus !== 'playing' ) return;

    const key = e.nativeEvent.key;
    if ( key === 'Backspace' ) {
      setCurrentGuess( prev => prev.slice( 0, -1 ) );
    } else if ( currentGuess.length < wordsLength && /^[A-Za-z]$/.test( key ) ) {
      setCurrentGuess( prev => [ ...prev, key.toUpperCase() ] );
    } else if ( currentGuess.length === wordsLength && key === 'Enter' ) {
      handleGuessSubmission();
    }
  };

  // Board setup using history and current guess
  const board = Array.from( { length: maxAttempts }, ( _, i ) => {
    if ( i < history.length ) {
      return history[ i ].guess;
    } else if ( i === history.length && history.length < maxAttempts ) {
      return currentGuess;
    } else {
      return [];
    }
  } );

  return (
    <View style={ { gap: 10 } }>
      { board.map( ( word, i ) => (
        <Row
          key={ i }
          word={ word }
          result={ i < history.length ? history[ i ].result : undefined }
          wordLength={ wordsLength }
        />
      ) ) }
      <TextInput
        style={ { backgroundColor: 'lightgray' } }
        ref={ input }
        autoFocus
        onKeyPress={ handleOnKeyPress }
        onSubmitEditing={ handleGuessSubmission }
        maxLength={ wordsLength }
        value={ currentGuess.join( '' ) }
        editable={ gameStatus === 'playing' }
      />
    </View>
  );
}
