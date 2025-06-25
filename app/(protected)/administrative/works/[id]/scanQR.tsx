import { ProcessingModal, ErrorModal } from "@/components/common";
import { useSemester } from "@/context/home";
import { useProcessAccountMutation } from "@/store/api/app";
import { parseAPIError } from "@/helpers/common";
import { CameraView, useCameraPermissions } from "expo-camera";
import {
  RelativePathString,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ScanQRScreen() {
  const { id } = useLocalSearchParams();
  const { semester } = useSemester();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorObject, setErrorObject] = useState<any>(null);

  const router = useRouter();
  const [processAccount] = useProcessAccountMutation();

  const handleBarcodeScanned = async ({ data }: { data: string }) => {
    if (!scanned) {
      try {
        setScanned(true);
        setLoading(true);
        const res = await processAccount({
          account_key: data,
          semesterId: semester?.value ?? 0,
        }).unwrap();
        console.log("Cuenta procesada:", res);
        router.replace({
          pathname: `/(protected)/administrative/works/${id}/payment-form` as RelativePathString,
          params: {
            inscription_id: res.inscription_id,
            fullName: `${res.firstName} ${res.fatherLastName}`,
            upbCode: res.upbCode,
          },
        });
      } catch (error) {
        console.error("Error al procesar cuenta:", error);
        setErrorObject(error);
        setErrorVisible(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseError = () => {
    setErrorVisible(false);
    setErrorObject(null);
    setScanned(false);
  };

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Necesitamos permiso para usar la cámara
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={styles.permissionButton}
        >
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
      <ErrorModal
        visible={errorVisible}
        onClose={handleCloseError}
        message={parseAPIError(errorObject, "No se pudo procesar el código QR.")}
      />
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
