import { useState, useEffect } from 'react';

export interface RsvpResponse {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  guestCount: number;
  attending: 'accepted' | 'declined';
  message?: string;
  createdAt: string;
}

const LOCAL_STORAGE_KEY = 'yeabsera_leyu_wedding_rsvps_v1';

// Sample seed data to ensure the admin dashboard can be tested immediately
const SAMPLE_RSVPS: RsvpResponse[] = [
  {
    id: 'sample-1',
    fullName: 'Abebe Bikila',
    email: 'abebe@example.com',
    phone: '+251 91 111 2233',
    guestCount: 2,
    attending: 'accepted',
    message: 'Can wait to celebrate with Yeabsera & Leyu! God bless your union.',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: 'sample-2',
    fullName: 'Tigist Haile',
    email: 'tigist@example.com',
    phone: '+251 92 333 4455',
    guestCount: 1,
    attending: 'accepted',
    message: 'Wishing you both a lifetime of happiness and endless joy!',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'sample-3',
    fullName: 'Dawit Yohannes',
    email: 'dawit@example.com',
    phone: '+251 93 555 6677',
    guestCount: 1,
    attending: 'declined',
    message: 'Sending all my love from overseas. Congratulations!',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

export function useRsvpStore() {
  const [rsvps, setRsvps] = useState<RsvpResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize and load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setRsvps(JSON.parse(stored));
      } else {
        // Seed initial sample data
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(SAMPLE_RSVPS));
        setRsvps(SAMPLE_RSVPS);
      }
    } catch (err) {
      console.error('Failed to parse local RSVPs:', err);
      setRsvps([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save RSVP function
  const submitRsvp = async (data: Omit<RsvpResponse, 'id' | 'createdAt'>): Promise<{ success: boolean; message?: string }> => {
    setLoading(true);
    setError(null);

    try {
      const newEntry: RsvpResponse = {
        ...data,
        id: 'rsvp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        createdAt: new Date().toISOString()
      };

      const updated = [newEntry, ...rsvps];
      setRsvps(updated);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));

      // OPTIONAL: Future Supabase or Firebase sync can be added here seamlessly:
      // await supabase.from('rsvps').insert([newEntry]);

      return { success: true };
    } catch (err: any) {
      const errMsg = err?.message || 'Failed to record RSVP. Please try again.';
      setError(errMsg);
      return { success: false, message: errMsg };
    } finally {
      setLoading(false);
    }
  };

  // Delete RSVP (Admin capability)
  const deleteRsvp = (id: string) => {
    const updated = rsvps.filter(r => r.id !== id);
    setRsvps(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  // Export to CSV
  const exportToCsv = () => {
    if (rsvps.length === 0) return;

    const headers = ['Full Name', 'Email', 'Phone', 'Attending Status', 'Guest Count', 'Message', 'Submission Date'];
    const rows = rsvps.map(r => [
      `"${r.fullName.replace(/"/g, '""')}"`,
      `"${r.email.replace(/"/g, '""')}"`,
      `"${r.phone.replace(/"/g, '""')}"`,
      `"${r.attending === 'accepted' ? 'Joyfully Accept' : 'Regretfully Decline'}"`,
      r.guestCount,
      `"${(r.message || '').replace(/"/g, '""')}"`,
      `"${new Date(r.createdAt).toLocaleString()}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Yeabsera_Leyu_Wedding_RSVPs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Compute metrics
  const totalSubmissions = rsvps.length;
  const acceptedCount = rsvps.filter(r => r.attending === 'accepted').length;
  const declinedCount = rsvps.filter(r => r.attending === 'declined').length;
  const totalAttendingGuests = rsvps
    .filter(r => r.attending === 'accepted')
    .reduce((sum, r) => sum + (Number(r.guestCount) || 1), 0);

  return {
    rsvps,
    loading,
    error,
    submitRsvp,
    deleteRsvp,
    exportToCsv,
    stats: {
      totalSubmissions,
      acceptedCount,
      declinedCount,
      totalAttendingGuests
    }
  };
}
