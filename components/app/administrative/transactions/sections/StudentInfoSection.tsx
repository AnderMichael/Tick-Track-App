import { Screen } from '@/components/common'
import React from 'react'
import { Text, View } from 'react-native'

interface StudentInfoSectionProps {
    fullName: string
    upbCode: string
}

const StudentInfoSheet = ({ fullName, upbCode }: StudentInfoSectionProps) => {
    return (
        <Screen.Section>
            <Screen.Title>Estudiante</Screen.Title>
            <View className="bg-gray-400 p-4 rounded-xl gap-3">
                <Text className="font-outfit-bold">Nombre Completo</Text>
                <Text className="font-outfit-regular">{fullName}</Text>
                <Text className="font-outfit-bold">Código</Text>
                <Text className="font-outfit-regular">{upbCode}</Text>
            </View>
        </Screen.Section>
    )
}

export default StudentInfoSheet