import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Update = ({ postData }) => {
    return (
        <div>
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
        </div>
    );
};

export default Update;