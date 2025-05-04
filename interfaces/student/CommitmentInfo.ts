export interface CommitmentInfo {
    is_current: boolean
    service_details: ServiceDetails
}

interface ServiceDetails {
    percentage: number
    hours_per_semester: number
    scholarship: Scholarship
}

interface Scholarship {
    name: string
    description: string
}
