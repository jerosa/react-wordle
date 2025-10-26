import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Board from "@/components/Board";
import { loadWords } from "@/hooks/loadWords";

export default function Index() {
  const WORDS_LENGTH = 5;
  const MAX_ATTEMPTS = 5;
  const language = 'es';

  const [ words, setWords ] = useState<string[]>( [] );
  const [ wordToGuess, setWordToGuess ] = useState<string>( '' );

  const selectWordToGuess = ( words: string[] ) => {
    setWordToGuess( words[ Math.floor( Math.random() * words.length ) ] );
  };

  useEffect( () => {
    loadWords( language ).then( words => {
      setWords( words );
      selectWordToGuess( words );
    } );
  }, [] );


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
      <Text style={ { fontSize: 32, fontWeight: 'bold', marginBottom: 20 } }>
        WORDLE ({ language })
      </Text>

      <Text>{ wordToGuess }</Text>

      <TouchableOpacity
        style={ {
          backgroundColor: '#007aff',
          padding: 10,
          borderRadius: 5
        } }
        onPress={ () => selectWordToGuess( words ) }
      >
        <Text style={ { color: '#fff' } }>
          Nueva Palabra
        </Text>
      </TouchableOpacity>

      <Board
        wordToGuess={ wordToGuess }
        maxAttempts={ MAX_ATTEMPTS }
        wordsLength={ WORDS_LENGTH }
      />
    </View>
  );
}
