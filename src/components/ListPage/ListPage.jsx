import React, {useState, useEffect, useRef} from "react";
import { trash, createOutline, addOutline } from 'ionicons/icons';
import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonToast } from '@ionic/react';
import { v4 as uuidv4 } from 'uuid';
// DB functions:
import { getAllEmployees, editEmployeeData, deleteEmployeeData } from "../../dbFunctions";

import nothingFound from "../../assets/images/nothingFound.png"
import "../../styles/listPage.css"
import "../../styles/mainCss.css"
import EmployeeForm from "../Form/Form";
import { Link } from "react-router-dom";

function ListPage(props){
    const [contacts, setContacts] = useState([]);
    const [reqEmployeeObj, setReqEmployeeObj] = useState({});
    const [reqEmpId, setReqEmpId] = useState("");
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isSaveChangesActive, setIsSaveChangesActive] = useState(false)
    const apiCallTimeoutRef = useRef(null);
    
    const windowWidth = useRef(window.innerWidth);

        useEffect(() => {
            let isMounted = true; 

        async function fetchContacts() {
        try {
        let contacts = await getAllEmployees();

        if (isMounted) {
            setContacts(contacts);
        }
        } catch (error) {
        
        }
        }

        fetchContacts();

        return () => {
        isMounted = false; 
        };
        }, []);


    const handleSetEmployeeDetails = (id, mode) =>{
        const reqEmployee = contacts.filter(item => item.id === id)

        setMode(mode);
        setReqEmployeeObj(reqEmployee[0])
        setReqEmpId(id)
    }  
    
    const handleEdit = () => {
        if(reqEmployeeObj.endDate === null){
            reqEmployeeObj.endDate = null
        }
        setLoading(true)
        editEmployeeData(reqEmpId,reqEmployeeObj).then(() => {
            setLoading(false)
        })

        let result = contacts.map(el => (el.id === reqEmpId ? {...el, employee_name: reqEmployeeObj.employee_name,
             designation: reqEmployeeObj.designation, 
             startDate: new Date(reqEmployeeObj.startDate),
             endDate: reqEmployeeObj.endDate === null ? null : new Date(reqEmployeeObj.endDate) } : el));

        setContacts(result)

        setTimeout(setIsSaveChangesActive(false), 2000)
    }

    const handleDeleteEmployee = (id, mode) => {
        const reqEmployee = contacts.filter(item => item.id === id)

        setReqEmployeeObj(reqEmployee[0])
        setReqEmpId(id);
        setMode(mode);
    }


    const handleDelete = () => {

        setLoading(true)
       
        setIsOpen(true)
        apiCallTimeoutRef.current = setTimeout(() => {
            deleteEmployeeData(reqEmpId).then(() => {
              setLoading(false);
              setIsOpen(false);
        
              setContacts((prevContacts) =>
                prevContacts.filter((item) => item.id !== reqEmpId)
              );
        
              setReqEmpId(null);
            });
          }, 5000); 

    }

    const undoDeletion = () => {
        if (apiCallTimeoutRef.current) {
            clearTimeout(apiCallTimeoutRef.current); 
          }
        setLoading(false);
        setIsOpen(false);
        setReqEmpId(null); 
      };
    
    return(
        <>
           
            <div>
                <div className="header-main">
                    Employee List
                </div>

                {
                    contacts && contacts.length === 0 ?
                    <img style={{width:"100%"}} src={nothingFound}/>
                    :
                    <div>
                    {/* Current Employees: */}
                        <div className="employee-differentiator">
                                Current Employees
                        </div>

                        
                        {
                            contacts && contacts.filter(item => item.endDate === null).map(item => {
                                return(
                                    <IonList key={uuidv4()}>
                                        <IonItemSliding>
                                            <IonItem>
                                                <IonLabel>
                                                    <div>
                                                        <h3 className="employee-name">
                                                            {item.employee_name}
                                                        </h3>
                                                        <p>{item && item.designation.split("_").join(" ")}</p>
                                                        <small>From {item.startDate.toDateString()} - { item.endDate && item.endDate !== null && item.endDate.toDateString()} </small>
                                                    </div>
                                                </IonLabel>
                                                {
                                                    windowWidth.current >= 768 &&
                                                    <div style={{float:"right"}}>
                                                        <IonLabel>
                                                            <IonIcon slot="icon-only" onClick={() => handleSetEmployeeDetails(item.id, "editMode")} data-bs-toggle="modal" data-bs-target="#exampleModal" icon={createOutline}></IonIcon>
                                                        </IonLabel>
                                                        <br/>
                                                        <IonLabel color="danger">
                                                            <IonIcon slot="icon-only" onClick={() => handleDeleteEmployee(item.id, "deleteMode")} data-bs-toggle="modal" data-bs-target="#exampleModal" icon={trash}></IonIcon>
                                                        </IonLabel>
                                                    </div>
                                                }
                                            </IonItem>
                                            {
                                                windowWidth.current < 768 &&
                                                <IonItemOptions side="end">
                                                    <IonItemOption>
                                                        <IonIcon slot="icon-only" onClick={() => handleSetEmployeeDetails(item.id, "editMode")} data-bs-toggle="modal" data-bs-target="#exampleModal" icon={createOutline}></IonIcon>
                                                    </IonItemOption>
                                                    <IonItemOption color="danger">
                                                        <IonIcon slot="icon-only" onClick={() => handleDeleteEmployee(item.id, "deleteMode")} data-bs-toggle="modal" data-bs-target="#exampleModal" icon={trash}></IonIcon>
                                                    </IonItemOption>
                                                </IonItemOptions>
                                            }    
                                        </IonItemSliding>
                                    </IonList>

                                )
                            })
                        }

                        {/* Previous Employees: */}
                        {
                            contacts && contacts.filter(item => item.endDate !== null).length !== 0 &&
                            <div className="employee-differentiator">
                                    Previous Employees
                            </div>
                        }
                        {
                            contacts && contacts.filter(item => item.endDate !== null).map(item => {
                                return(
                                    <IonList key={uuidv4()}>
                                        <IonItemSliding>
                                            <IonItem>
                                                <IonLabel>
                                                    <div>
                                                        <h3 className="employee-name">
                                                            {item.employee_name}
                                                        </h3>
                                                        <p>{item && item.designation.split("_").join(" ")}</p>
                                                        <small>From {item.startDate.toDateString()} - {item.endDate && item.endDate !== null && item.endDate.toDateString()} </small>
                                                    </div>
                                                </IonLabel>
                                                {
                                                    windowWidth.current >= 768 &&
                                                    <div style={{float:"right"}}>
                                                        <IonLabel>
                                                            <IonIcon slot="icon-only" onClick={() => handleSetEmployeeDetails(item.id, "editMode")} data-bs-toggle="modal" data-bs-target="#exampleModal" icon={createOutline}></IonIcon>
                                                        </IonLabel>
                                                        <br/>
                                                        <IonLabel color="danger">
                                                            <IonIcon slot="icon-only" onClick={() => handleDeleteEmployee(item.id, "deleteMode")} data-bs-toggle="modal" data-bs-target="#exampleModal" icon={trash}></IonIcon>
                                                        </IonLabel>
                                                    </div>
                                                }
                                            </IonItem>
                                            {
                                                windowWidth.current < 768 &&
                                                <IonItemOptions side="end">
                                                    <IonItemOption>
                                                        <IonIcon slot="icon-only" onClick={() => handleSetEmployeeDetails(item.id, "editMode")} data-bs-toggle="modal" data-bs-target="#exampleModal" icon={createOutline}></IonIcon>
                                                    </IonItemOption>
                                                    <IonItemOption color="danger">
                                                        <IonIcon slot="icon-only" onClick={() => handleDeleteEmployee(item.id, "deleteMode")} data-bs-toggle="modal" data-bs-target="#exampleModal" icon={trash}></IonIcon>
                                                    </IonItemOption>
                                                </IonItemOptions>
                                            }    
                                        </IonItemSliding>
                                    </IonList>

                                )
                            })
                        }
                    </div>
                }
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                {
                                    mode === "editMode" ?
                                    "Edit Employee Details"
                                    :
                                    mode === "deleteMode" &&
                                    `Delete Employee: ${reqEmployeeObj.employee_name}, ID: ${reqEmployeeObj.id}`
                                }
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {
                                mode === "editMode"&&
                                <EmployeeForm setIsSaveChangesActive={setIsSaveChangesActive} isFromEdit={true} setReqEmployeeObj={setReqEmployeeObj} reqEmployee={reqEmployeeObj}/>
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {
                                mode === "editMode" ?
                                <button type="button" disabled={!isSaveChangesActive} className="btn btn-primary" onClick={handleEdit}  data-bs-dismiss="modal">
                                    {
                                        loading?
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        :
                                        "Save changes"

                                    }
                                </button>
                                :
                                mode === "deleteMode" &&
                                <button type="button" className="btn btn-primary" onClick={handleDelete}  data-bs-dismiss="modal">
                                {
                                    loading?
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    :
                                    "Delete"

                                }
                                </button>

                            }
                        </div>
                        </div>
                    </div>
                </div>
                <div className="add-button-container">
                    <div className="helper-text-container">
                        <p>Swipe left to delete or edit</p>
                    </div>
                <div  className="add-icon-container">
                    <Link to="/add-employees">  <IonIcon className="add-icon" slot="icon-only" icon={addOutline}></IonIcon> </Link>
                        <IonToast
                            isOpen={isOpen}
                            message="Deleting in 5 seconds.."
                            onDidDismiss={() => setIsOpen(false)}
                            duration={5000}
                            buttons={
                                [{
                                    text: 'Undo',
                                    role: 'info',
                                    handler: () => undoDeletion(),
                                },
                            ]}
                        ></IonToast>
                </div>
                </div>
            
            </div>

    </>
    )

}

export default ListPage