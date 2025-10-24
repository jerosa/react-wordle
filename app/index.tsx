import { useRef, useState } from "react";
import { TextInput, TextInputKeyPressEvent, View } from "react-native";

import Cell from "@/components/Cell";


export default function Index() {
  const WORDS_LENGTH = 5;
  const MAX_ATTEMPTS = 5;

  const [ currentGuess, setCurrentGuess ] = useState<string[]>( [] );
  const [ allGuesses, setAllGuesses ] = useState<string[][]>( [] );
  const input = useRef<TextInput>( null );


  const handleOnKeyPress = ( e: TextInputKeyPressEvent ) => {
    if ( allGuesses.length === MAX_ATTEMPTS ) {
      return;
    }
    const key = e.nativeEvent.key;
    if ( key === "Backspace" ) {
      setCurrentGuess( ( prev ) => prev.slice( 0, -1 ) );
    }
    else if ( currentGuess.length < MAX_ATTEMPTS && /^[A-Za-z]$/.test( key ) ) {
      setCurrentGuess( ( prev ) => [ ...prev, key.toUpperCase() ] );
    }
    else if ( currentGuess.length === WORDS_LENGTH && key === "Enter" ) {
      setAllGuesses( ( prev ) => [ ...prev, currentGuess ] );
      setCurrentGuess( [] );

      // TODO: add word check

      // force focus
      setTimeout( () => {
        input.current?.focus();
      }, 10 );
    }
  };


  // Board setup using all guesses and current guess
  const board = Array.from( { length: MAX_ATTEMPTS }, ( _, i ) => {
    if ( i < allGuesses.length ) {
      return allGuesses[ i ];
    }
    else if ( i === allGuesses.length && allGuesses.length < MAX_ATTEMPTS ) {
      return currentGuess;
    }
    else {
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

      {
        board.map( ( word, i ) => (
          <View key={ i } style={ { flexDirection: "row", gap: 10 } }>
            { Array.from( { length: WORDS_LENGTH } ).map( ( _, j ) => (
              <Cell key={ j } letter={ word[ j ] || '' } />
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
        editable={ allGuesses.length !== MAX_ATTEMPTS }
      />
    </View >
  );
}
