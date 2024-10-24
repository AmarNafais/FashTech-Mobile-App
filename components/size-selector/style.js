import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  sizeBox: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#007BFF',
    backgroundColor: '#fff',
  },
  selectedSizeBox: {
    backgroundColor: '#007BFF',
  },
  sizeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});