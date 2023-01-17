import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  
  container: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    ...{
      zIndex: 1
    }
  },
  noScrollContainer: {
      width: '100%',
      flexDirection: 'column',
      flex: 1,
      padding: 15,
      paddingHorizontal: 10
  },
  mapContainer: {
    height: 450,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerPin: {
    zIndex: 9999,
    marginTop: -30
  }
});