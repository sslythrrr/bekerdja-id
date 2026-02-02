import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from './StatusBadge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Pencil, Trash2, Phone, Briefcase, Calendar, ChevronDown } from 'lucide-react';

export function CandidateCardList({ candidates, onEdit, onDelete, onStatusChange }) {
    const formatDate = (date) => {
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${month}/${day}/${year}`;
    };

    return (
        <div className="md:hidden space-y-4">
            {candidates.map((candidate) => (
                <Card key={candidate.id}>
                    <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg text-gray-900">{candidate.name}</h3>
                                <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>{formatDate(candidate.createdAt)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2 mb-3">
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                <Briefcase className="h-3 w-3" />
                                <span>{candidate.position}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                <Phone className="h-3 w-3" />
                                <span>{candidate.phone}</span>
                            </div>
                        </div>
                        <div className="mb-3">
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
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onEdit(candidate)}
                            >
                                <Pencil className="h-4 w-4 mr-1" />
                                Edit
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onDelete(candidate.id)}
                            >
                                <Trash2 className="h-4 w-4 mr-1 text-red-500" />
                                Delete
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
