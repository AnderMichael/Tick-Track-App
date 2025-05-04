import { WithRole } from '@/components/common'
import { Role } from '@/constants/common/roles'
import React from 'react'
import { AnnualPickerDropdown, InscriptionsDropdown } from '../dropdowns'

const HomeTimeSelector = () => {
    return (
        <>
            <WithRole allowed={[Role.STUDENT]}>
                <InscriptionsDropdown />
            </WithRole>
            <WithRole allowed={[Role.SUPERVISOR, Role.SCHOLARSHIP_OFFICER, Role.ADMIN]}>
                <AnnualPickerDropdown />
            </WithRole>
        </>
    )
}

export default HomeTimeSelector