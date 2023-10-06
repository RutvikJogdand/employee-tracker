import React, {useState, useEffect} from "react";
import { getAllEmployees } from "../../dbFunctions";
import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList } from '@ionic/react';
import { archive, heart, trash } from 'ionicons/icons';
import { v4 as uuidv4 } from 'uuid';

function ListPage(){
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        async function fetchContacts() {
          const contacts = await getAllEmployees();
          setContacts(contacts);
        }
    
        fetchContacts();
      }, []);
    
      console.log('contacts', contacts)

    return(
        <>
            {
                contacts && contacts.map(item => {
                    return(
                        <IonList key={uuidv4()}>
                            <IonItemSliding>
                                <IonItemOptions side="start">
                                <IonItemOption color="success">
                                    <IonIcon slot="icon-only" icon={archive}></IonIcon>
                                </IonItemOption>
                                </IonItemOptions>

                                <IonItem>
                                <IonLabel>{item.employee_name}</IonLabel>
                                </IonItem>

                                <IonItemOptions side="end">
                                <IonItemOption>
                                    <IonIcon slot="icon-only" icon={heart}></IonIcon>
                                </IonItemOption>
                                <IonItemOption color="danger">
                                    <IonIcon slot="icon-only" icon={trash}></IonIcon>
                                </IonItemOption>
                                </IonItemOptions>
                            </IonItemSliding>
                        </IonList>

                    )
                })
            }
        </>
    )

}

export default ListPage