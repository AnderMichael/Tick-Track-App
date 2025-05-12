import { ProcessingModal } from "@/components/common"; // Importa el modal de carga
import { useProcessAccountMutation } from "@/store/api/home";
import { CameraView, useCameraPermissions } from "expo-camera";
import { RelativePathString, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ScanQRScreen() {
  const { id } = useLocalSearchParams();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [processAccount] = useProcessAccountMutation();

  const handleBarcodeScanned = async ({ data }: { data: string }) => {
    if (!scanned) {
      try {
        setScanned(true);
        setLoading(true);
        const res = await processAccount({ account_key: data }).unwrap();
        router.replace({
          pathname: `(protected)/administrative/works/${id as string}/payment-form` as RelativePathString,
          params: { commitment_id: res.commitment_id, fullName: `${res.firstName} ${res.fatherLastName}`, upbCode: res.upbCode },
        });
      } catch (error) {
        console.error("Error al procesar cuenta:", error);
        setScanned(false);
        setLoading(false);
      }
    }
  };

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Necesitamos permiso para usar la cámara</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
          <Text style={styles.buttonText}>Conceder Permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.frame} />
      <ProcessingModal visible={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
  },
  message: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
    marginBottom: 10,
  },
  permissionButton: {
    alignSelf: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {
    fontWeight: "bold",
    color: "black",
  },
  frame: {
    width: 250,
    height: 250,
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 20,
    alignSelf: "center",
    marginTop: "30%",
  },
});
