import { Screen } from '@/components/common'
import React from 'react'
import { Text } from 'react-native'

interface WorkInfoSectionProps {
    title: string
    description: string
}

const WorkInfoSection = ({ title, description }: WorkInfoSectionProps) => {
    return (
        <Screen.Section>
            <Text className="font-outfit-bold text-2xl">{title}</Text>
            <Text className="font-outfit-regular text-base">
                {description}
            </Text>
        </Screen.Section>
    )
}

export default WorkInfoSection