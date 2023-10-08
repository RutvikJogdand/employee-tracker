import React, {useEffect, useState} from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import { Link } from "react-router-dom";
import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonToast } from '@ionic/react';

import "react-datepicker/dist/react-datepicker.css";

import { employeeDesignations } from "../../constants/constants";
import { createEmployeeEntry } from "../../dbFunctions";
import "../../styles/mainCss.css"
import "./../../styles/formStyles.css"
import userimg from "./../../assets/images/user.png"
import briefcase from "./../../assets/images/briefcase.png"

// Assets:
import { ArrowIcon } from "../../assets/Arrow";
import { CalendarIcon } from "../../assets/Calendar";

function EmployeeForm(props){

    const [formData, setFormData] = useState({
        employee_name: '' ,
        designation: employeeDesignations[0],
        startDate: new Date(),
        endDate: null,
    }); 
    const [saveFlag, setSaveFlag] = useState(0)
    const [saveFlag2, setSaveFlag2] = useState(0)
    const [openToast, setOpenToast] = useState(false)
    const [openSuccessToast, setSuccessToast] = useState(false)
    const [failureToast, setFailureToast] = useState(false)

    useEffect(() => {

      if(props && props.reqEmployee && props.reqEmployee.employee_name){
        setFormData({
          ...formData,
          employee_name: props.reqEmployee.employee_name,
          designation: props.reqEmployee.designation,
          startDate: new Date(props.reqEmployee.startDate),
          endDate: props.reqEmployee.endDate && new Date(props.reqEmployee.endDate)
        })
      }


    },[])
      
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if(Object.keys(props).length === 0){
          setOpenToast(true)
        }


        const newEmp = {
          employee_name: formData.employee_name,
          designation: formData.designation,
          startDate: new Date(formData.startDate),
          endDate: formData.endDate ? new Date(formData.endDate) : null
        }
        if(props && props.reqEmployee && props.reqEmployee.employee_name !== null){
          props?.setIsSaveChangesActive(true)
          props.setReqEmployeeObj(formData);
        }else{
          createEmployeeEntry(newEmp).then((res) => {
          })
          .catch(err => {
            if(err && err.message){
              setFailureToast(true)
            }
          })

        }

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
      console.log('days until next monday', 7 - today.getDay() + 1)
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
                    <button className="btn btn start-calendar-btn" onClick={() => setFormData({...formData, startDate: new Date()})}>Today</button>
                    <button className="btn btn start-calendar-btn" onClick={handleNextMondayStartDate}>Next Monday</button>
                    <button className="btn btn start-calendar-btn" onClick={handleNextTuesdayStartDate}>Next Tuesday</button>
                    <button className="btn btn start-calendar-btn" onClick={handleNextWeekStartDate}>After 1 Week</button> 
                </div>
              {/* </div> */}
              <div style={{ position: "relative" }}>
                {children}
              </div>
            </CalendarContainer>
              <div className="calendar-footer-btn-container"  style={{color:"black", display: "flex", padding:"5px"}}>
                <span style={{ alignSelf: "flex-start" }}>
                <CalendarIcon/>
                  {formData.startDate.toDateString()}
                </span>
                <div>
                  <button style={{color: "blue", background: "#EDF8FF"}}  className="calendar-footer-btns btn btn-light" onClick={() => cancelStartDate("isStartDate")}>Cancel</button>
                  <button style={{color: "white", background: "#1DA1F2", margin: "0 5px"}}  className="calendar-footer-btns btn btn-info" onClick={alterSaveFlag}>Save</button>
                </div>
              </div>
          </div>
        )
    }

    const calendarContainer2 = ({className, children}) => {
        return(
            <div style={{ borderRadius:"10px" ,paddingBottom: "20px", background: "white", color: "#fff" }}>
            <CalendarContainer className={className}>
                <div className="custom-date-button-container">
                    <button className="btn start-calendar-btn" onClick={() => setFormData({...formData, endDate: null})}>No Date</button>
                    <button className="btn start-calendar-btn" onClick={() => {
                      if(new Date(formData.startDate) < new Date(formData.end)){
                        setFormData({...formData, endDate: new Date(formData.startDate)})
                      }

                      }
                      }>Today</button>
                </div>
              <div style={{ position: "relative" }}>
                {children}
              </div>
            </CalendarContainer>
              <div className="calendar-footer-btn-container" style={{color:"black", display: "flex", padding:"5px"}}>
                <span style={{ alignSelf: "flex-start" }}>
                  <CalendarIcon/>
                  {formData?.endDate?.toDateString() || "No Date"}
                  </span>
                <div>
                  <button  style={{color: "blue", background: "#EDF8FF"}} className="calendar-footer-btns btn btn-light" onClick={() => cancelStartDate("isEndDate")}>Cancel</button>
                  <button  style={{color: "white", background: "#1DA1F2", margin: "0 5px"}} className="calendar-footer-btns btn btn-info" onClick={alterSaveFlag2}>Save</button>
                </div>
              </div>
          </div>
        )
    }


    return(
        <>
            {
              props.isFromEdit === false || Object.keys(props).length === 0 &&
            <div className="header-main">
                Add Employee Details
            </div>
            }
            <form onSubmit={handleSubmit}>
              <div style={{border: "1px solid #DDD", padding:"0", marginBottom:"15px"}}>
                  {
                    Object.keys(props).length === 0 &&
                    <img src={userimg} />
                  }
                  <input type="text" style={{border:"none"}} className="form-name-input" required={true} name="employee_name" onChange={handleInputChange} placeholder="Employee Name" value={formData.employee_name} />
              </div>
              
              <div style={{border: "1px solid #DDD", padding:"0", marginBottom:"15px"}}>
                  {
                    Object.keys(props).length === 0 && 
                    <img src={briefcase} />
                  }
                  <select
                        name="designation"
                        value={formData.designation}
                        placeholder="Select role"
                        onChange={handleInputChange}
                        className="form-name-input"
                    >
                    {employeeDesignations.map((item, index) => {
                        return(
                        <option key={index} value={item}> {item.split("_").join(" ")} </option>
                        )
                    })}
                    </select>
              </div>
              <div>

                    
              </div>

                <div className="flex-container">
                  <div  style={{border: "1px solid #DDD", padding:"5px", marginBottom:"15px", display: "flex"}}>
                    <CalendarIcon className="calendar-icon"/>
                    <DatePicker
                        selected={formData.startDate === new Date() ? "Today" : formData.startDate}
                        onChange={(date) => setFormData({...formData, startDate : date})}
                        
                        selectsStart
                        startDate={formData.startDate}
                        endDate={formData.endDate}
                        dateFormat="d MMMM yyyy"
                        shouldCloseOnSelect={false}
                        placeholderText="Today"
                        withPortal={saveFlag === 1 ? true:false}
                        open={saveFlag === 1 ? true:false}
                        onClick={() => setSaveFlag(1)}
                        className="date-selector"
                        onInputClick={() => setSaveFlag(1)}
                        onCalendarClose={() => setSaveFlag(0)}
                        calendarContainer={calendarContainer}
                    />
                  </div>
                  <div style={{paddingBottom: "20px"}}>
                      <ArrowIcon color={'#1DA1F2'} width={"15px"} height={"20px"}/>
                  </div>
                  <div  style={{border: "1px solid #DDD", padding:"5px", marginBottom:"15px", display:"flex"}}>
                  <CalendarIcon className="calendar-icon"/>
                    <DatePicker
                        selected={formData.endDate}
                        onChange={(date) => setFormData({...formData, endDate : date})}
                        
                        selectsEnd
                        startDate={formData.startDate}
                        endDate={formData.endDate}
                        shouldCloseOnSelect={false}
                        minDate={formData.startDate}
                        dateFormat="d MMMM yyyy"
                        placeholderText="No date"
                        className="date-selector"
                        withPortal={saveFlag2 === 1 ? true:false}
                        open={saveFlag2 === 1 ? true:false}
                        onInputClick={() => setSaveFlag2(1)}
                        onCalendarClose={() => setSaveFlag2(0)}
                        calendarContainer={calendarContainer2}
                    />
                  </div>
                </div>

                <div className={props?.isFromEdit === true ? "" : "form-footer"}>
                    <button className="form-save btn btn-primary" type="submit">
                      {
                        props && props.reqEmployee && props.reqEmployee.employee_name !== null?
                        "Save Changes"
                        :
                        "Save"
                      }
                    </button>
                    {
                      props && props.reqEmployee && props.reqEmployee.employee_name !== null?
                      ""
                      :
                      <button className="cancel btn btn-light ">
                        <Link to="/"> 
                          Cancel
                        </Link>
                      </button> 

                    }

                    <IonToast
                        isOpen={openToast}
                        message="Adding New Employee.."
                        onDidDismiss={() => {
                          setOpenToast(false)
                          if(!failureToast){
                            setSuccessToast(true)
                          }
                        }}
                        duration={2000}
                    ></IonToast>

                    <IonToast
                        isOpen={openSuccessToast}
                        message="New Employee Added!"
                        onDidDismiss={() => setSuccessToast(false)}
                        duration={3000}
                        color={"success"}
                    ></IonToast>

                    <IonToast
                        isOpen={failureToast}
                        message="Employee with this ID already exists"
                        onDidDismiss={() => setFailureToast(false)}
                        duration={3000}
                        color={"danger"}
                    ></IonToast>
                </div>
            </form>
        </>
    )

}

export default EmployeeForm