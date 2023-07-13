import React from "react";
import Table from "./components/Table";
import Dialog from "./components/Dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  changeIdx,
  deleteUser,
  editUser,
  handleChange,
  handleOpenCloseModals,
} from "./reducers/users";
function App() {
  const users = useSelector(({ users }) => users.users);
  const addModal = useSelector(({ users }) => users.addModal);
  const delModal = useSelector(({ users }) => users.delModal);
  const editModal = useSelector(({ users }) => users.editModal);
  const user = useSelector(({ users }) => users.user);
  const idx = useSelector(({ users }) => users.idx);
  const dispatch = useDispatch();
  function delUser(id) {
    dispatch(handleOpenCloseModals({ name: "delModal", value: true }));
    dispatch(changeIdx(id));
  }
  function editFromUser(el){
    dispatch(handleOpenCloseModals({ name: "editModal", value: true,id:el.id }));
    dispatch(changeIdx(el.id));
  }
  return (
    <div className="w-[80%] bg-[grey] mx-auto mt-[100px]">
      <p className="text-center text-[30px] font-[700] text-white">User List</p>
      <button className="bg-[#58f058] text-white p-2 w-[50px] rounded-xl ml-[10px]"
        onClick={() =>
          dispatch(handleOpenCloseModals({ name: "addModal", value: true }))
        }
      >
        Add
      </button>
      <Table
        headers={["id", "name", "age", "phone", "email", "job", "adress"]}
        data={users}
        deletUser={(id) => delUser(id)}
        editUser ={el => editFromUser(el)}
      />

      {addModal && (
        <Dialog
          title={"AddModal"}
          handleClose={() =>
            dispatch(handleOpenCloseModals({ name: "addModal", value: false }))
          }
          onClick={() => dispatch(addUser())}
        >
          {Object.keys(user)
            .slice(1)
            .map((el) => {
              return (
                <div key={el.id} className="flex flex-col w-[410px]">
                  <label htmlFor={el} className="text-start">
                    {el}
                  </label>
                  <input
                    required={true}
                    type="text"
                    value={user[el]}
                    className="border border-black"
                    onChange={(e) =>
                      dispatch(
                        handleChange({ inputs: el, value: e.target.value })
                      )
                    }
                  />
                </div>
              );
            })}
        </Dialog>
      )}
      {delModal && (
        <Dialog
          title={"Delete Modal"}
          handleClose={() =>
            dispatch(handleOpenCloseModals({ name: "delModal", value: false }))
          }
          onClick={() => dispatch(deleteUser())}
        >
          <h1>Are You Sure to Delete This User?</h1>
        </Dialog>
      )}
     {editModal && (
        <Dialog
          title="Edit Modal"
          handleClose={() =>
            dispatch(handleOpenCloseModals({ name: "editModal", value: false }))
          }
          onClick={() => dispatch(editUser())}
        >
          {Object.keys(user)
            .slice(1)
            .map((elem) => {
              return (
                <div className="flex flex-col">
                  <label htmlFor={elem}>{elem}</label>
                  <input
                    type="text"
                    className="border inline-block border-black w-[300px]"
                    value={user[elem]}
                    onChange={(e) => {
                      dispatch(
                        handleChange({ inputs: elem, value: e.target.value })
                      );
                    }}
                  />
                </div>
              );
            })}
        </Dialog>
      )}
    </div>
  );
}

export default App;



// {
//   modal ? (
//     <Edit
//       title='EditModal'
//       handleClose={() => setModal(false)}
//     >
//       {





//         <form action="" className="flex flex-col"
//           onSubmit={(event) => {
//             event.preventDefault()
//             const EditFromUser = Object.keys(editFromUser).slice(1)
//               .map((item) => {
//                 return (
//                   event.target[item].value
//                 )
//               }
//               )
//             dispatch(editUserel(EditFromUser))

//           }

//           }
//         >

//           {
//             Object.keys(editFromUser)
//               .slice(1)
//               .map((element) => {
//                 return (
//                   <div className="flex flex-col">

//                     <label htmlFor={element}>{element}</label>
//                     <input
//                       type="text"
//                       className="border inline-block border-black w-[300px]"
//                       value={editFromUser[element]}

//                       onChange={(e) => {
//                         dispatch(
//                           editChanfeUser({ name: element, value: e.target.value })
//                         );
//                       }}
//                     />

//                   </div>
//                 );
//               })
//           }
//           <button type="submit">Add</button>
//         </form>


//       }
//     </Edit>
//   ) : null
// }