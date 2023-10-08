import React, {useState, useEffect} from "react";
import { addOutline } from 'ionicons/icons';
import { IonIcon, IonToast } from '@ionic/react';
import { getAllEmployees, editEmployeeData, deleteEmployeeData } from "../../dbFunctions";

// DB functions:

import "../../styles/listPage.css"
import "../../styles/mainCss.css"
import ListPage from "../ListPage/ListPage";

function MainListPage(){
    const [isOpen, setIsOpen] = useState(false);
    const [currentContacts, setCurrentContacts] = useState([]);
    const [previousContacts, setPreviousContacts] = useState([]);


    useEffect(() => {
        let isMounted = true; // Flag to track whether the component is still mounted

  async function fetchContacts() {
    try {
      let contacts = await getAllEmployees();

      if (isMounted) {
        // let current = contacts.filter(item => item.endDate === null);
        // let previous = contacts.filter(item => item.endDate !== null);

        setCurrentContacts(contacts);
        // setPreviousContacts(previous);
      }
    } catch (error) {
      // Handle errors here
      console.log(error)
    }
  }

  fetchContacts();

  // Cleanup function
  return () => {
    isMounted = false; // Set the flag to false when the component unmounts
  };
      }, []);

      console.log('current and previous', currentContacts, previousContacts)
    return(
        <div>
            <div className="header-main">
                Employee List
            </div>
            <div>
                <div className="employee-differentiator">
                    Current Employees
                </div>
                <ListPage contacts={currentContacts} type={"current"} isOpen={isOpen} setIsOpen={setIsOpen}/>
            </div>
            <div>
                {/* <div className="employee-differentiator">
                    Previous Employees
                </div>
                <ListPage contacts={currentContacts} type={"previous"} isOpen={isOpen} setIsOpen={setIsOpen} />
                 */}
            </div>
            <div className="add-button-container">
                <div className="helper-text-container">
                    <p>Swipe left to delete or edit</p>
                </div>
               <div  className="add-icon-container">
                    <IonIcon className="add-icon" slot="icon-only" icon={addOutline}></IonIcon>
                    <IonToast
                        isOpen={isOpen}
                        message="This toast will close in 5 seconds"
                        onDidDismiss={() => setIsOpen(false)}
                        duration={5000}
                    ></IonToast>
               </div>
            </div>
        </div>
    )

}

export default MainListPage