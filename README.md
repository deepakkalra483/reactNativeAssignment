# 📝 React Native Task Management App

A simple and elegant **Task Manager App** built with **React Native** using **TypeScript**, **Redux Toolkit**, and **AsyncStorage**, inspired by iOS task management UI.

## 📱 Screens

- **Dashboard**: List of tasks with filters - All / Completed / Incomplete.
- **Add/Edit Task**: Form to add or update task (Title, Description, Due Date, Priority).
- **Task Details**: View task details, with edit and delete functionality.

## ✅ Features

- Add, Edit, Delete, and Toggle tasks
- Filter by status (All / Completed / Incomplete)
- Sort by date 
- Fetch initial tasks from:  
  [`https://jsonplaceholder.typicode.com/todos`](https://jsonplaceholder.typicode.com/todos) (limited to 20)
- Local persistence using **AsyncStorage** (new/edited tasks are not synced with API)
- Form validation and error handling
- Smooth UX with loading indicators

## 🏗️ Tech Stack

- **React Native**
- **TypeScript**
- **Redux Toolkit**
- **React Navigation (Stack)**
- **AsyncStorage**
- **Optional Unit Tests** (basic reducer/util test)

## 🎨 UI Reference
- **Date Picker for select due date**
- **FlashMessage for error showing**

This project follows layout and design patterns based on this UI reference:  
[Task Management App on CodeCanyon](https://codecanyon.net/item/iphone-task-management-app/49000709)

## Project apk
Apk link 
https://drive.google.com/file/d/14fkwWT7-Ka9FtMgwUwiM4F0hAy5h_L6z/view?usp=sharing
## 🛠️ Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/deepakkalra483/reactNativeAssignment.git
cd reactNativeAssignment
