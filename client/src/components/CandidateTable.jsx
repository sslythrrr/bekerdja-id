import { StatusBadge } from './StatusBadge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Pencil, Trash2, ArrowUpDown, ChevronDown } from 'lucide-react';

export function CandidateTable({
    candidates,
    onEdit,
    onDelete,
    onStatusChange,
    sortField,
    sortDirection,
    onSort
}) {
    const formatDate = (date) => {
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${month}/${day}/${year}`;
    };

    const SortButton = ({ field, children }) => (
        <button
            onClick={() => onSort(field)}
            className="flex items-center gap-1 hover:text-primary transition-colors"
        >
            {children}
            <ArrowUpDown className={`h-3 w-3 ${sortField === field ? 'text-primary' : 'text-gray-400'}`} />
        </button>
    );

    return (
        <div className="hidden md:block rounded-lg border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <SortButton field="createdAt">Date</SortButton>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <SortButton field="name">Name</SortButton>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <SortButton field="position">Position</SortButton>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Phone
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <SortButton field="status">Status</SortButton>
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {candidates.map((candidate) => (
                        <tr key={candidate.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatDate(candidate.createdAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {candidate.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {candidate.position}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {candidate.phone}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="flex items-center gap-1 hover:opacity-80 transition-opacity">
                                            <StatusBadge status={candidate.status} />
                                            <ChevronDown className="h-3 w-3 text-gray-400" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start">
                                        <DropdownMenuItem onClick={() => onStatusChange(candidate.id, 'new')}>
                                            New
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => onStatusChange(candidate.id, 'interested')}>
                                            Interested
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => onStatusChange(candidate.id, 'contacted')}>
                                            Contacted
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => onStatusChange(candidate.id, 'rejected')}>
                                            Rejected
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onEdit(candidate)}
                                        title="Edit candidate"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onDelete(candidate.id)}
                                        title="Delete candidate"
                                    >
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
