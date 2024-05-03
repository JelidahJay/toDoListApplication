import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Modal,
  TextField,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UserService from '../service/UserService';
import TaskModal from '../common/TaskModal';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    completed: false,
  });
  const [editTaskId, setEditTaskId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await UserService.fetchTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      completed: false,
    });
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddTask = async () => {
    try {
      const token = localStorage.getItem('token');
      await UserService.handleAddTask(newTask, token);
      fetchTasks();
      setNewTask({
        title: '',
        description: '',
        dueDate: '',
        completed: false,
      });
      handleCloseModal();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
  
  const handleEditTask = async (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (!taskToEdit) {
      console.error('Task not found');
      return;
    }
    setNewTask(taskToEdit);
    setEditTaskId(id);
    setOpenModal(true);
  };
  
  const handleUpdateTask = async () => {
    try {
      const token = localStorage.getItem('token');
      await UserService.handleUpdateTask(editTaskId, newTask, token);
      fetchTasks();
      setNewTask({
        title: '',
        description: '',
        dueDate: '',
        completed: false,
      });
      setOpenModal(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  
  const handleDeleteTask = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const success = await UserService.handleDeleteTask(id, token);
      if (success) {
        // Directly manipulating the state array to reflect the change
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  

  return (
    <div>
      <Container maxWidth="lg" style={{ marginTop: '64px' }}>
        <Typography variant="h3" align="center" gutterBottom>
          Todo List App
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <Typography variant="h6">Tasks</Typography>
          <Button variant="contained" color="primary" style={{width: '20%'}} onClick={() => setOpenModal(true)} startIcon={<AddCircleIcon />}>
            Add Task
          </Button>
        </div>
        <Table style={{ width: '100%', minWidth: '650px' }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '20%' }}>Title</TableCell>
              <TableCell style={{ width: '30%' }}>Description</TableCell>
              <TableCell style={{ width: '20%' }}>Due Date</TableCell>
              <TableCell style={{ width: '10%' }}>Completed</TableCell>
              <TableCell style={{ width: '10%' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : ''}</TableCell>
              <TableCell>{task.completed ? 'Yes' : 'No'}</TableCell>
              <TableCell style={{ width: '30%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <IconButton size="small" color="primary" onClick={() => handleEditTask(task.id)} aria-label="edit">
                <EditIcon />
              </IconButton>
              <IconButton size="small" color="error" onClick={() => handleDeleteTask(task.id)} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </TableCell>

            </TableRow>

            ))}
          </TableBody>
        </Table>
      </Container>
      <TaskModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        editTaskId={editTaskId}
        handleUpdateTask={handleUpdateTask}
        handleAddTask={handleAddTask}
        handleInputChange={handleInputChange}
        newTask={newTask}
      />
    </div>
  );
};


export default TaskManagement;
