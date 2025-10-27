import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Board from "@/components/Board";
import { useGameState } from "@/hooks/useGameState";

export default function Index() {
  const WORDS_LENGTH = 5;
  const MAX_ATTEMPTS = 5;
  const language = 'es';

  const { gameState, selectNewWord, resetGame } = useGameState( language );

  // Only run once on mount to initialize the game
  useEffect( () => {
    selectNewWord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        WORDLE ({ language }) { gameState.status }
      </Text>

      <Text>{ gameState.wordToGuess }</Text>

      <TouchableOpacity
        style={ {
          backgroundColor: '#007aff',
          padding: 10,
          borderRadius: 5
        } }
        onPress={ resetGame }
      >
        <Text style={ { color: '#fff' } }>
          Nueva Palabra
        </Text>
      </TouchableOpacity>

      <Board
        wordToGuess={ gameState.wordToGuess }
        maxAttempts={ MAX_ATTEMPTS }
        wordsLength={ WORDS_LENGTH }
      />
    </View>
  );
}
