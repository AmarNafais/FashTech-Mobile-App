import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    height: '100%',
  },
  content: {
    padding: 16,
    height: '100%',
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  price: {
    fontSize: 20,
    color: '#666666',
    marginTop: 4,
  },
  imageContainer: {
    height: '40%',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  controls: {
    gap: 12,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 8,
  },
  colorSection: {
    gap: 8,
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  colorButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  colorButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: '#1A1A1A',
  },
  sizeSection: {
    gap: 8,
    marginBottom: 8,
  },
  picker: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: 40,
  },
  actionButtons: {
    gap: 8,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  requestButton: {
    backgroundColor: '#1A1A1A',
  },
  addButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#1A1A1A',
  },
  bagButton: {
    backgroundColor: '#A87676',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  productDetails: {
    borderTopWidth: 1,
    borderColor: '#E5E5E5',
    paddingTop: 12,
    marginTop: 12,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  detailItem: {
    flex: 1,
    minWidth: '45%',
  },
  detailLabel: {
    fontSize: 12,
    color: '#666666',
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 2,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },  
});
export default styles;