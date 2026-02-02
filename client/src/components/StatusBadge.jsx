import { Badge } from '@/components/ui/badge';

export function StatusBadge({ status }) {
    const variants = {
        new: { variant: 'secondary', label: 'New' },
        interested: { variant: 'success', label: 'Interested' },
        contacted: { variant: 'default', label: 'Contacted' },
        rejected: { variant: 'destructive', label: 'Rejected' },
    };

    const config = variants[status];

    return (
        <Badge variant={config.variant}>
            {config.label}
        </Badge>
    );
}
