import { View } from "react-native";
import Cell from "./Cell";

interface RowProps {
  word: string[];
  result?: string[];
  wordLength: number;
}

export default function Row({ word, result, wordLength }: RowProps) {
  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      {Array.from({ length: wordLength }).map((_, j) => (
        <Cell
          key={j}
          letter={word[j] || ''}
          cellColor={result ? result[j] : 'white'}
        />
      ))}
    </View>
  );
}
