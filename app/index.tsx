import { TextInput, View } from "react-native";

import Cell from "@/components/Row";



export default function Index() {
  const WORDS_LENGTH = 5;
  const MAX_ATTEMPTS = 5;

  const attempts = Array.from( { length: MAX_ATTEMPTS }, () => Array( WORDS_LENGTH ).fill( null ) );
  const attempt = [ "h", "e", "l", "l", "0" ];
  attempts[ 0 ] = attempt;

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
        Array.from( { length: MAX_ATTEMPTS } ).map( ( _, i ) => (
          <View key={ i } style={ { flexDirection: "row", gap: 10 } }>
            { Array.from( { length: WORDS_LENGTH } ).map( ( _, j ) => (
              <Cell key={ j } letter={ attempts[ i ][ j ] } />
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
