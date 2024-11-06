import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { inquiries } from '../lib/api';
import { format } from 'date-fns';
import { MessageSquarePlus, Clock, CheckCircle, XCircle } from 'lucide-react';

interface Inquiry {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [userInquiries, setInquiries] = useState<Inquiry[]>([]);
  const [newInquiry, setNewInquiry] = useState({ title: '', description: '' });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    try {
      const data = await inquiries.getAll();
      setInquiries(data);
    } catch (err) {
      setError('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await inquiries.create(newInquiry);
      setNewInquiry({ title: '', description: '' });
      setShowForm(false);
      loadInquiries();
    } catch (err) {
      setError('Failed to create inquiry');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400';
      case 'in-progress': return 'text-blue-400';
      case 'completed': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 pt-20 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 pt-20">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
            <p className="text-slate-400">Welcome back, {user?.email}</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-lg transition-colors"
          >
            <MessageSquarePlus className="h-5 w-5" />
            <span>New Inquiry</span>
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-6">
            {error}
          </div>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-lg mb-8 animate-fadeIn">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={newInquiry.title}
                  onChange={(e) => setNewInquiry({ ...newInquiry, title: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={newInquiry.description}
                  onChange={(e) => setNewInquiry({ ...newInquiry, description: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none"
                  rows={4}
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-lg transition-colors"
                >
                  Submit Inquiry
                </button>
              </div>
            </div>
          </form>
        )}

        <div className="grid gap-6">
          {userInquiries.map((inquiry) => (
            <div 
              key={inquiry.id} 
              className="bg-slate-800 p-6 rounded-lg hover:bg-slate-800/80 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{inquiry.title}</h3>
                <span className={`flex items-center ${getStatusColor(inquiry.status)}`}>
                  {inquiry.status === 'pending' && <Clock className="h-5 w-5 mr-2" />}
                  {inquiry.status === 'in-progress' && <CheckCircle className="h-5 w-5 mr-2" />}
                  {inquiry.status === 'completed' && <XCircle className="h-5 w-5 mr-2" />}
                  {inquiry.status}
                </span>
              </div>
              <p className="text-slate-300 mb-4">{inquiry.description}</p>
              <div className="text-sm text-slate-400">
                Submitted on {format(new Date(inquiry.createdAt), 'PPP')}
              </div>
            </div>
          ))}

          {userInquiries.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <MessageSquarePlus className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No inquiries yet. Create your first inquiry to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}