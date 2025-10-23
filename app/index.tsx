import { TextInput, View } from "react-native";

import Cell from "@/components/Cell";
import { useEffect, useState } from "react";



export default function Index() {
  const WORDS_LENGTH = 5;
  const MAX_ATTEMPTS = 5;

  const [ currentGuess, setCurrentGuess ] = useState<string[]>( [] );
  const [ allGuesses, setAllGuesses ] = useState<string[][]>( [ [] ] );

  // Test to see board is working
  useEffect( () => {
    setAllGuesses( [
      [ "a", "b", "c", "d", "a" ],
      [ "a", "b", "c", "d", "a" ],
      [ "a", "b", "c", "d", "a" ],
    ] );
    setCurrentGuess( [ "a", "c", "a", ] );
  }, [] );


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
        autoFocus
        onKeyPress={ () => { } }
        maxLength={ WORDS_LENGTH }
      />
    </View >
  );
}
