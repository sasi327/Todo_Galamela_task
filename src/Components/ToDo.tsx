import React, { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import { Grid, Button, IconButton, Card, CardActions, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import TaskInterface from '../Interfaces/TaskInterface';
import { addTask, deleteTask, editTask, updateTask } from '../Redux/Actions/actions';


function Todo(): JSX.Element {
  const { allTasks, editTaskObj } = useSelector((state: any) => state.addTaskreducer);
  const [taskName, setTaskName] = useState(editTaskObj.task);

  let completed = 0;
  let pending = 0;
  allTasks.forEach((t: TaskInterface) => {
    if (t.status) {
      completed = completed + 1;
    } else {
      pending = pending + 1;
    }
  })

  useEffect(() => {
    setTaskName(editTaskObj.task);
  }, [editTaskObj])

  const dispatch = useDispatch()

  const handleData = (e: any) => {
    setTaskName(e.target.value)
  }

  const generateRandomId = (length: number) => {
    var string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomId = '';
    var len = string.length;
    for (let i = 0; i < length; i++) {
      randomId += string[Math.floor(Math.random() * len)];
    };
    return randomId;
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (taskName.length !== 0) {
      let newTask;

      if (editTaskObj.isEditMode) {
        newTask = {
          taskId: editTaskObj.taskId,
          task: taskName,
        };
      } else {
        newTask = {
          taskId: generateRandomId(4),
          task: taskName,
        };
      }

      dispatch(addTask(newTask));
      setTaskName('');
    } else {
      alert("task name cannot be empty");
    }
  }

  const handleCheckBox = (taskId: string) => {
    dispatch(updateTask(taskId));
  }

  const handleEditTask = (task: TaskInterface) => {
    dispatch(editTask(task));
  }

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
  }

  return (
    <>
      <Container maxWidth="xl">
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            backgroundColor: 'lavender',
          }}>
          <form >
            <Grid item xs={12}>
              <Grid container direction={"row"} spacing={3} justifyContent="center" alignItems="center" >
                <Grid item xs={12} md={6}>
                  <TextField sx={{ marginTop: '50px', marginBottom: '50px' }}
                    fullWidth
                    id=""
                    variant='outlined'
                    placeholder='Add the Task'
                    name='addtask'
                    value={taskName}
                    onChange={(e) => { handleData(e) }}

                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button onClick={(event) => { handleSubmit(event) }} size='large' variant="contained" color="warning" fullWidth>
                    Add
                  </Button>
                </Grid>

              </Grid>


            </Grid>
          </form>
          <Grid xs={12}>
            <Grid container justifyContent={"center"} alignItems="center">
              <Grid xs={12} md={4}>
                <Typography variant="h6">Total Tasks:
                <Typography display="inline" variant="h6" >{allTasks.length}</Typography>
                </Typography>
              </Grid>
              <Grid xs={12} md={4}>
              <Typography variant="h6">Completed Tasks:
                <Typography display="inline" variant="h6">{completed}</Typography>
                </Typography>

              </Grid>
              <Grid xs={12} md={4}>
              <Typography variant="h6">Pending Tasks:
                <Typography display="inline" variant="h6">{pending}</Typography>
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ padding: '1.5rem' }}>
            <Grid container direction={"row"} alignItems={"center"} spacing={3}>
              {allTasks && allTasks.length > 0 ? allTasks.map((t: TaskInterface, i: number) => {
                return (
                  <Grid item xs={12} md={6} lg={4} >
                    <Card key={t.taskId} id={t.taskId} >
                      <Grid item xs={12}>
                        <Grid container direction={"row"} alignItems="center" justifyContent={"space-evenly"}  >

                          <Grid item xs={2}>
                            <Checkbox
                              checked={t.status}
                              onChange={() => { handleCheckBox(t.taskId) }}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                          </Grid>
                          <Grid item xs={8}>
                            {t.status ? <s>{t.task}</s>
                              : <Typography>{t.task}</Typography>
                            }
                          </Grid>
                          <Grid item xs={2}>
                            {t.status ? null
                              : <IconButton size='medium'
                                onClick={() => { handleEditTask(t) }}
                              >
                                <EditIcon color="warning" />
                              </IconButton>
                            }

                          </Grid>
                        </Grid>

                      </Grid>

                      <CardActions>
                        <Grid container justifyContent={"center"}>
                          <IconButton size='medium'
                            onClick={() => { handleDeleteTask(t.taskId) }}
                          >
                            <DeleteIcon color='error' />
                          </IconButton>
                        </Grid>
                      </CardActions>
                    </Card>
                  </Grid>
                )
              }) :
                <Grid item xs={12}>
                  <Grid container justifyContent={"center"}>
                    <Typography variant="body1" color="initial">No Tasks Found</Typography>
                  </Grid>
                </Grid>
              }
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default Todo