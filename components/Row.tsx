import { Text, View } from 'react-native';

interface Props {
  letter: string;
}


const Cell = ( { letter }: Props ) => {
  return (
    <View style={ {
      width: 100,
      height: 100,
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'lightgray'
    } }>
      <Text style={ { textAlign: 'center', justifyContent: 'center' } }>{ letter }</Text>
    </View>
  );
};
export default Cell;
