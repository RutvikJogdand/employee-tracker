import React from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function ReactDatePicker({
    selectedDate,
  handleDateChange,
  startDate,
  endDate,
  saveFlag,
  alterSaveFlag,
  startDateSelector,
  endDateSelector,
  setSaveFlag, // Pass setSaveFlag as a prop
})

{
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
    return(
        <DatePicker
            selected={selectedDate === 'Today' ? new Date() : selectedDate}
            onChange={(date) => handleDateChange(date)}
            showIcon
            selectsStart={startDateSelector}
            selectsEnd={endDateSelector}
            startDate={startDate}
            endDate={endDate}
            dateFormat="d MMMM yyyy"
            shouldCloseOnSelect={false}
            placeholderText="Today"
            withPortal={saveFlag === 1 ? true : false}
            open={saveFlag === 1 ? true : false}
            onClick={() => setSaveFlag(1)}
            onInputClick={() => setSaveFlag(1)}
            onCalendarClose={() => setSaveFlag(0)}
            calendarContainer={calendarContainer}
            // renderCustomHeader={}
        />
    )
}