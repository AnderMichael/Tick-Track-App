import { Role } from "@/constants/common/roles";
import { useSession } from "@/hooks";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

interface Props {
  close?: () => Promise<void> | void;
  open?: () => Promise<void> |void;
  closeText?: string;
  openText?: string;
  isOpen?: boolean;
}

export default function LockButton({
  close,
  open,
  closeText = "Cerrar",
  openText = "Abrir",
  isOpen = true,
}: Props) {
  const { user } = useSession();

  if (!isOpen) {
    if (user?.role.includes(Role.SUPERVISOR)) {
      return (
        <TouchableOpacity
          className="bg-gray-500 rounded-full flex-row items-center px-4 py-2 h-12 opacity-60"
          disabled={!isOpen}
        >
          <MaterialIcons name="lock-open" size={18} color="white" />
          <Text className="text-white ml-2 font-outfit-medium">{openText}</Text>
        </TouchableOpacity>
      );
    }
    if (
      user?.role.includes(Role.SCHOLARSHIP_OFFICER) ||
      user?.role.includes(Role.ADMIN)
    ) {
      return (
        <TouchableOpacity
          className="bg-black rounded-full flex-row items-center px-4 py-2 h-12"
          onPress={open}
        >
          <MaterialIcons name="lock-open" size={18} color="white" />
          <Text className="text-white ml-2 font-outfit-medium">{openText}</Text>
        </TouchableOpacity>
      );
    }
  }

  return (
    <TouchableOpacity
      className="bg-black rounded-full flex-row items-center px-4 py-2 h-12"
      onPress={close}
    >
      <MaterialIcons name="lock" size={18} color="white" />
      <Text className="text-white ml-2 font-outfit-medium">{closeText}</Text>
    </TouchableOpacity>
  );
}
