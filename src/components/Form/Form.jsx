import React, {useState, useEffect} from "react";
import { employeeDesignations } from "../../constants/constants";
import DatePicker, { CalendarContainer } from "react-datepicker";
import { createEmployeeEntry, getAllEmployees } from "../../dbFunctions";
import "./../../styles/formStyles.css"

import "react-datepicker/dist/react-datepicker.css";
import { ArrowIcon } from "../../assets/Arrow";

function EmployeeForm(){

    const [formData, setFormData] = useState({
        employee_name: '',
        designation: employeeDesignations[0],
        startDate: new Date(),
        endDate: null,
        // startDate: new Date(),
        // endDate: (() => {
        //     const today = new Date();
        //     const tomorrow = new Date(today);
        //     tomorrow.setDate(today.getDate() + 1); // Default to present day + 1 day
        //     return tomorrow
        //   })(),
    }); 
    const [contacts, setContacts] = useState([]);
    const [saveFlag, setSaveFlag] = useState(0)
    const [saveFlag2, setSaveFlag2] = useState(0)
      
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Perform validation or submit data as needed
        console.log('Form data:', formData);

        createEmployeeEntry(formData)
    };

    const alterSaveFlag = () => {

        setSaveFlag(0)
    }

    const alterSaveFlag2 = () => {

        setSaveFlag2(0)
    }

    useEffect(() => {
        async function fetchContacts() {
          const contacts = await getAllEmployees();
          setContacts(contacts);
        }
    
        fetchContacts();
      }, []);
    

    const calendarContainer = ({className, children}) => {
        return(
            <div style={{ borderRadius:"10px" ,paddingBottom: "20px", background: "white", color: "#fff" }}>
            <CalendarContainer className={className}>
              {/* <div> */}
                <div className="custom-date-button-container">
                    <button>Today</button>
                    <button>Next Monday</button>
                    <button>Next Tuesday</button>
                    <button>After 1 Week</button>
                </div>
              {/* </div> */}
              <div style={{ position: "relative" }}>
                {children}
              </div>
            </CalendarContainer>
              <div style={{color:"black"}}>
                <button>Cancel</button>
                <button onClick={alterSaveFlag}>Save</button>
              </div>
          </div>
        )
    }

    const calendarContainer2 = ({className, children}) => {
        return(
            <div style={{ borderRadius:"10px" ,paddingBottom: "20px", background: "white", color: "#fff" }}>
            <CalendarContainer className={className}>
              {/* <div> */}
                <div className="custom-date-button-container">
                    <button>Today</button>
                    <button>Next Monday</button>
                    <button>Next Tuesday</button>
                    <button>After 1 Week</button>
                </div>
              {/* </div> */}
              <div style={{ position: "relative" }}>
                {children}
              </div>
            </CalendarContainer>
              <div style={{color:"black"}}>
                <button>Cancel</button>
                <button onClick={alterSaveFlag2}>Save</button>
              </div>
          </div>
        )
    }

    console.log('contacts', contacts)
    return(
        <>
            <form onSubmit={handleSubmit}>
                <div>

                    <input type="text" required={true} name="employee_name" onChange={handleInputChange} placeholder="Employee Name" value={formData.employee_name} />
                </div>


                <div>

                    <select
                        name="designation"
                        value={formData.designation}
                        placeholder="Select role"
                        onChange={handleInputChange}
                    >
                    {employeeDesignations.map((item, index) => {
                        return(
                        <option key={index} value={item}> {item.split("_").join(" ")} </option>
                        )
                    })}
                    </select>
                </div>

                <div className="flex-container">
                <DatePicker
                    selected={formData.startDate === new Date() ? "Today" : formData.startDate}
                    onChange={(date) => setFormData({...formData, startDate : date})}
                    showIcon
                    selectsStart
                    startDate={formData.startDate}
                    endDate={formData.endDate}
                    dateFormat="d MMMM yyyy"
                    shouldCloseOnSelect={false}
                    placeholderText="Today"
                    withPortal={saveFlag === 1 ? true:false}
                    open={saveFlag === 1 ? true:false}
                    onClick={() => setSaveFlag(1)}
                    onInputClick={() => setSaveFlag(1)}
                    onCalendarClose={() => setSaveFlag(0)}
                    calendarContainer={calendarContainer}
                    // renderCustomHeader={}
                />
                <div>
                    <ArrowIcon color={'#1da1f2'} width={"20px"} height={"20px"}/>
                </div>
                <DatePicker
                    selected={formData.endDate}
                    onChange={(date) => setFormData({...formData, endDate : date})}
                    showIcon
                    selectsEnd
                    startDate={formData.startDate}
                    endDate={formData.endDate}
                    shouldCloseOnSelect={false}
                    minDate={formData.startDate}
                    dateFormat="d MMMM yyyy"
                    placeholderText="No date"
                    withPortal={saveFlag2 === 1 ? true:false}
                    open={saveFlag2 === 1 ? true:false}
                    onInputClick={() => setSaveFlag2(1)}
                    onCalendarClose={() => setSaveFlag2(0)}
                    calendarContainer={calendarContainer2}
                />
                </div>

                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </>
    )

}

export default EmployeeForm