import React, { useEffect } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";

import Board from "@/components/Board";
import { useGameState } from "@/hooks/useGameState";

export default function Index() {
  const WORDS_LENGTH = 5;
  const MAX_ATTEMPTS = 5;
  const language = 'es';

  const { gameState, selectNewWord, resetGame, setGame } = useGameState( language );
  const fadeAnim = React.useRef( new Animated.Value( 0 ) ).current;

  // Only run once on mount to initialize the game
  useEffect( () => {
    selectNewWord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

  const fadeIn = () => {
    Animated.timing( fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    } ).start();
  };

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
        gameState={ gameState }
        onGameStatus={ ( status ) => {
          if ( status !== 'playing' ) {
            setGame( status );
            fadeIn();
          }
        } }
      />

      { gameState.status !== 'playing' && (
        <Animated.View
          style={ {
            opacity: fadeAnim,
            marginTop: 20,
            padding: 16,
            borderRadius: 8,
            backgroundColor: gameState.status === 'won' ? '#4ade80' : '#f87171',
            width: '80%',
            maxWidth: 400,
          } }
        >
          <Text style={ {
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 8
          } }>
            { gameState.status === 'won' ? '¡Felicitaciones!' : 'Game Over' }
          </Text>
          <Text style={ {
            color: 'white',
            textAlign: 'center',
            marginBottom: 16
          } }>
            { gameState.status === 'won'
              ? `¡Has adivinado la palabra ${ gameState.wordToGuess }!`
              : `La palabra correcta era: ${ gameState.wordToGuess }` }
          </Text>
        </Animated.View>
      ) }
    </View>
  );
}
