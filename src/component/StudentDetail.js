
import { useEffect, useState } from 'react'
import axios from 'axios'
function StudentDetail() {
    const initialvalue = { name: "", date: "", class: "", Division: "",gender:"" }
    const [formValue, setFormValue] = useState([initialvalue])

     // create another state variable for errors
       const [error, setError] = useState({})
    
    const[data,setData]=useState([]) //here we get the data from api
    

    const [name,setName]=useState('');
    const [date,setDate]=useState('');
    const [classes,setClasses]=useState('');
    const [division,setDivision]=useState('');
    const [gender,setGender]=useState('');

    useEffect(()=>{
        axios.get("http://localhost:8080/").then((res)=>{
           setData(res.data)

        })

    },[data]) //while giving in this way the page reloaded when a new data comes


    const  handleSubmit= (e)=>{
        e.preventDefault()
        const isError=validate(formValue)
        
        setError(isError)
        
        

        if(isError){
           
          axios.post("http://localhost:8080/", {
            name,
            date,
            classes,
            division,
            gender,
        }).then(() => {
            
            alert("new data added");  
           

        }).catch((err) => {
            alert("unable to add data", err)
        })
       console.log("hello")
        console.log("value:"+isError)
      //  setError(validate(formValue));  
    }else{
        console.log("fill the field")
    }


        }

        

    //validation

  const validate = (value) => {
    const error = {}

    if (!value.name) {
      error.name = "name is required"
    }

    if (!value.date) {
      error.date = "date of birth is required"
    }
    if (!value.classes) {
      error.classes = "class is required"
    }
    if (!value.Division) {
      error.Division = "Division is required"
    }
    if(!value.gender){
        error.gender="gender is required"
    }
    return error;

  }
        
    
    


  return (
    <div className="app">

      <form className="form" onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div >

          {/* name */}
          <div className="field">
            <label>Name</label>
            <input
             type="text" 
             value={name} 
             onChange ={(e)=>{setName(e.target.value) 
                const { name, value } = e.target
               setFormValue({ ...formValue, [name]: value })}}
             name="name" 
             placeholder="Enter user name" 
             className="form-control" />
          </div>
              {/* for showing the validation messages */}
            <p style={{ color: "red" }}>{error.name}</p>


          {/* DOB */}
          <div className="field">
            <label>Date of Birth</label>
            <input type="date" 
             value={date} 
             onChange ={(e)=>{setDate(e.target.value)
                const { name, value } = e.target
                setFormValue({ ...formValue, [name]: value})}}
             name="date" 
             placeholder="Enter Date of Birth" 
             className="form-control" ></input>
          </div>
         < p style={{ color: "red" }}>{error.date}</p>
     


          {/* Class */}
          <div className="field">
            <label >Class</label>
            <select name="classes"
                value={classes} 
                onChange ={(e)=>{setClasses(e.target.value)
                    const { name, value } = e.target
                    setFormValue({ ...formValue, [name]: value})}}

               class="form-select">
              <option name="division" value="">choose the option</option>
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
              <option value="V">V</option>
              <option value="V1">V1</option>
              <option value="V11">V11</option>
              <option value="V111">V111</option>
              <option value="1X">1X</option>
              <option value="X">X</option>
              <option value="X11">X11</option>
              <option value="X12">X12</option>

            </select>

          </div>
          < p style={{ color: "red" }}>{error.classes}</p>
     
         

          {/* Division */}
          <div className="field">
            <label>Division</label>
            <select name="Division"
             value={division} 
             onChange ={(e)=>{setDivision(e.target.value)
                const { name, value } = e.target
                setFormValue({ ...formValue, [name]: value})}} 
             className="form-select">
             <option name="division" value="">choose the option</option>
              <option value="a">A</option>
              <option value="b">B</option>
              <option value="c">C</option>
            </select>
          </div>
          < p style={{ color: "red" }}>{error.Division}</p>
     

        
          <br></br>
          {/* Gender */}
          <div className="field">

            <label>Gender</label>
            <input className="form-check-input" 
            name="gender"  
            value="Male" 
            checked={gender==="Male"}  
            onChange ={(e)=>{setGender(e.target.value)
                const { name, value } = e.target
                setFormValue({ ...formValue, [name]: value})} }
                 class="radio" 
                 type="radio" />

            <label className="form-check-label" class="female">Male</label>
            <input className="form-check-input"
             name="gender"
             value="Female" 
            checked={gender==="Female"}  
            onChange ={(e)=>{setGender(e.target.value)
                const { name, value } = e.target
                setFormValue({ ...formValue, [name]: value})}} 
            type="radio" />
            <label className="form-check-label" class="male">Female</label>
            
          </div>
          < p style={{ color: "red" }}>{error.gender}</p>
     
          <br></br>
          <button type='submit'   className="btn btn-primary">Submit</button>
        </div>
      </form>

       {/* table */}

       <div className="tables">

<table>
    <thead>
        <tr>
            <th scope="col">regno</th>
            <th scope="col">name</th>
            <th scope="col">DOB</th>
            <th scope="col">class</th>
            <th scope="col">Division</th>
            <th scope="col">gender</th>
        </tr>
    </thead>
    <tbody>

        {
            data.map(obj =>
                <tr>
                    <td>{obj.id}</td>
                    <td>{obj.name}</td>
                    <td>{obj.date}</td>
                    <td>{obj.classes}</td>
                    <td>{obj.division}</td>
                    <td>{obj.gender}</td>
                </tr>
               


            )
            
        }

          





    </tbody>
</table>







      </div>


    </div>






  );
}

export default StudentDetail;
