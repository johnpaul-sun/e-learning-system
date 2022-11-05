import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import authService from './authService';
import { catchError } from 'utils/handleAxiosError';
import { LoginRegisterFormValues, User, AxiosResponseError } from 'shared/types';

type InitialState = {
  user: any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  error: AxiosResponseError;
};

const initialState: InitialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  error: {
    status: 0,
    content: null,
  },
};

export const register = createAsyncThunk(
  'auth/register',
  async (user: LoginRegisterFormValues, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error));
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (user: LoginRegisterFormValues, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error));
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error: any) {
    return thunkAPI.rejectWithValue(catchError(error));
  }
});

export const resendVerification = createAsyncThunk(
  'auth/resendVerification',
  async (_, thunkAPI) => {
    try {
      return await authService.resendVerification();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error));
    }
  }
);

export const getAuthUser = createAsyncThunk(
  'auth/getAuthUser',
  async (_, thunkAPI) => {
    try {
      return await authService.getAuthUser();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error));
    }
  }
);

export const hydrateUserState = createAsyncThunk(
  'auth/hydrateUserState',
  async (_, thunkAPI) => {
    try {
      return await authService.hydrateUserState();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error));
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.error = {
        status: 0,
        content: null,
      };
    },
    setAuth: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<InitialState>) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.user = action.payload.data;
        state.error = {
          status: 0,
          content: null,
        };
      })
      .addCase(register.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(HYDRATE, (state, action: any) => {
        if (action.payload?.auth?.user) {
          state.user = action.payload.auth.user;
        }
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.user = action.payload;
        state.error = {
          status: 0,
          content: null,
        };
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.user = null;
        state.error = {
          status: 0,
          content: null,
        };
      })
      .addCase(logout.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(hydrateUserState.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        hydrateUserState.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.isSuccess = true;
          state.isLoading = false;
          state.user = action.payload;
          state.error = {
            status: 0,
            content: null,
          };
        }
      )
      .addCase(
        hydrateUserState.rejected,
        (state, action: PayloadAction<any>) => {
          state.isError = true;
          state.isSuccess = false;
          state.isLoading = false;
          state.error = action.payload;
          state.user = null;
        }
      )
      .addCase(getAuthUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAuthUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.user = action.payload;
        state.error = {
          status: 0,
          content: null,
        };
      })
      .addCase(getAuthUser.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(resendVerification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resendVerification.fulfilled, (state, action: PayloadAction<User>) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.user = action.payload;
        state.error = {
          status: 0,
          content: null,
        };
      })
      .addCase(resendVerification.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
      });
  },
});

export const { reset, setAuth } = authSlice.actions;
export default authSlice.reducer;
