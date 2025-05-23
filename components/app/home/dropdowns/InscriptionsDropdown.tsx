import { OptionDropdown } from '@/components/common';
import { SemesterItem, useSemester } from '@/context/home';
import { useSession } from '@/hooks';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useMemo } from 'react';
import { Text, View } from 'react-native';

const InscriptionsDropdown = () => {
    const { user } = useSession();
    const { inscriptions } = user!!.student!!;
    const { semester, setSemester, setInscription } = useSemester();

    const semesters = useMemo(() => {
        const semesterItems = inscriptions.map((inscription) => ({
            label: inscription.name,
            value: inscription.semester_id,
        }));

        return semesterItems;
    }, [inscriptions])

    useEffect(() => {
        if (semesters.length > 0) {
            setSemester(semesters[0]);
        }
    }, [])

    useEffect(() => {
        if (semester) {
            const inscription = inscriptions.find((inscription) => inscription.semester_id === semester.value);
            setInscription(inscription ?? null);
        }
    }, [semester])

    const handleChange = (item: SemesterItem) => {
        setSemester(item);
    };

    if (inscriptions.length === 0) {
        return <>
            <View className="flex-1 items-center justify-center gap-5">
                <MaterialCommunityIcons name="credit-card-lock" color="gray" size={100} />
                <Text className="text-center text-2xl font-outfit-extralight px-5">
                    Oops! Al parecer no cuentas con ninguna inscripción en el sistema, contáctate con el encargado de becas de tu departamento para más información.
                </Text>
            </View>
        </>;
    }

    return (
        <View className='w-full px-5'>
            <OptionDropdown
                data={semesters}
                placeholder="Semestre"
                onChange={handleChange}
                value={semester}
            />
        </View>
    )
}

export default InscriptionsDropdown