import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TaskApp = () => {
  const [tasks, setTasks] = useState<
    { id: number; name: string; isDone: boolean }[]
  >([]);
  const [taskText, setTaskText] = useState("");

  // Load tasks from AsyncStorage
  useEffect(() => {
    const loadTasks = async () => {
      const storedTasks = await AsyncStorage.getItem("tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    };
    loadTasks();
  }, []);

  // Save tasks to AsyncStorage whenever tasks change
  useEffect(() => {
    const saveTasks = async () => {
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    };
    saveTasks();
  }, [tasks]);

  const addTask = () => {
    if (taskText.trim()) {
      if (taskText.length <= 20) {
        setTasks([...tasks, { id: Date.now(), name: taskText, isDone: false }]);
        setTaskText("");
      } else {
        alert("Task name should not exceed 20 characters.");
      }
    }
  };

  const toggleTaskDone = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const TaskItem = ({
    taskName,
    onToggleDone,
    isDone,
    onDelete,
  }: {
    taskName: string;
    onToggleDone: () => void;
    isDone: boolean;
    onDelete: () => void;
  }) => {
    return (
      <View style={styles.taskContainer}>
        <TouchableOpacity onPress={onToggleDone} style={styles.checkbox}>
          <View
            style={[styles.checkboxInner, isDone && styles.checkboxChecked]}
          />
        </TouchableOpacity>
        <Text style={[styles.taskText, isDone && styles.taskTextDone]}>
          {taskName}
        </Text>
        <TouchableOpacity
          onPress={onDelete}
          style={styles.deleteButton}
        ></TouchableOpacity>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/bg.jpg")} // Adjust path as necessary
      style={styles.container}
      resizeMode="cover" // Adjusts how the image is scaled
    >
      <View style={styles.container}>
        {/* Input Section */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter a task"
            value={taskText}
            onChangeText={setTaskText}
          />
          <Button title="Add" onPress={addTask} />
        </View>

        {/* Task List */}
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TaskItem
              taskName={item.name}
              isDone={item.isDone}
              onToggleDone={() => toggleTaskDone(item.id)}
              onDelete={() => deleteTask(item.id)}
            />
          )}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    justifyContent: "space-between",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#888",
    marginRight: 10,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxInner: {
    width: 12,
    height: 12,
  },
  checkboxChecked: {
    backgroundColor: "#4caf50",
  },
  taskText: {
    fontSize: 16,
  },
  taskTextDone: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    width: 20, // Set the width for a smaller size
    height: 20,
    borderRadius: 20, // Circular button
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TaskApp;
