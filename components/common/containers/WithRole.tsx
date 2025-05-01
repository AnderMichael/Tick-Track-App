import { Role } from "@/constants/common/roles";
import { useSession } from "@/hooks/common/useSession";
import { ReactNode } from "react";

interface WithRoleProps {
    children: ReactNode;
    allowed: Role[];
    fallback?: ReactNode;
}

const WithRole = ({ children, allowed, fallback = null }: WithRoleProps) => {
    const { user } = useSession();

    if (!user || !allowed.includes(user.role as Role)) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
};

export default WithRole;
