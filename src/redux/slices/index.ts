import { combineSlices } from '@reduxjs/toolkit'
import userSlice from '@/redux/slices/userSlice';


export const rootReducer = combineSlices({
  // add all your slices here
  users: userSlice,
});
