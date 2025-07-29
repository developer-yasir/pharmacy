import React, { useState, useEffect } from 'react';

function AdminActivityLog() {
  const [activityLog, setActivityLog] = useState([]);

  useEffect(() => {
    // Simulate fetching activity log from localStorage or generating dummy data
    const dummyLog = [
      { id: 1, timestamp: new Date(Date.now() - 3600000).toLocaleString(), user: 'Yasir', action: 'Added Medicine 1 to cart' },
      { id: 2, timestamp: new Date(Date.now() - 7200000).toLocaleString(), user: 'GuestUser', action: 'Viewed Product 5' },
      { id: 3, timestamp: new Date(Date.now() - 10800000).toLocaleString(), user: 'Yasir', action: 'Placed Order #order_16789012345' },
      { id: 4, timestamp: new Date(Date.now() - 14400000).toLocaleString(), user: 'AdminUser', action: 'Updated Product 10 stock' },
      { id: 5, timestamp: new Date(Date.now() - 18000000).toLocaleString(), user: 'GuestUser', action: 'Submitted review for Product 20' },
    ];
    setActivityLog(dummyLog);
  }, []);

  return (
    <div>
      <h1>User Activity Log</h1>
      {activityLog.length === 0 ? (
        <p>No recent activity.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>User</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {activityLog.map((log) => (
              <tr key={log.id}>
                <td>{log.timestamp}</td>
                <td>{log.user}</td>
                <td>{log.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminActivityLog;
