import { useState } from "react";
import NewProject from "./components/newProject";
import NoProjectSelected from "./components/noProjectSelected";
import SideBar from "./components/sideBar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined, // Changed from selectProjectId to selectedProjectId
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    setProjectState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask], // Correctly appending newTask to tasks array
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectState((prevState) => ({
      ...prevState,

      tasks: prevState.tasks.filter((task) => task.id !== id),
    }));
  }
  function handleSelectProject(id) {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: id,
    }));
  }
  function handleDeleteProject() {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
      projects: prevState.projects.filter(
        (p) => p.id !== prevState.selectedProjectId
      ),
    }));
  }

  function handleStartProject() {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: null,
    }));
  }

  function handleCancel() {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
    }));
  }

  function handleAddProject(projectData) {
    setProjectState((prevState) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  let selectedProject = projectState.projects.find(
    (p) => p.id === projectState.selectedProjectId
  );
  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectState.tasks}
    />
  );

  if (projectState.selectedProjectId === null) {
    content = <NewProject onCancel={handleCancel} onAdd={handleAddProject} />;
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartProject={handleStartProject} />;
  }

  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <SideBar
          onStartProject={handleStartProject}
          projects={projectState.projects}
          onSelectProject={handleSelectProject}
          selectedProjectId={projectState.selectedProjectId}
        />
        {content}
      </main>
    </>
  );
}

export default App;
