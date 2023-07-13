import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const Table = (props) => {
  const { data, headers,deletUser,editUser} = props;
  const users = useSelector(({ users }) => users.users);
  const dispatch = useDispatch()

  const [search, setSearch] = useState("")
  return (

    <div class="flex flex-col">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <table class="min-w-full text-left text-sm font-light">
              <thead class="border-b font-medium dark:border-neutral-500">
                <div>
                  <input type="text" placeholder="Search..." className=" border-2 rounded-xl outline-none p-1 w-full " value={search} onChange={(e) => setSearch(e.target.value)} />

                </div>

                <tr>
                  {headers.map((elem) => {
                    return (
                      <th scope="col" class="px-6 py-4" key={elem.id}>
                        {elem}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {data.filter(el => {
                  return Object.values(el).join(" ").toLowerCase().includes(search.toLowerCase())
                }).
                  map((elem, index) => {
                    let keys = Object.keys(elem);
                    let tds = keys.map((item,ind) => {
                      if (item === "id") {
                        return (
                          <td class="whitespace-nowrap px-6 py-4 font-medium">
                            {elem[item]}
                          </td>
                        );
                      }
                      return (
                        <td class="whitespace-nowrap px-6 py-4">
                          {elem[item]}
                        </td>
                      )
                    });
                    if ((index + 1) % 2 == 0) {
                      return (
                        <tr class="border-b bg-white  dark:border-neutral-500">
                          {tds}
                          <button className="outline-none bg-[red] p-2 rounded-xl text-white" onClick={() =>
                            deletUser(elem.id)
                          }>Delete</button>
                          <button  className="bg-[orange] p-2 mt-2 w-[50px] text-white rounded-xl"  onClick={() =>
                            editUser(elem)
                          }>Edit</button>

                        </tr>
                      );
                    }
                    return (
                      <tr class="border-b bg-[#bbb9b9] dark:border-neutral-500">
                        {tds}
                        <button className="outline-none" onClick={() =>
                          deletUser(elem.id)
                        }>Delete</button>
                        <button onClick={() =>
                          editUser(elem)
                        }>Edit</button>
                      </tr>
                    );
                  })
                }



              </tbody>
            </table>
          </div>
        </div>
      </div>
     
     
    </div>
  );
};

export default Table;
