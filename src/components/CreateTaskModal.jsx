import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField,
    MenuItem, Select, InputLabel, FormControl, Grid
  } from '@mui/material';
  import { useForm, Controller } from 'react-hook-form';
  import { yupResolver } from '@hookform/resolvers/yup';
  import * as yup from 'yup';
  
  // Validation schema
  const schema = yup.object().shape({
    title: yup.string().required('Task Name is required'),
    type: yup.string().required('Task Type is required'),
    priority: yup.string().required('Priority is required'),
    dueDate: yup.string().required('Due Date & Time is required'),
  });
  
  const CreateTaskModal = ({ open, onClose, onCreated }) => {
    const { control, handleSubmit, reset } = useForm({
      defaultValues: {
        title: '',
        type: '',
        priority: '',
        associatedRecord: '',
        assignedTo: '',
        dueDate: '',
        notes: ''
      },
      resolver: yupResolver(schema)
    });
    const onSubmit = (data) => {
      const newTask = {
        id: Date.now(),
        ...data,
        completed: false
      };
    
      const existing = JSON.parse(localStorage.getItem('tasks')) || [];
      const updated = [...existing, newTask];
    
      localStorage.setItem('tasks', JSON.stringify(updated));
      onCreated(newTask);
      window.dispatchEvent(new Event("task-created"));
      reset();
      onClose();
    };
    
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Create Task</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="title"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField {...field} fullWidth label="Task Name" error={!!fieldState.error} helperText={fieldState.error?.message} />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Task Type</InputLabel>
                      <Select {...field} label="Task Type">
                        <MenuItem value="Call">Call</MenuItem>
                        <MenuItem value="Email">Email</MenuItem>
                        <MenuItem value="Meeting">Meeting</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="priority"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Priority</InputLabel>
                      <Select {...field} label="Priority">
                        <MenuItem value="High">High</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Low">Low</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="associatedRecord"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth label="Associated Record" />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="assignedTo"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth label="Assigned To" />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="dueDate"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      type="datetime-local"
                      fullWidth
                      label="Due Date & Time"
                      InputLabelProps={{ shrink: true }}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="notes"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth multiline rows={3} label="Add Notes" />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained">Create Task</Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  };
  
  export default CreateTaskModal;
  