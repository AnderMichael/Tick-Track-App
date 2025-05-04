import { OptionDropdown } from '@/components/common';
import { SemesterItem, useSemester } from '@/context/home';
import { useSession } from '@/hooks';
import React, { useEffect, useMemo } from 'react';

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

    return (
        <OptionDropdown
            data={semesters}
            placeholder="Semestre"
            onChange={handleChange}
            value={semester}
        />
    )
}

export default InscriptionsDropdown