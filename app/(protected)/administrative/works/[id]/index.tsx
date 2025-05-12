import { ProcessingModal, Screen } from '@/components/common';
import { formatDate } from '@/helpers/common';
import { useWorkQuery } from '@/store/api/home';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function WorkDetailScreen() {
    const { id } = useLocalSearchParams();
    const { data: work, isLoading, isFetching, refetch } = useWorkQuery({ id: id as string });

    if (isLoading || isFetching) return <ProcessingModal visible/>;

    return (
        <Screen>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 20 }}
                refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
            >
                <Screen.Section>
                    <View className="flex-row justify-between items-center">
                        <TouchableOpacity className="bg-black rounded-full flex-row items-center px-4 py-2 h-12">
                            <MaterialIcons name="lock" size={18} color="white" />
                            <Text className="text-white ml-2 font-outfit-medium">Cerrar</Text>
                        </TouchableOpacity>
                        <View className="flex-row gap-2">
                            <TouchableOpacity className="bg-gray-200 rounded-full p-3">
                                <MaterialIcons name="edit" size={20} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-gray-200 rounded-full p-3">
                                <MaterialIcons name="delete" size={20} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text className="text-2xl font-outfit-bold mb-3">{work!.title}</Text>
                    <Text className="text-base font-outfit-regular mb-4 leading-6">
                        {work!.description}
                    </Text>

                    {/* Fechas */}
                    <View className="flex-row bg-white border border-gray-300 rounded-2xl p-4 justify-start gap-10">
                        <View>
                            <Text className="font-outfit-medium text-sm mb-1">Fecha Inicio</Text>
                            <Text className="font-outfit-bold">{formatDate(work!.date_begin)}</Text>
                        </View>
                        <View>
                            <Text className="font-outfit-medium text-sm mb-1">Fecha Fin</Text>
                            <Text className="font-outfit-bold">{formatDate(work!.date_end)}</Text>
                        </View>
                    </View>
                    {/* Autor */}
                    <Text className="text-base font-outfit-bold">Autor <Text className="font-outfit-regular">{work!.administrative_id}</Text></Text>

                    {/* Acciones */}
                    <View className="flex-row justify-between">
                        <TouchableOpacity className="bg-black rounded-2xl p-5 flex-1 mr-2 h-28">
                            <Text className="text-white font-outfit-bold">Transacciones</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Acciones QR */}
                    <View className="flex-row justify-between">
                        <TouchableOpacity className="items-center flex-1">
                            <View className="w-20 h-20 bg-gray-200 rounded-full justify-center items-center mb-2">
                                <MaterialCommunityIcons name="qrcode-scan" size={30} color="black" />
                            </View>
                            <Text className="font-outfit-medium">Escanear QR</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="items-center flex-1">
                            <View className="w-20 h-20 bg-gray-200 rounded-full justify-center items-center mb-2">
                                <MaterialCommunityIcons name="qrcode" size={30} color="black" />
                            </View>
                            <Text className="font-outfit-medium">Seleccionar QR</Text>
                        </TouchableOpacity>
                    </View>
                </Screen.Section>
            </ScrollView>
        </Screen>
    );
}
