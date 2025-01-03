

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Set the base URL for your API
// const BASE_URL = "https://ecomproject-sk3k.onrender.com";
// const BASE_URL="https://ecomproject-sk3k.onrender.com";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null, // Added error state for better error handling
};

// Register User Async Thunk
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://ecomproject-sk3k.onrender.com/api/auth/register`,  // Updated URL
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Login User Async Thunk
export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://ecomproject-sk3k.onrender.com/api/auth/login`,  // Updated URL
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Logout User Async Thunk
export const logoutUser = createAsyncThunk(
  "/auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://ecomproject-sk3k.onrender.com/api/auth/logout`,  // Updated URL
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Check Authentication Status Async Thunk
export const checkAuth = createAsyncThunk(
  "/auth/checkauth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://ecomproject-sk3k.onrender.com/api/auth/check-auth`,  // Updated URL
        {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true; // You can customize this logic
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset errors on pending state
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload; // Set error message
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset errors on pending state
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload; // Set error message
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset errors on pending state
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload; // Set error message
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Set error message if logout fails
      });
  },
});

export const { setUser, setError } = authSlice.actions;
export default authSlice.reducer;





// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   isAuthenticated: false,
//   isLoading: true,
//   user: null,
// };

// export const registerUser = createAsyncThunk(
//   "/auth/register",

//   async (formData) => {
//     console.log(formData);
//     const response = await axios.post(
//       "https://ecomproject-sk3k.onrender.com/api/auth/register",
//       formData,
//       {
//         withCredentials: true,
//       }
//     );

//     return response.data;
//   }
// );

// export const loginUser = createAsyncThunk(
//   "/auth/login",

//   async (formData) => {
//     console.log(formData);
    
//     const response = await axios.post(
//       "https://ecomproject-sk3k.onrender.com/api/auth/login",
//       formData,
//       {
//         withCredentials: true,
//       }
//     );

//     return response.data;
//   }
// );

// export const logoutUser = createAsyncThunk(
//   "/auth/logout",

//   async () => {
//     const response = await axios.post(
//       "https://ecomproject-sk3k.onrender.com/api/auth/logout",
//       {},
//       {
//         withCredentials: true,
//       }
//     );

//     return response.data;
//   }
// );

// export const checkAuth = createAsyncThunk(
//   "/auth/checkauth",

//   async () => {
//     const response = await axios.get(
//       "https://ecomproject-sk3k.onrender.com/api/auth/check-auth",
//       {
//         withCredentials: true,
//         headers: {
//           "Cache-Control":
//             "no-store, no-cache, must-revalidate, proxy-revalidate",
//         },
//       }
//     );

//     return response.data;
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {},
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//       })
//       .addCase(loginUser.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         console.log(action);

//         state.isLoading = false;
//         state.user = action.payload.success ? action.payload.user : null;
//         state.isAuthenticated = action.payload.success;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//       })
//       .addCase(checkAuth.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(checkAuth.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = action.payload.success ? action.payload.user : null;
//         state.isAuthenticated = action.payload.success;
//       })
//       .addCase(checkAuth.rejected, (state, action) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//       })
//       .addCase(logoutUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//       });
//   },
// });

// export const { setUser } = authSlice.actions;
// export default authSlice.reducer;