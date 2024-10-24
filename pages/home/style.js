import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#7AB2D3', // Set font color to #10375C
  },
  image: {
    width: 200,  // Adjust width as per your image
    height: 200, // Adjust height as per your image
    resizeMode: 'contain',
  },
});