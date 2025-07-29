import React, { useState } from 'react';
import { toast } from 'react-toastify';

function AdminBackupRestore() {
  const [backupData, setBackupData] = useState('');

  const handleBackup = () => {
    try {
      const data = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        data[key] = localStorage.getItem(key);
      }
      setBackupData(JSON.stringify(data, null, 2));
      toast.success('LocalStorage data backed up!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to create backup.');
    }
  };

  const handleRestore = () => {
    if (!backupData) {
      toast.error('Please paste backup data to restore.');
      return;
    }
    if (!window.confirm('Are you sure you want to restore? This will overwrite all current data in localStorage.')) {
      return;
    }

    try {
      const dataToRestore = JSON.parse(backupData);
      // Clear existing localStorage (optional, but safer for full restore)
      localStorage.clear();
      for (const key in dataToRestore) {
        localStorage.setItem(key, dataToRestore[key]);
      }
      toast.success('LocalStorage data restored successfully!');
      // Force a page reload to re-initialize contexts with new data
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error('Failed to restore data. Invalid JSON format.');
    }
  };

  return (
    <div>
      <h1>Backup / Restore LocalStorage Data</h1>

      <div className="card mb-4">
        <div className="card-header">Backup Data</div>
        <div className="card-body">
          <button className="btn btn-primary mb-3" onClick={handleBackup}>Generate Backup</button>
          <textarea
            className="form-control"
            rows="10"
            value={backupData}
            readOnly
            placeholder="Your backup data will appear here..."
          ></textarea>
          <small className="form-text text-muted">Copy this data to save your application state.</small>
        </div>
      </div>

      <div className="card">
        <div className="card-header">Restore Data</div>
        <div className="card-body">
          <textarea
            className="form-control mb-3"
            rows="10"
            value={backupData}
            onChange={(e) => setBackupData(e.target.value)}
            placeholder="Paste your backup data here..."
          ></textarea>
          <button className="btn btn-warning" onClick={handleRestore}>Restore Data</button>
          <small className="form-text text-muted">Pasting data here and clicking restore will overwrite your current application state.</small>
        </div>
      </div>
    </div>
  );
}

export default AdminBackupRestore;
