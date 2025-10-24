import { Text, View } from 'react-native';

interface Props {
  letter: string;
  cellColor: string;
}


const getWordleColor = ( color: string ) => {
  switch ( color ) {
    case 'green':
      return '#6aaa64';
    case 'yellow':
      return '#c9b458';
    case 'gray':
      return '#787c7e';
    case 'white':
    default:
      return '#fff';
  }
};

const Cell = ( { letter, cellColor }: Props ) => {
  return (
    <View style={ {
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#d3d6da',
      backgroundColor: getWordleColor( cellColor ),
    } }>
      <Text style={ { textAlign: 'center', fontWeight: 'bold', fontSize: 32, color: '#222' } }>{ letter }</Text>
    </View>
  );
};
export default Cell;
