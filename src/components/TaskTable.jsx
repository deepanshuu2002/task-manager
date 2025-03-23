import { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Checkbox, Avatar, Typography, Dialog, DialogTitle, DialogActions,
  Button, Snackbar, Alert, Box
} from '@mui/material';

const TaskTable = ({ refreshTrigger, filters, page, setPage }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [totalPages, setTotalPages] = useState(1);

  const limit = 5;

  useEffect(() => {
    fetchTasks();
  }, [refreshTrigger, filters, page]);

  const fetchTasks = () => {
    const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    let filteredTasks = allTasks.filter(task =>
      (!filters.type || task.type === filters.type) &&
      (!filters.priority || task.priority === filters.priority) &&
      (!filters.assignedTo || task.assignedTo === filters.assignedTo) &&
      (!filters.dueDate || task.dueDate.startsWith(filters.dueDate))
    );

    const totalCount = filteredTasks.length;
    setTotalPages(Math.ceil(totalCount / limit));

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    setTasks(filteredTasks.slice(startIndex, endIndex));
  };

  const getTaskTypeIcon = (type) => {
    switch (type) {
      case 'Call': return '📞';
      case 'Email': return '📧';
      case 'Meeting': return '📅';
      default: return '';
    }
  };

  const handleCheckboxClick = (task) => {
    setSelectedTask(task);
    setOpenDialog(true);
  };

  const handleConfirm = () => {
    const stored = JSON.parse(localStorage.getItem('tasks')) || [];
    const updated = stored.map(task =>
      task.id === selectedTask.id ? { ...task, completed: true } : task
    );
    localStorage.setItem('tasks', JSON.stringify(updated));
    setSnackbar({ open: true, message: 'Task marked as complete!', severity: 'success' });
    setOpenDialog(false);
    setSelectedTask(null);
    fetchTasks();
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>To Do</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Associated Record</TableCell>
              <TableCell>Assigned To</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <Checkbox
                    checked={task.completed}
                    disabled={task.completed}
                    onClick={() => handleCheckboxClick(task)}
                  />
                  {getTaskTypeIcon(task.type)}
                </TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>
                  <Typography color={
                    task.priority === 'High' ? 'error' :
                      task.priority === 'Medium' ? 'orange' : 'textSecondary'
                  }>
                    {task.priority}
                  </Typography>
                </TableCell>
                <TableCell>{new Date(task.dueDate).toLocaleString()}</TableCell>
                <TableCell>
                  <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
                    {task.associatedRecord?.[0] || 'U'}
                  </Avatar>
                  {task.associatedRecord || 'Unassigned'}
                </TableCell>
                <TableCell>
                  <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
                    {task.assignedTo?.[0] || 'U'}
                  </Avatar>
                  {task.assignedTo || 'Unassigned'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" mt={2}>
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i}
            onClick={() => setPage(i + 1)}
            variant={page === i + 1 ? 'contained' : 'outlined'}
            sx={{ mx: 0.5 }}
            size="small"
          >
            {i + 1}
          </Button>
        ))}
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Mark task as complete?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TaskTable;
