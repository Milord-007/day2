import { createSlice } from "@reduxjs/toolkit";
const initialUser = {
  id: null,
  name: "",
  age: null,
  phone: "",
  email: "",
  job: "",
  adress: "",
};

const slice = createSlice({
  name: "users",
  initialState: {
    users: [
   
   
    ],
    user: initialUser,
    idx: null,
    addModal : false,
    editModal:false,
    delModal:false
  },
  reducers: {
    handleOpenCloseModals(state, action) {
      const { name, value, id } = action.payload;
      if (name === "addModal") {
        state.user = { ...initialUser };
      }
      if (name === "editModal") {
        state.user = state.users.find((user) => user.id === id);
      }
      if (id) {
        state.idx = id;
      }
      state[name] = value;
      },
    changeIdx(state, action) {
      state.idx = action.payload;
    },
    handleChange(state, action) {
      const { inputs, value } = action.payload;
     
      state.user[inputs] = value;
    },
    addUser(state) {
     state.user.id = new Date().getTime();
      state.users.push(state.user);
      state.addModal = false
    },

    editUser(state) {
      state.users = state.users.map((el) => {
        if (el.id == state.idx) {
          return state.user;
        }
        return el;
      });
      state.editModal = false
    },
    deleteUser(state) {
      state.users = state.users.filter((user) => user.id !== state.idx);
      state.delModal = false
    },
  },
});
export const {editUser,deleteUser,addUser,handleChange,handleOpenCloseModals,changeIdx} =slice.actions


export default slice.reducer;
