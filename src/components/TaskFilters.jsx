import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const TaskFilters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Box display="flex" gap={2} mb={2} alignItems="center">
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel>Task Type</InputLabel>
        <Select
          value={filters.type}
          onChange={handleChange}
          name="type"
          label="Task Type"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Call">Call</MenuItem>
          <MenuItem value="Email">Email</MenuItem>
          <MenuItem value="Meeting">Meeting</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel>Priority</InputLabel>
        <Select
          value={filters.priority}
          onChange={handleChange}
          name="priority"
          label="Priority"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel>Assigned To</InputLabel>
        <Select
          value={filters.assignedTo}
          onChange={handleChange}
          name="assignedTo"
          label="Assigned To"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Karan S">Karan S</MenuItem>
          <MenuItem value="Gopichand">Gopichand</MenuItem>
          <MenuItem value="Aditya">Aditya</MenuItem>
        </Select>
      </FormControl>

      <DatePicker
        label="Due Date"
        value={filters.dueDate ? dayjs(filters.dueDate) : null}
        onChange={(newValue) =>
          setFilters((prev) => ({
            ...prev,
            dueDate: newValue ? newValue.format('YYYY-MM-DD') : ''
          }))
        }
        slotProps={{ textField: { size: 'small', fullWidth: true } }}
      />
    </Box>
  );
};

export default TaskFilters;
