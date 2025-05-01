import { SandglassIcon } from '@/components/common/icon'
import React from 'react'
import { Text, View } from 'react-native'

const AppPresentation = () => {
    return (
        <>
            <View className='flex items-center justify-center mb-5'>
                <SandglassIcon />
            </View>
            <Text className="text-4xl font-outfit-bold">Tick Track</Text>
        </>
    )
}

export default AppPresentation