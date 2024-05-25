import { configureStore } from '@reduxjs/toolkit';
import dateReducer from './dateSlice';
import clickReducer from './clickSlice';

export const store = configureStore({
  reducer: {
    date: dateReducer,
    clicked: clickReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch