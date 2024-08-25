import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { nanoid } from 'nanoid'


const Todo = () => {
    const [data,setData] = useState([])
    const [form, setForm] = useState({})
    const [backupData, setbBackupData] = useState([])
    const hadleChange = (event) => {
        const {name, value} = event.target
        setForm({...form, [name]:value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let nanoId = {...form, id: nanoid()}
        let new__data = [...data, {...nanoId}]
        setData(new__data)
        setbBackupData([])
    }

 

    const handleKeyDownInfo = (event) => {
        if (event.key === "Delete") {
            // delInfo()
        }
    }

    const handleKeyDown = (event) => {
        if (event.shiftKey && (event.key === 'Backspace')) {
            clearAll()
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keydown', handleKeyDownInfo)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keydown', handleKeyDownInfo)
        }
    },[])


    const delInfo = (id) => {
        const updatedData = data.filter(item => item.id != id)
        setData(updatedData)
    }

    const clearAll = () =>{
        setbBackupData(data)
        setData([])
    }

    const restoreAll = () => {
        setData(backupData)
        setbBackupData([])
    }

   
  return (
    <div className='container mt-5'>
        <div className='row'>
            <div className="col-md-4">
                <div className="card">
                    <div className="card-header">
                        <h3 className='text-center'>Add User</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit} id='enter'>
                        <input type="text" placeholder='Enter your name' name='name' onChange={hadleChange} className='my-2 form-control'/>
                        <input type="text" placeholder='Enter your surname' name='surname' onChange={hadleChange} className='my-2 form-control'/>
                        <input type="number" placeholder='Enter your age' name='age' onChange={hadleChange} className='my-2 form-control'/>
                        <input type="tel" placeholder='Enter your phone number' name='phone' onChange={hadleChange} className='my-2 form-control'/>
                        </form>
                    </div>
                <div className="card-footer">
                    <button type='submit' form='enter' className='btn btn-primary'>Save</button>
                    <button className='btn btn-danger mx-3' onClick={clearAll}>Clear</button>
                    <button className='btn btn-info' onClick={restoreAll}>Restore Datas</button>
                </div>
                </div>
            </div>
            <div className="col-md-8">
                <table className='table table-bordered table-hover'> 
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Age</th>
                            <th>Phone Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                         data.map((val,ind)=>(
                           <tr key={ind}>
                                <td>{val.id}</td>
                                <td>{val.name}</td>
                                <td>{val.surname}</td>
                                <td>{val.age}</td>
                                <td>{val.phone}</td>
                                <td>
                                    <button className='btn btn-danger' onClick={()=>delInfo(val.id)}>Del</button>
                                </td>
                           </tr> 
                         ))
                       }
                    </tbody>
                </table>
            </div>

        </div>
    </div>
  )
}

export default Todo