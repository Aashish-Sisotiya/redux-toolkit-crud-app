import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPost = createAsyncThunk("post/getPost", async ({ id }) => {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) =>
    res.json()
  );
});
export const deletePost = createAsyncThunk(
  "post/deletePost",
  async ({ id }) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "Delete",
    }).then((res) => res.json());
  }
);
export const createPost = createAsyncThunk(
  "post/createPost",
  async ({ values }) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/`, {
      method: "POST",
      body: JSON.stringify({
        title: values.title,
        body: values.body,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((res) => res.json());
  }
);
export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ id, title, body }) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        body,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((res) => res.json());
  }
);

const PostSlice = createSlice({
  name: "posts",
  initialState: {
    loading: false,
    post: [],
    error: null,
    body: "",
    edit: false,
  },
  reducers: {
    setEdit: (state, action) => {
      state.body = action.payload.body;
      state.edit = action.payload.edit;
    },
  },
  extraReducers: {
    [getPost.pending]: (state, action) => {
      state.loading = true;
    },
    [getPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = [action.payload];
    },
    [getPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deletePost.pending]: (state, action) => {
      state.loading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = action.payload;
    },
    [deletePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [createPost.pending]: (state, action) => {
      state.loading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = [action.payload];
    },
    [createPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updatePost.pending]: (state, action) => {
      state.loading = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = [action.payload];
    },
    [updatePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setEdit } = PostSlice.actions;

export default PostSlice.reducer;
