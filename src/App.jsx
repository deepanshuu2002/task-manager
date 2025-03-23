import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TaskListPage from './pages/TaskListPage';
import { Box, Toolbar } from '@mui/material';
import { useState } from 'react';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#eaeff1' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Header onCreated={() => setRefreshTrigger(prev => !prev)} />
        <Toolbar />
        <Box sx={{ flexGrow: 1, p: 2, bgcolor: '#f5f5f5' }}>
          <TaskListPage refreshTrigger={refreshTrigger} />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
