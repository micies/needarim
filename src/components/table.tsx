import React, {useEffect, useRef, useState} from 'react';
import {Modal} from "./Modal";
import {Input} from "./Input";
import {Get, Post, Update} from "./BaseService";
import {Button, Search, Table, TableCell, TableHeadTh, TableRow} from "./style";



interface Person {
    errorMessage?:any
    id: number
    Id: string
    firstName: string;
    lastName: string
    picture: string
    sex: string
    phone: number
    source: string
    last_Status_Update: string
    source_status: string
    last_Updated_Date: string
    medical_condition: string
    last_known_location: string
    locality: string
    relative: string
    relative_phone_number: number
}

const TableNames= () => {
    const url = 'https://62f0041857311485d12c245d.mockapi.io/api/v1/needarim'


    const [modalShown, setModalShown] = useState({ edit: false, create:false, add: false});
    const [searchInput, setSearchInput] = useState("");
    const [parsonState, setParsonState] = useState<Person[]>([]);
    const [newPerson, setNewPerson] = useState<Partial<Person>>({}); // Initialize with an empty object
    const [dataToEdit, setDataToEdit] = useState<Partial<Person>>({}); // Initialize with an empty object
    const [error, setError] = useState<string | null>(null);
    const [errorMessageState, setErrorMessageState] = useState<string>();



    const save = useRef<Person[]>([]);



    useEffect(() => {
        const fetchData = async () => {
                const response = await Get(url, setParsonState, setErrorMessageState); // Replace with your API endpoint
                console.log(response)
            if (errorMessageState) {
                console.log(errorMessageState)
                return <div>{errorMessageState}</div>;
            }
                setError(null);
                save.current = parsonState

        };
        fetchData();
    }, []);

    const handleChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevents the default Enter key behavior (e.g., form submission)
            console.log('Enter key pressed');
            setSearchInput(e.currentTarget.value);
            handleSubmit();
        }
    };

    const isValidImageUrl = (url: string): boolean => {
        // Regular expression to match common image file extensions
        const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|svg)$/i;
        // Test if the URL ends with a valid image extension
        return imageExtensions.test(url);
    };
    const validatePerson = () => {

        if (!newPerson.Id) {
            return alert("ID is required.");
        }else if (newPerson.Id.length !== 9){
            return alert("the length of id is short or long")
        }else if (parsonState.some(elem => elem.Id === newPerson.Id)){
            alert('this id already exist')
        }
        if (!newPerson.firstName) {
            return alert("First Name is required.");
        }

        if (!newPerson.lastName) {
            return alert("Last Name is required.");
        }

        if (!newPerson.picture) {
            return alert("Picture is required.");
        }else if(!isValidImageUrl(newPerson.picture)) {
            return alert('this url is invalid')
        }
        if (!newPerson.sex) {
            return alert("Sex is required.");
        }

        if (!newPerson.phone) {
            return alert("Phone is required.");
        } else if (isNaN(newPerson.phone)) {
            return alert("Phone must be a number.");
        }else if (newPerson.phone.toString().length !== 10){
            return alert("the length of phone is short or long")}
        if (!newPerson.source) {
           return  alert("source is required.");
        }
        if (!newPerson.last_Status_Update) {
            return alert("last_Status_Update is required.");
        }
        if (!newPerson.source_status) {
            return alert("source status is required.");
        }
        if (!newPerson.last_Updated_Date) {
            return alert("last Updated Date is required.");
        }
        if (!newPerson.medical_condition) {
            return alert("medical condition is required.");
        }
        if (!newPerson.last_known_location) {
            return alert("last known location is required.");
        }
        if (!newPerson.locality) {
            return alert("locality is required.");
        }
        if (!newPerson.relative) {
            return alert("relative is required.");
        }
        if (!newPerson.relative_phone_number) {
            return alert("relative phone number is required.");
        }
        return true
    }
    const create_person = () =>{
        if (validatePerson() == true){
            setParsonState([...parsonState, newPerson as Person]); // Use spread operator to add the newPerson to the array
            Post(url, parsonState )
        }
    }


    const handleSubmit = () => {
        if (!searchInput.length) {
            return setParsonState(save.current);

        } else if (searchInput.length > 0) {
            const afterFilter = parsonState.filter((state: Person) => {
                return state.firstName.includes(searchInput);
            });
            setParsonState(afterFilter);
        }
    };

    function saveForCreate(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setNewPerson((prevNewPerson) => ({
            ...prevNewPerson,
            [name]: value,
        }));    }
    const saveForUpdate = (e: { target: { name: any; value: any; }; }) => {
        setDataToEdit({
            ...dataToEdit, [e.target.name]: e.target.value
        })
    }
    const sendUpdate = ()=>{
        const updatedPersons = [...parsonState];
        // Find the index of the item with the matching id
        const indexToUpdate = updatedPersons.findIndex((person) => person.id === dataToEdit.id);

        // Check if the item exists
        if (indexToUpdate !== -1) {
            // Update the item with the new data
            updatedPersons[indexToUpdate] = { ...updatedPersons[indexToUpdate], ...dataToEdit };

            // Update the state with the modified array
            setParsonState(updatedPersons);
        }
        Update(url, dataToEdit.id, dataToEdit)
    }



    return (
            <div>

                <Search
                    type="search"
                    placeholder="Search here"
                    onKeyDown={(e) => handleChange(e)}/>
                <Button onClick={() => {
                    setModalShown({add: false, edit: false, create: true});
                }}>
                    create
                </Button>
                <Modal buttonName='create' shown={modalShown.create} close={() => {
                    setModalShown({add: false, edit: false, create: false});
                }} fun={() => {
                    create_person();
                    setModalShown({add: false, edit: false, create: false});
                }}
                       children={<div>
                           מספר זהות:<Input onChange={saveForCreate} name={"Id"} />
                           שם פרטי:<Input onChange={saveForCreate} name={"firstName"}/>
                           שם משפחה:<Input onChange={saveForCreate} name={"lastName"}/>
                           תמונה:<Input onChange={saveForCreate} name={"picture"}/>
                           מין:<Input onChange={saveForCreate} name={"sex"}/>
                           מספר טלפון:<Input onChange={saveForCreate} name={"phone"}/>
                           מקור:<Input onChange={saveForCreate} name={"source"}/>
                           עדכון סטטוס אחרון:<Input onChange={saveForCreate} name={"last_Status_Update"}/>
                           אם נמצא מה המקור:<Input onChange={saveForCreate} name={"source_status"}/>
                           תאריך עדכון אחרון:<Input onChange={saveForCreate} name={"last_Updated_Date"}/>
                           מצב רפואי:<Input onChange={saveForCreate} name={"medical_condition"}/>
                           מקום ידוע אחרון:<Input onChange={saveForCreate} name={"last_known_location"}/>
                           יישוב:<Input onChange={saveForCreate} name={"locality"}/>
                           קרוב משפחה:<Input onChange={saveForCreate} name={"relative"}/>
                           מספר טלפון קרוב משפחה:<Input onChange={saveForCreate} name={"relative_phone_number"}/>

                       </div> }></Modal>
            <h2>Person Data</h2>
                <Table>
            <thead>
            <TableRow>
                <TableHeadTh>מספר זהות</TableHeadTh>
                <TableHeadTh>שם פרטי</TableHeadTh>
                <TableHeadTh>שם משפחה</TableHeadTh>
                <TableHeadTh>תמונה</TableHeadTh>
                <TableHeadTh>מין</TableHeadTh>
                <TableHeadTh>מספר טלפון</TableHeadTh>
            </TableRow>
            </thead>
            <tbody>
            {parsonState?.map((person, index) => (
                <TableRow key={person.id}>
                    <TableCell>{person.Id}</TableCell>
                    <TableCell>{person.firstName}</TableCell>
                    <TableCell>{person.lastName}</TableCell>
                    <TableCell><img src={person.picture} alt=""/></TableCell>
                    <TableCell>{person.sex}</TableCell>
                    <TableCell>{person.phone}</TableCell>
                    <TableCell>
                        <Button onClick={() => { setModalShown({ add: true, edit: false, create: false }); setDataToEdit(person) }}>
                        פרטים נוספים
                         </Button>
                        <Modal buttonName="" shown={modalShown.add} close={() => { setModalShown({add: false, edit: false, create: false }); }}
                               children={<div>
                                   מקור:<Input value={dataToEdit.source} disabled={true}/>
                                   עדכון סטטוס אחרון:<Input value={dataToEdit.last_Updated_Date} disabled={true}/>
                                   אם נמצא מה המקור:<Input value={dataToEdit.source_status} disabled={true}/>
                                   תאריך עדכון אחרון:<Input value={dataToEdit.last_Updated_Date} disabled={true}/>
                                   מצב רפואי:<Input value={dataToEdit.medical_condition} disabled={true}/>
                                   מקום ידוע אחרון:<Input value={dataToEdit.last_known_location} disabled={true}/>
                                   יישוב:<Input value={dataToEdit.locality} disabled={true}/>
                                   קרוב משפחה:<Input value={dataToEdit.relative} disabled={true}/>
                                   מספר טלפון קרוב משפחה:<Input type="number" value={dataToEdit.relative_phone_number} name={"relative_phone_number"} disabled={true}/>
                               </div> }
                        ></Modal>
                    </TableCell>
                    <TableCell>
                        <Button onClick={() => { setModalShown({ add: false, edit: true, create: false }); setDataToEdit(person) }}>
                            עריכה
                        </Button>
                        <Modal buttonName="עדכן"  fun={()=>{sendUpdate(); setModalShown({add: false, edit: false, create: false})}} shown={modalShown.edit} close={() => { setModalShown({add: false, edit: false, create: false }); }}
                               children={<div>
                                   מספר זהות:<div><input  defaultValue={dataToEdit.Id} onChange={saveForUpdate} name={"Id"} /></div>
                                   שם פרטי:<div><input  defaultValue={dataToEdit.firstName} onChange={saveForUpdate} name={"firstName"}/></div>
                                   שם משפחה:<div><input defaultValue={dataToEdit.lastName} onChange={saveForUpdate} name={"lastName"}/></div>
                                   תמונה:<div><input defaultValue={dataToEdit.picture} onChange={saveForUpdate} name={"picture"}/></div>
                                   מין:<div><input defaultValue={dataToEdit.sex} onChange={saveForUpdate} name={"sex"}/></div>
                                   מספר טלפון:<div><input defaultValue={dataToEdit.phone} onChange={saveForUpdate} name={"phone"}/></div>
                                   עדכון סטטוס אחרון:<div><input defaultValue={dataToEdit.last_Updated_Date} onChange={saveForUpdate} name={"last_Updated_Date"}/></div>
                                   אם נמצא מה המקור:<div><input defaultValue={dataToEdit.source_status} onChange={saveForUpdate} name={"source_status"}/></div>
                                   תאריך עדכון אחרון:<div><input defaultValue={dataToEdit.last_Updated_Date} onChange={saveForUpdate} name={"last_Updated_Date"}/></div>
                                   מצב רפואי:<div><input defaultValue={dataToEdit.medical_condition} onChange={saveForUpdate} name={"medical_condition"}/></div>
                                   מקום ידוע אחרון:<div><input defaultValue={dataToEdit.last_known_location} onChange={saveForUpdate} name={"last_known_location"}/></div>
                                   יישוב:<div><input defaultValue={dataToEdit.locality} onChange={saveForUpdate} name={"locality"}/></div>
                                   קרוב משפחה:<div><input defaultValue={dataToEdit.relative} onChange={saveForUpdate} name={"relative"}/></div>
                                   מספר טלפון קרוב משפחה:<div><input type="number" defaultValue={dataToEdit.relative_phone_number} name={"relative_phone_number"} onChange={saveForUpdate}/></div>
                               </div> }
                        ></Modal>
                    </TableCell>
                </TableRow>
            ))}
            </tbody>
        </Table>
        </div>
    );
};

export default TableNames;
