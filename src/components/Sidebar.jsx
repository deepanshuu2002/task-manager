import { Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material';

const Sidebar = () => {
  const menuItems = ['Dashboard', 'Report', 'Company', 'Tasks', 'Deals'];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          bgcolor: '#ffffff',
        },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
