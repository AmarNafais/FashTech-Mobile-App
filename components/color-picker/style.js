import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  colorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  colorBox: {
    width: 40,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  checkMark: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});