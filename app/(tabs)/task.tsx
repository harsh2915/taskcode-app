import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
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
      setTasks([...tasks, { id: Date.now(), name: taskText, isDone: false }]);
      setTaskText("");
    }
  };

  const toggleTaskDone = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  const TaskItem = ({
    taskName,
    onToggleDone,
    isDone,
  }: {
    taskName: string;
    onToggleDone: () => void;
    isDone: boolean;
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
      </View>
    );
  };

  return (
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
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
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
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
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
});

export default TaskApp;
