import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState(null);

  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCameraType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const handleBarCodeScanned = ({data}) => {
    setScanned(true);
    setData(data);
    // Você pode lidar com os dados do código QR aqui, por exemplo, exibi-los na interface do usuário.
    console.log(`Dados do QRCode: ${data}`);
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>Sem acesso à câmera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={cameraRef}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={styles.cameraView}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleCameraType}
          >
            <Text style={styles.buttonText}>Trocar câmera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      {scanned && (
        <View style={styles.barcodeData}>
          <Text>Dados do QR Code: {data}</Text>
          
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cameraView: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
  },
  button: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 10,
  },
  buttonText: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
  barcodeData: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default App;


