import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useState } from 'react';
import CreateTaskModal from './CreateTaskModal';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleCreated = () => setRefresh(prev => !prev); // to trigger table refresh

  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">Important Task</Typography>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Create Task
          </Button>
        </Toolbar>
      </AppBar>

      <CreateTaskModal
            open={open}
            onClose={() => setOpen(false)}
            onCreated={(newTask) => {
                setRefresh(true);      // still toggle for fallback
                window.dispatchEvent(new CustomEvent("task-created", { detail: newTask }));
            }}
            />

    </>
  );
};

export default Header;
