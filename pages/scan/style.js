import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#A87676', // Set font color to #10375C
  },
  image: {
    width: 400,  // Adjust width as per your image
    height: 400, // Adjust height as per your image
    resizeMode: 'contain',
  },
});