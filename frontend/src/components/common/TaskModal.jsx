// Modal.js

import React from 'react';
import { Modal as MuiModal, Typography, TextField, Button } from '@mui/material';

const TaskModal = ({ open, onClose, editTaskId, handleUpdateTask, handleAddTask, handleInputChange, newTask }) => {
  return (
    <MuiModal
      open={open}
      onClose={onClose}
      aria-labelledby="add-task-modal-title"
      aria-describedby="add-task-modal-description"
    >
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px', minWidth: '500px' }}>
        <Typography variant="h5" id="add-task-modal-title" gutterBottom>
          {editTaskId ? 'Edit Task' : 'Add New Task'}
        </Typography>
        <form onSubmit={editTaskId ? handleUpdateTask : handleAddTask}>
          <div style={{ marginBottom: '10px' }}>
            <TextField
              name="title"
              label="Title"
              value={newTask.title}
              onChange={handleInputChange}
              required
              fullWidth
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <TextField
              name="description"
              label="Description"
              value={newTask.description}
              onChange={handleInputChange}
              fullWidth
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <TextField
              name="dueDate"
              label="Due Date"
              type="date"
              value={newTask.dueDate}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </div>
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
            {editTaskId ? 'Update Task' : 'Add Task'}
          </Button>
        </form>
      </div>
    </MuiModal>
  );
};

export default TaskModal;
