import { useState, useMemo, useEffect } from 'react';
import { StatsCards } from './components/StatsCards';
import { CandidateTable } from './components/CandidateTable';
import { CandidateCardList } from './components/CandidateCardList';
import { CandidateForm } from './components/CandidateForm';
import { DeleteAlert } from './components/DeleteAlert';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const url = "http://localhost:3000/api/candidates";

function App() {
  const [candidates, setCandidates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState(undefined);
  const [deleteAlert, setDeleteAlert] = useState({
    open: false,
    id: '',
    name: '',
  });

  //state
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchCandidates = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setCandidates(data);
    } catch (error) {
      console.error("Gagal ambil data:", error);
    }
  };
  useEffect(() => {
    fetchCandidates();
  }, []);

  // stats
  const stats = useMemo(() => {
    const total = candidates.length;
    const interested = candidates.filter(c => c.status === 'interested').length;
    const contacted = candidates.filter(c => c.status === 'contacted').length;
    const rejected = candidates.filter(c => c.status === 'rejected').length;
    return { total, interested, contacted, rejected };
  }, [candidates]);

  // filter
  const filteredAndSortedCandidates = useMemo(() => {
    let filtered = candidates.filter(candidate => {
      const matchesSearch =
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.phone.includes(searchQuery);

      const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    // sort by field
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'createdAt') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }
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

  // paginate
  const totalPages = Math.ceil(filteredAndSortedCandidates.length / itemsPerPage);
  const paginatedCandidates = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedCandidates.slice(startIndex, endIndex);
  }, [filteredAndSortedCandidates, currentPage]);

  // sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // create-update
  const handleSave = async (candidateData) => {
    try {
      if (candidateData.id) {
        // edit existing candidate
        const res = await fetch(`${url}/${candidateData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(candidateData),
        });
        if (res.ok) fetchCandidates();
      } else {
        // add new candidate
        const newCandidate = {
          ...candidateData,
          id: Date.now().toString(),
        };
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCandidate),
        });
        if (res.ok) fetchCandidates();
      }
      setEditingCandidate(undefined);
    } catch (error) {
      console.error("Error saving:", error);
    }
  };

  // edit
  const handleEdit = (candidate) => {
    setEditingCandidate(candidate);
    setIsFormOpen(true);
  };

  // delete
  const handleDelete = (id) => {
    const candidate = candidates.find(c => c.id === id);
    if (candidate) {
      setDeleteAlert({ open: true, id, name: candidate.name });
    }
  };

  // confirm delete
  const confirmDelete = async () => {
    try {
      await fetch(`${url}/${deleteAlert.id}`, {
        method: "DELETE",
      });
      fetchCandidates();
      setDeleteAlert({ open: false, id: '', name: '' });
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  // status change
  const handleStatusChange = async (id, status) => {
    try {
      // update UI
      setCandidates(prev =>
        prev.map(c => (c.id === id ? { ...c, status } : c))
      );
      await fetch(`${url}/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
    } catch (error) {
      console.error("Error update status:", error);
      fetchCandidates();
    }
  };

  // add new
  const handleAddNew = () => {
    setEditingCandidate(undefined);
    setIsFormOpen(true);
  };

  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary">Bekerdja.id</h1>
          <p className="mt-2 text-sm text-accent-800">
            Candidate Tracker Application
          </p>
        </div>

        {/* Stats Section */}
        <div className="mb-6">
          <StatsCards total={stats.total} interested={stats.interested} contacted={stats.contacted} rejected={stats.rejected} />
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