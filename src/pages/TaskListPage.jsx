import { useEffect, useState } from 'react';
import TaskTable from '../components/TaskTable';
import TaskFilters from '../components/TaskFilters';

const TaskListPage = () => {
  const [filters, setFilters] = useState({
    type: '',
    priority: '',
    assignedTo: '',
    dueDate: ''
  });

  const [refreshKey, setRefreshKey] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const handler = () => {
      setPage(1);
      setRefreshKey(prev => prev + 1);
    };
    window.addEventListener("task-created", handler);
    return () => window.removeEventListener("task-created", handler);
  }, []);

  useEffect(() => {
    const existing = localStorage.getItem('tasks');
    if (!existing) {
      const dummyTasks = [
        {
          id: Date.now() + 1,
          title: "Call Client A",
          type: "Call",
          priority: "High",
          dueDate: "2025-03-24T10:00",
          associatedRecord: "Client A",
          assignedTo: "Karan S",
          notes: "Discuss project status",
          completed: false
        },
        {
          id: Date.now() + 2,
          title: "Send weekly report",
          type: "Email",
          priority: "Medium",
          dueDate: "2025-03-25T16:30",
          associatedRecord: "Manager",
          assignedTo: "Aditya",
          notes: "",
          completed: false
        },
        {
          id: Date.now() + 3,
          title: "Team sync-up meeting",
          type: "Meeting",
          priority: "Low",
          dueDate: "2025-03-26T09:00",
          associatedRecord: "Project Team",
          assignedTo: "Gopichand",
          notes: "Sprint planning",
          completed: false
        },
        {
          id: Date.now() + 4,
          title: "Follow up with HR",
          type: "Call",
          priority: "Low",
          dueDate: "2025-03-27T14:15",
          associatedRecord: "HR Dept",
          assignedTo: "Karan S",
          notes: "",
          completed: false
        },
        {
          id: Date.now() + 5,
          title: "Prepare presentation",
          type: "Email",
          priority: "High",
          dueDate: "2025-03-28T11:00",
          associatedRecord: "Investor Relations",
          assignedTo: "Aditya",
          notes: "Deck for board meeting",
          completed: false
        },
        {
          id: Date.now() + 6,
          title: "Marketing strategy call",
          type: "Call",
          priority: "Medium",
          dueDate: "2025-03-29T15:45",
          associatedRecord: "Marketing Team",
          assignedTo: "Gopichand",
          notes: "",
          completed: false
        }
      ];
      localStorage.setItem('tasks', JSON.stringify(dummyTasks));
    }
  }, []);
  
  return (
    <div style={{ padding: '20px', background: 'white', borderRadius: '8px' }}>
      <h2>📋 Task List Page</h2>
      <TaskFilters filters={filters} setFilters={setFilters} />
      <TaskTable
        refreshTrigger={refreshKey}
        filters={filters}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default TaskListPage;
