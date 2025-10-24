import { useEffect, useRef, useState } from "react";
import { Text, TextInput, TextInputKeyPressEvent, View } from "react-native";

import Cell from "@/components/Cell";


export default function Index() {
  const WORDS_LENGTH = 5;
  const MAX_ATTEMPTS = 5;

  const words = [ 'banal', 'proxy', 'siege' ];

  const [ currentGuess, setCurrentGuess ] = useState<string[]>( [] );
  const [ history, setHistory ] = useState<{ guess: string[]; result: string[]; }[]>( [] );
  const [ wordToGuess, setWordToGuess ] = useState( () => words[ Math.floor( Math.random() * words.length ) ] );

  const input = useRef<TextInput>( null ); // to enable focus

  // Reset history and guess when wordToGuess changes
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
    setHistory( prev => [ ...prev, { guess: guessArr, result: colors } ] );
  };

  const handleOnKeyPress = ( e: TextInputKeyPressEvent ) => {
    if ( history.length === MAX_ATTEMPTS ) {
      return;
    }
    const key = e.nativeEvent.key;
    if ( key === 'Backspace' ) {
      setCurrentGuess( prev => prev.slice( 0, -1 ) );
    } else if ( currentGuess.length < WORDS_LENGTH && /^[A-Za-z]$/.test( key ) ) {
      setCurrentGuess( prev => [ ...prev, key.toUpperCase() ] );
    } else if ( currentGuess.length === WORDS_LENGTH && key === 'Enter' ) {
      submitGuess( currentGuess, wordToGuess );
      setCurrentGuess( [] );
      setTimeout( () => {
        input.current?.focus();
      }, 10 );
    }
  };

  // Board setup using history and current guess
  const board = Array.from( { length: MAX_ATTEMPTS }, ( _, i ) => {
    if ( i < history.length ) {
      return history[ i ].guess;
    } else if ( i === history.length && history.length < MAX_ATTEMPTS ) {
      return currentGuess;
    } else {
      return [];
    }
  } );

  return (
    <View
      style={ {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 10,
      } }
    >
      <Text>Word To Guess:  { wordToGuess }</Text>
      <Text
        style={ { color: '#007aff', marginBottom: 10, textDecorationLine: 'underline', cursor: 'pointer' } }
        onPress={ () => setWordToGuess( words[ Math.floor( Math.random() * words.length ) ] ) }
      >
        New Word
      </Text>

      {
        board.map( ( word, i ) => (
          <View key={ i } style={ { flexDirection: "row", gap: 10 } }>
            { Array.from( { length: WORDS_LENGTH } ).map( ( _, j ) => (
              <Cell
                key={ j }
                letter={ word[ j ] || '' }
                cellColor={
                  i < history.length
                    ? history[ i ].result[ j ]
                    : 'white'
                }
              />
            ) ) }
          </View>
        ) )
      }
      <TextInput style={ { backgroundColor: 'lightgray' } }
        ref={ input }
        autoFocus
        onKeyPress={ handleOnKeyPress }
        maxLength={ WORDS_LENGTH }
        value={ currentGuess.join( '' ) }
        editable={ history.length !== MAX_ATTEMPTS }
      />
    </View >
  );
}
