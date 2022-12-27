import './App.css';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useEffect, useState } from 'react';

function App() {
  const [saveDatas, setSaveDatas] = useState([]);
  const { sectors } = saveDatas;
  const [singledata, setSingledata] = useState([]);


  useEffect(() => {
    fetch('http://localhost:5000/read')
      .then(res => res.json())
      .then(data => setSaveDatas(data[0]))
  }, []);


  const { data: postDatas = [], isLoading, refetch } = useQuery({
    queryKey: ['postDatas'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/saveData`)
      const data = await res.json();
      return data
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target
    const name = form.name.value;
    const sector = form.sector.value;

    const saveInfo = {
      name,
      sector
    };

    fetch('http://localhost:5000/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(saveInfo)
    })
      .then(res => res.json())
      .then(data => {
        if (data.acknowledged) {
          toast.success('You are selected.')
        }
        refetch();
      })
      .catch(err => console.log(err))
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/delete/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data, ' deleted');
        if (data.deletedCount === 1) {
          toast.success('successfully deleted ');
          refetch();
        }
      })
  };


  const handleUpdate = (event, id) => {
    event.preventDefault();

    const form = event.target
    const name = form.name.value;
    const sector = form.sector.value;

    const saveInfo = {
      name,
      sector
    };
    console.log(saveInfo);

    fetch(`http://localhost:5000/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(saveInfo)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
  }

  return (
    <div>
      <div>
        <h1 className='text-2xl text-center py-5 font-bold text-black'>Please enter your name and pick the Sectors you are currently involved in.</h1>
      </div>

      {/* here is the save data information. */}

      <div className='grid my-10 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1'>

        <div className='text-center'>
          <form
            onSubmit={handleSubmit}>
            <input name='name' type="text" placeholder="Type you Name" className="input input-bordered w-full max-w-xs" required />

            <select name='sector' className="select my-5 select-bordered w-full max-w-xs" required>
              {
                sectors?.map((sectors, i) => <option key={i}>{sectors}</option>)
              }
            </select>

            <div className="mx-24 flex items-center">
              <input required type="checkbox" className="checkbox checkbox-sm" />
              <span className="label-text">Agree the Terms</span>
            </div>
            <br />

            <input className="btn btn-success" type="submit" value="Save" />

          </form>
        </div>

        {/* Part 2 start ---------- */}
        <div>

          <div>
            <h1 className='text-center text-2xl my-2'>Your save data is here.</h1>


            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>SECTORS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    postDatas?.map((postData, i) =>
                      <tr key={i}>
                        <th>{i + 1}</th>
                        <td>{postData?.name}</td>
                        <td>{postData.sector}</td>
                        <td>
                          <div className='flex justify-between'>
                            <div onClick={() => handleDelete(postData?._id)}>
                              <FaTrash />
                            </div>

                            <div>
                              {/* The button to open modal */}
                              <label
                                onClick={() => setSingledata(postData)}
                                htmlFor="my-modal-3" className=" "><FaEdit /></label>

                              <input type="checkbox" id="my-modal-3" className="modal-toggle" />

                              <div className="modal">
                                <div className="modal-box relative">


                                  <form
                                    onSubmit={handleUpdate}>

                                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                    <h3 className="text-lg font-bold">Congratulations!</h3>
                                    <input name='name' type="text"
                                      defaultValue={singledata?.name} className="input input-bordered w-full max-w-xs my-5" required />
                                    <br />
                                    <select name='sector' className="select my-5 select-bordered w-full max-w-xs" required>
                                      {
                                        sectors?.map((sectors, i) => <option defaultValue={singledata?.sector} key={i}>{sectors}</option>)
                                      }
                                    </select>
                                    <br />
                                    <input className='my-5 btn text-center' type="submit" value="Submit" />
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                  }

                </tbody>
              </table>
            </div>
          </div>
        </div>



      </div>




    </div >
  );
}

export default App;
