import React, {useState} from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { employeeDesignations } from "../../constants/constants";
import { createEmployeeEntry } from "../../dbFunctions";
import "./../../styles/formStyles.css"

// Assets:
import { ArrowIcon } from "../../assets/Arrow";
import { CalendarIcon } from "../../assets/Calendar";

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

    // Button functions: (Next Monday, Next Tuesday etc):
    const handleNextMondayStartDate = () => {
      const today = new Date();
      const daysUntilNextMonday = (7 - today.getDay() + 1) % 7;
      const nextMonday = new Date(today);
      nextMonday.setDate(today.getDate() + daysUntilNextMonday);

      setFormData({
        ...formData,
        startDate: nextMonday
      })
    };
  
    const handleNextTuesdayStartDate = () => {
      const today = new Date();
      const daysUntilNextTuesday = (9 - today.getDay()) % 7;
      const nextTuesday = new Date(today);
      nextTuesday.setDate(today.getDate() + daysUntilNextTuesday);

      console.log('tuesday', nextTuesday)
      setFormData({
        ...formData,
        startDate: nextTuesday
      })
    };
  
    const handleNextWeekStartDate = () => {
      const today = new Date();
      const oneWeekLater = new Date(today);
      oneWeekLater.setDate(today.getDate() + 7);

      setFormData({
        ...formData,
        startDate: oneWeekLater
      })
    };

    const cancelStartDate = (isWhichDate) => {

      if(isWhichDate === "isStartDate"){
        setSaveFlag(0)
        setFormData({
          ...formData,
          startDate: new Date()
        })
      }
      if(isWhichDate === "isEndDate"){
        setSaveFlag2(0)
        setFormData({
          ...formData,
          endDate: null
        })
      }
    }


    const calendarContainer = ({className, children}) => {
        return(
            <div style={{ borderRadius:"10px" ,paddingBottom: "20px", background: "white", color: "#fff" }}>
            <CalendarContainer className={className}>
              {/* <div> */}
                <div className="custom-date-button-container">
                    <button onClick={() => setFormData({...formData, startDate: new Date()})}>Today</button>
                    <button onClick={handleNextMondayStartDate}>Next Monday</button>
                    <button onClick={handleNextTuesdayStartDate}>Next Tuesday</button>
                    <button onClick={handleNextWeekStartDate}>After 1 Week</button> 
                </div>
              {/* </div> */}
              <div style={{ position: "relative" }}>
                {children}
              </div>
            </CalendarContainer>
              <div style={{color:"black"}}>
                <span>{formData.startDate.toDateString()}</span>
                <button onClick={() => cancelStartDate("isStartDate")}>Cancel</button>
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
                    <button onClick={() => setFormData({...formData, endDate: null})}>No Date</button>
                    <button onClick={() => setFormData({...formData, endDate: new Date()})}>Today</button>
                </div>
              {/* </div> */}
              <div style={{ position: "relative" }}>
                {children}
              </div>
            </CalendarContainer>
              <div style={{color:"black"}}>
                <span>{formData?.endDate?.toDateString() || "No Date"}</span>
                <button onClick={() => cancelStartDate("isEndDate")}>Cancel</button>
                <button onClick={alterSaveFlag2}>Save</button>
              </div>
          </div>
        )
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    
                    <input type="text" className="form-control" required={true} name="employee_name" onChange={handleInputChange} placeholder="Employee Name" value={formData.employee_name} />
                </div>


                <div>

                    <select
                        name="designation"
                        value={formData.designation}
                        placeholder="Select role"
                        onChange={handleInputChange}
                        className="form-control"
                    >
                    {employeeDesignations.map((item, index) => {
                        return(
                        <option key={index} value={item}> {item.split("_").join(" ")} </option>
                        )
                    })}
                    </select>
                </div>

                <div className="flex-container">
                  <div>
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
                        className="form-control"
                        onInputClick={() => setSaveFlag(1)}
                        onCalendarClose={() => setSaveFlag(0)}
                        calendarContainer={calendarContainer}
                        // renderCustomHeader={}
                    />
                  </div>
                  <div style={{paddingBottom: "20px"}}>
                      <ArrowIcon color={'#1DA1F2'} width={"15px"} height={"20px"}/>
                  </div>
                  <div>
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
                        className="form-control"
                        withPortal={saveFlag2 === 1 ? true:false}
                        open={saveFlag2 === 1 ? true:false}
                        onInputClick={() => setSaveFlag2(1)}
                        onCalendarClose={() => setSaveFlag2(0)}
                        calendarContainer={calendarContainer2}
                    />
                  </div>
                </div>

                <div>
                    <button>Cancel</button>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </>
    )

}

export default EmployeeForm