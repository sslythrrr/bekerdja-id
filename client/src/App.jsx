import { useState, useMemo } from 'react';
import { StatsCards } from './components/StatsCards';
import { CandidateTable } from './components/CandidateTable';
import { CandidateCardList } from './components/CandidateCardList';
import { CandidateForm } from './components/CandidateForm';
import { DeleteAlert } from './components/DeleteAlert';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { mockCandidates } from './data/mockData';
import { Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react';

function App() {
  const [candidates, setCandidates] = useState(mockCandidates);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState(undefined);
  const [deleteAlert, setDeleteAlert] = useState({
    open: false,
    id: '',
    name: '',
  });

  // Sorting state
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate stats
  const stats = useMemo(() => {
    const total = candidates.length;
    const interested = candidates.filter(c => c.status === 'interested').length;
    const contacted = candidates.filter(c => c.status === 'contacted').length;
    return { total, interested, contacted };
  }, [candidates]);

  // Filter and sort candidates
  const filteredAndSortedCandidates = useMemo(() => {
    let filtered = candidates.filter(candidate => {
      const matchesSearch =
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.phone.includes(searchQuery);

      const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle date sorting
      if (sortField === 'createdAt') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      // Handle string sorting
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [candidates, searchQuery, statusFilter, sortField, sortDirection]);

  // Paginate
  const totalPages = Math.ceil(filteredAndSortedCandidates.length / itemsPerPage);
  const paginatedCandidates = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedCandidates.slice(startIndex, endIndex);
  }, [filteredAndSortedCandidates, currentPage]);

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle save (add or edit)
  const handleSave = (candidateData) => {
    if (candidateData.id) {
      // Edit existing
      setCandidates(prev =>
        prev.map(c =>
          c.id === candidateData.id
            ? { ...candidateData, id: candidateData.id, createdAt: c.createdAt }
            : c
        )
      );
    } else {
      // Add new
      const newCandidate = {
        ...candidateData,
        id: Date.now().toString(),
        createdAt: new Date(),
      };
      setCandidates(prev => [...prev, newCandidate]);
    }
    setEditingCandidate(undefined);
  };

  // Handle edit
  const handleEdit = (candidate) => {
    setEditingCandidate(candidate);
    setIsFormOpen(true);
  };

  // Handle delete
  const handleDelete = (id) => {
    const candidate = candidates.find(c => c.id === id);
    if (candidate) {
      setDeleteAlert({ open: true, id, name: candidate.name });
    }
  };

  const confirmDelete = () => {
    setCandidates(prev => prev.filter(c => c.id !== deleteAlert.id));
    setDeleteAlert({ open: false, id: '', name: '' });
  };

  // Handle status change
  const handleStatusChange = (id, status) => {
    setCandidates(prev =>
      prev.map(c => (c.id === id ? { ...c, status } : c))
    );
  };

  // Handle add new
  const handleAddNew = () => {
    setEditingCandidate(undefined);
    setIsFormOpen(true);
  };

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">Candidate Management</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage and track your recruitment candidates
          </p>
        </div>

        {/* Stats Section */}
        <div className="mb-6">
          <StatsCards total={stats.total} interested={stats.interested} contacted={stats.contacted} />
        </div>

        {/* Action Bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, position, or phone..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="interested">Interested</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleAddNew} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Candidate
          </Button>
        </div>

        {/* Main Content */}
        {paginatedCandidates.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">No candidates found</p>
          </div>
        ) : (
          <>
            <CandidateTable
              candidates={paginatedCandidates}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
            />
            <CandidateCardList
              candidates={paginatedCandidates}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          </>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredAndSortedCandidates.length)} of {filteredAndSortedCandidates.length} candidates
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Form Modal */}
        <CandidateForm
          open={isFormOpen}
          onOpenChange={(open) => {
            setIsFormOpen(open);
            if (!open) setEditingCandidate(undefined);
          }}
          candidate={editingCandidate}
          onSave={handleSave}
        />

        {/* Delete Alert */}
        <DeleteAlert
          open={deleteAlert.open}
          onOpenChange={(open) => setDeleteAlert({ ...deleteAlert, open })}
          onConfirm={confirmDelete}
          candidateName={deleteAlert.name}
        />
      </div>
    </div>
  );
}

export default App;
