import { configureStore } from '@reduxjs/toolkit'
import { treeReducer } from './reducers'
// ...

export const store = configureStore({
  reducer: {
    trees: treeReducer,
    // comments: commentsReducer,
    // users: usersReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Trees in array, duration of tree and label
